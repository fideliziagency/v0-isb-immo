"use client"

import type React from "react"
import { useRef, useEffect, useState } from "react"
import Image from "next/image"
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  useSpring,
  useMotionValue,
  useMotionTemplate,
  animate,
  type MotionValue,
} from "framer-motion"

/* ---------- Reveal : apparition douce au scroll ---------- */
export function Reveal({
  children,
  delay = 0,
  y = 28,
  className,
  once = true,
}: {
  children: React.ReactNode
  delay?: number
  y?: number
  className?: string
  once?: boolean
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: "-10% 0px -10% 0px" }}
      transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

/* ---------- Mots qui se lèvent un à un ---------- */
export function RiseWords({
  text,
  className,
  wordClassName,
  delay = 0,
  immediate = false,
}: {
  text: string
  className?: string
  wordClassName?: string
  delay?: number
  immediate?: boolean
}) {
  const words = text.split(" ")
  const trigger = immediate
    ? { animate: "show" as const }
    : { whileInView: "show" as const, viewport: { once: true, amount: 0.2 } as const }
  return (
    <motion.span
      className={className}
      initial="hidden"
      {...trigger}
      transition={{ staggerChildren: 0.06, delayChildren: delay }}
    >
      {words.map((w, i) => (
        <span key={i} className="inline-block overflow-hidden align-bottom">
          <motion.span
            className={"inline-block " + (wordClassName ?? "")}
            variants={{ hidden: { y: "110%" }, show: { y: "0%" } }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            {w}&nbsp;
          </motion.span>
        </span>
      ))}
    </motion.span>
  )
}

/* ---------- Parallax vertical basé sur le scroll ---------- */
export function useParallax(distance = 120) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] })
  const y = useTransform(scrollYProgress, [0, 1], [distance, -distance])
  return { ref, y }
}

export function Parallax({
  children,
  distance = 120,
  className,
}: {
  children: React.ReactNode
  distance?: number
  className?: string
}) {
  const { ref, y } = useParallax(distance)
  return (
    <div ref={ref} className={className}>
      <motion.div style={{ y }}>{children}</motion.div>
    </div>
  )
}

/* ---------- Compteur animé ---------- */
export function Counter({ to, raw = false }: { to: number; raw?: boolean }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: "-20%" })
  const [val, setVal] = useState(0)

  useEffect(() => {
    if (!inView) return
    const controls = animate(0, to, {
      duration: 1.8,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setVal(v),
    })
    return () => controls.stop()
  }, [inView, to])

  return <span ref={ref}>{raw ? Math.round(val) : Math.round(val).toLocaleString("fr-FR")}</span>
}

/* ---------- Carte 3D (tilt à la souris) ---------- */
export function TiltCard({
  children,
  className,
  intensity = 10,
}: {
  children: React.ReactNode
  className?: string
  intensity?: number
}) {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rx = useSpring(useTransform(y, [-0.5, 0.5], [intensity, -intensity]), { stiffness: 200, damping: 20 })
  const ry = useSpring(useTransform(x, [-0.5, 0.5], [-intensity, intensity]), { stiffness: 200, damping: 20 })

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    const r = e.currentTarget.getBoundingClientRect()
    x.set((e.clientX - r.left) / r.width - 0.5)
    y.set((e.clientY - r.top) / r.height - 0.5)
  }
  function onLeave() {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d", transformPerspective: 1000 }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

/* ---------- Bouton magnétique ---------- */
export function Magnetic({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 220, damping: 18 })
  const sy = useSpring(y, { stiffness: 220, damping: 18 })

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    const r = ref.current!.getBoundingClientRect()
    x.set((e.clientX - (r.left + r.width / 2)) * 0.35)
    y.set((e.clientY - (r.top + r.height / 2)) * 0.35)
  }
  function onLeave() {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ x: sx, y: sy }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

/* ---------- Barre de progression de lecture ---------- */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 })
  return (
    <motion.div
      style={{ scaleX }}
      className="fixed left-0 top-0 z-[60] h-[2px] w-full origin-left bg-[#b6b09f]"
    />
  )
}

/* ---------- Ligne divisant qui se trace ---------- */
export function DrawLine({ className }: { className?: string }) {
  return (
    <motion.div
      className={"h-px w-full origin-left bg-white/15 " + (className ?? "")}
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
    />
  )
}

/* ---------- Photo à profondeur (effet 3D parallax depuis une image plate) ---------- */
export function DepthPhoto({
  src,
  alt,
  className,
  priority = false,
}: {
  src: string
  alt: string
  className?: string
  priority?: boolean
}) {
  const mx = useMotionValue(0) // -0.5 .. 0.5
  const my = useMotionValue(0)

  // Inclinaison 3D du cadre
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [7, -7]), { stiffness: 150, damping: 18 })
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-9, 9]), { stiffness: 150, damping: 18 })
  // Parallax de l'image à l'intérieur du cadre
  const ix = useSpring(useTransform(mx, [-0.5, 0.5], ["5%", "-5%"]), { stiffness: 150, damping: 20 })
  const iy = useSpring(useTransform(my, [-0.5, 0.5], ["5%", "-5%"]), { stiffness: 150, damping: 20 })
  // Reflet lumineux qui suit le curseur
  const gpx = useTransform(mx, [-0.5, 0.5], [12, 88])
  const gpy = useTransform(my, [-0.5, 0.5], [12, 88])
  const glare = useMotionTemplate`radial-gradient(600px circle at ${gpx}% ${gpy}%, rgba(255,255,255,0.16), transparent 55%)`

  // Respiration continue (vie même sans souris / sur mobile)
  const scale = useMotionValue(1.16)
  useEffect(() => {
    const c = animate(scale, [1.16, 1.22], {
      duration: 9,
      repeat: Infinity,
      repeatType: "reverse",
      ease: "easeInOut",
    })
    return () => c.stop()
  }, [scale])

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    const r = e.currentTarget.getBoundingClientRect()
    mx.set((e.clientX - r.left) / r.width - 0.5)
    my.set((e.clientY - r.top) / r.height - 0.5)
  }
  function onLeave() {
    mx.set(0)
    my.set(0)
  }

  return (
    <div
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={"relative overflow-hidden " + (className ?? "")}
      style={{ perspective: 1200 }}
    >
      <motion.div
        style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }}
        className="absolute inset-0"
      >
        <motion.div style={{ x: ix, y: iy, scale }} className="absolute inset-0">
          <Image src={src} alt={alt} fill className="object-cover" priority={priority} />
        </motion.div>
        <motion.div style={{ background: glare }} className="pointer-events-none absolute inset-0 mix-blend-soft-light" />
        <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/10" />
      </motion.div>
    </div>
  )
}

export type { MotionValue }
