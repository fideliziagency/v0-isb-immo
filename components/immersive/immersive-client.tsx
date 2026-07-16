"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
  AnimatePresence,
} from "framer-motion"
import {
  ArrowRight,
  ArrowDown,
  Phone,
  Mail,
  MessageCircle,
  MapPin,
  Plus,
  Maximize2,
} from "lucide-react"
import PlanLightbox from "@/components/plan-lightbox"
import {
  PROJECT,
  CHAPTERS,
  STATS,
  AMENITIES,
  TYPOLOGIES,
  OFFPLAN,
  TIMELINE,
  SCENES,
  type Typology,
} from "./data"
import { Reveal, RiseWords, Parallax, Counter, TiltCard, Magnetic, ScrollProgress, DrawLine } from "./primitives"

const BEIGE = "#b6b09f"

/* ============================ CURSEUR SUR-MESURE ============================ */
function Cursor() {
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const sx = useSpring(x, { stiffness: 500, damping: 40, mass: 0.4 })
  const sy = useSpring(y, { stiffness: 500, damping: 40, mass: 0.4 })
  const [hover, setHover] = useState(false)
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return
    setEnabled(true)
    const move = (e: MouseEvent) => {
      x.set(e.clientX)
      y.set(e.clientY)
      const t = e.target as HTMLElement
      setHover(!!t.closest("a,button,[data-cursor]"))
    }
    window.addEventListener("mousemove", move)
    return () => window.removeEventListener("mousemove", move)
  }, [x, y])

  if (!enabled) return null
  return (
    <motion.div
      className="pointer-events-none fixed left-0 top-0 z-[80] hidden md:block"
      style={{ x: sx, y: sy }}
    >
      <motion.div
        className="-translate-x-1/2 -translate-y-1/2 rounded-full border"
        animate={{
          width: hover ? 56 : 12,
          height: hover ? 56 : 12,
          borderColor: hover ? BEIGE : "rgba(255,255,255,0.6)",
          backgroundColor: hover ? "rgba(182,176,159,0.12)" : "rgba(255,255,255,0.9)",
        }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
      />
    </motion.div>
  )
}

/* ============================ NAVIGATION ============================ */
function ChapterNav({ active }: { active: string }) {
  return (
    <nav className="fixed right-6 top-1/2 z-50 hidden -translate-y-1/2 flex-col gap-4 lg:flex">
      {CHAPTERS.map((c) => (
        <a key={c.id} href={`#${c.id}`} className="group flex items-center justify-end gap-3" data-cursor>
          <span
            className="text-[10px] uppercase tracking-[0.25em] text-white/0 transition-all duration-300 group-hover:text-white/70"
            style={{ fontVariantNumeric: "tabular-nums" }}
          >
            {c.label}
          </span>
          <span
            className="h-[6px] w-[6px] rounded-full transition-all duration-300"
            style={{
              backgroundColor: active === c.id ? BEIGE : "rgba(255,255,255,0.3)",
              transform: active === c.id ? "scale(1.6)" : "scale(1)",
            }}
          />
        </a>
      ))}
    </nav>
  )
}

function TopBar({ shown }: { shown: boolean }) {
  return (
    <AnimatePresence>
      {shown && (
        <motion.header
          initial={{ y: -80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -80, opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-black/40 backdrop-blur-md"
        >
          <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
            <a href="#ouverture" className="disp text-lg tracking-wide text-white" data-cursor>
              The Life Residence
            </a>
            <div className="flex items-center gap-6">
              <a href="#residences" className="hidden text-xs uppercase tracking-[0.2em] text-white/70 hover:text-white sm:block" data-cursor>
                Résidences
              </a>
              <a href="#plans" className="hidden text-xs uppercase tracking-[0.2em] text-white/70 hover:text-white sm:block" data-cursor>
                Plans
              </a>
              <a
                href={`https://wa.me/${PROJECT.phoneRaw}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 border border-white/25 px-4 py-2 text-xs uppercase tracking-[0.2em] text-white transition-colors hover:border-[#b6b09f] hover:text-[#b6b09f]"
                data-cursor
              >
                <MessageCircle className="h-3.5 w-3.5" /> Nous contacter
              </a>
            </div>
          </div>
        </motion.header>
      )}
    </AnimatePresence>
  )
}

/* ============================ CHAPITRE — étiquette ============================ */
function ChapterTag({ index, label, dark = false }: { index: string; label: string; dark?: boolean }) {
  return (
    <Reveal className="mb-8 flex items-center gap-4">
      <span className="disp text-sm" style={{ color: BEIGE }}>
        {index}
      </span>
      <span className="h-px w-10" style={{ backgroundColor: dark ? "rgba(0,0,0,0.25)" : "rgba(255,255,255,0.35)" }} />
      <span
        className="text-[11px] uppercase tracking-[0.35em]"
        style={{ color: dark ? "rgba(0,0,0,0.55)" : "rgba(255,255,255,0.65)" }}
      >
        {label}
      </span>
    </Reveal>
  )
}

/* ============================ HERO ============================ */
function Hero() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] })
  const titleY = useTransform(scrollYProgress, [0, 1], [0, 220])
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.15])
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])
  const overlay = useTransform(scrollYProgress, [0, 1], [0.45, 0.85])
  const overlayBg = useTransform(overlay, (o) => `rgba(10,10,10,${o})`)

  return (
    <section id="ouverture" ref={ref} className="relative h-[100svh] w-full overflow-hidden bg-black">
      <motion.div style={{ scale }} className="absolute inset-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          poster={SCENES.heroPoster}
          className="h-full w-full object-cover"
          aria-label="The Life Residence — présentation vidéo"
        >
          <source src={SCENES.heroVideo} type="video/mp4" />
        </video>
      </motion.div>
      <motion.div style={{ backgroundColor: overlayBg }} className="absolute inset-0" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black" />

      <motion.div
        style={{ y: titleY, opacity }}
        className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center"
      >
        <motion.span
          initial={{ opacity: 0, letterSpacing: "0.1em" }}
          animate={{ opacity: 1, letterSpacing: "0.45em" }}
          transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-8 text-[11px] uppercase text-white/70"
        >
          ISB Immobilière · La Soukra
        </motion.span>
        <h1 className="disp text-white">
          <span className="block text-[clamp(2.8rem,9vw,8.5rem)] font-light leading-[0.95]">
            <RiseWords text="The Life" delay={0.2} immediate />
          </span>
          <span className="block text-[clamp(2.8rem,9vw,8.5rem)] font-light italic leading-[0.95]" style={{ color: BEIGE }}>
            <RiseWords text="Residence" delay={0.45} immediate />
          </span>
        </h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 1 }}
          className="mt-8 max-w-xl text-base font-light tracking-wide text-white/80 md:text-lg"
        >
          {PROJECT.tagline}. Une adresse d'exception à Chotrana 3, livrée fin 2027.
        </motion.p>
      </motion.div>

      <motion.div
        style={{ opacity }}
        className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-3 text-white/60"
      >
        <span className="text-[10px] uppercase tracking-[0.3em]">Défiler</span>
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 1.8 }}>
          <ArrowDown className="h-4 w-4" />
        </motion.div>
      </motion.div>
    </section>
  )
}

/* ============================ 01 · LE LIEU ============================ */
function Lieu() {
  return (
    <section id="lieu" className="relative bg-[#0c0c0c] py-28 md:py-40">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-6 lg:grid-cols-2 lg:gap-20">
        <div>
          <ChapterTag index="01" label="Le Lieu" />
          <h2 className="disp text-[clamp(2rem,5vw,4rem)] font-light leading-[1.05] text-white">
            <RiseWords text="La Soukra," />
            <br />
            <span className="italic" style={{ color: BEIGE }}>
              <RiseWords text="l'adresse qui monte" delay={0.15} />
            </span>
          </h2>
          <Reveal delay={0.1}>
            <p className="mt-8 max-w-md text-lg font-light leading-relaxed text-white/70">
              Sur la route principale, face au restaurant El Firma, The Life Residence s'élève au cœur d'un
              quartier recherché : calme résidentiel, commodités à portée de main et proximité immédiate de Tunis.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <a
              href={PROJECT.maps}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-3 text-sm uppercase tracking-[0.2em] text-white/80 transition-colors hover:text-[#b6b09f]"
              data-cursor
            >
              <MapPin className="h-4 w-4" /> {PROJECT.location}
              <ArrowRight className="h-4 w-4" />
            </a>
          </Reveal>
        </div>

        <Parallax distance={70} className="relative">
          <div className="relative aspect-[4/5] w-full overflow-hidden">
            <Image src={SCENES.aerial} alt="Vue aérienne de The Life Residence à La Soukra" fill className="object-cover" />
            <div className="absolute inset-0 ring-1 ring-inset ring-white/10" />
          </div>
          <div className="absolute -bottom-6 -left-6 hidden bg-[#b6b09f] px-6 py-4 md:block">
            <p className="disp text-3xl text-black">2027</p>
            <p className="text-[10px] uppercase tracking-[0.2em] text-black/70">Livraison prévue</p>
          </div>
        </Parallax>
      </div>
    </section>
  )
}

/* ============================ 02 · LA VISION ============================ */
function Vision() {
  return (
    <section id="vision" className="relative overflow-hidden bg-[#f4f2ec] py-28 text-black md:py-40">
      <div className="mx-auto max-w-7xl px-6">
        <ChapterTag index="02" label="La Vision" dark />
        <div className="max-w-5xl">
          <h2 className="disp text-[clamp(2rem,6vw,5.5rem)] font-light leading-[1.02]">
            <RiseWords text="Bien plus qu'une résidence :" />{" "}
            <span className="italic" style={{ color: "#8a836f" }}>
              <RiseWords text="un écosystème de vie." delay={0.2} />
            </span>
          </h2>
        </div>
        <Reveal delay={0.15}>
          <p className="mt-10 max-w-xl text-lg font-light leading-relaxed text-black/60">
            Architecture contemporaine, matériaux premium, services haut de gamme et sécurité permanente.
            Chaque détail a été pensé pour une expérience résidentielle unique à La Soukra.
          </p>
        </Reveal>

        <div className="mt-20">
          <DrawLine className="!bg-black/10" />
          <div className="grid grid-cols-2 gap-8 pt-12 md:grid-cols-4">
            {STATS.map((s, i) => (
              <Reveal key={s.label} delay={i * 0.08}>
                <div>
                  <p className="disp text-[clamp(2.5rem,6vw,5rem)] font-light leading-none">
                    <Counter to={s.value} raw={s.raw} />
                    {s.suffix}
                  </p>
                  <p className="mt-3 text-xs uppercase tracking-[0.2em] text-black/50">{s.label}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ============================ 03 · L'ART DE VIVRE ============================ */
function ArtDeVivre() {
  return (
    <section id="art-de-vivre" className="relative bg-[#0c0c0c] py-28 md:py-40">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div>
            <ChapterTag index="03" label="L'Art de vivre" />
            <h2 className="disp max-w-2xl text-[clamp(2rem,5vw,4rem)] font-light leading-[1.05] text-white">
              <RiseWords text="Tout, à portée de porte." />
            </h2>
          </div>
          <Reveal>
            <p className="max-w-sm text-base font-light leading-relaxed text-white/60">
              Huit services premium qui transforment le quotidien en art de vivre.
            </p>
          </Reveal>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {AMENITIES.map((a, i) => (
            <Reveal key={a.title} delay={(i % 4) * 0.08}>
              <TiltCard className="group h-full">
                <div className="flex h-full flex-col justify-between border border-white/10 bg-white/[0.02] p-7 transition-colors duration-500 hover:border-[#b6b09f]/40 hover:bg-white/[0.04]">
                  <div className="mb-10 flex items-center justify-between">
                    <span className="text-[10px] uppercase tracking-[0.2em]" style={{ color: BEIGE }}>
                      {a.tag}
                    </span>
                    <Plus className="h-4 w-4 text-white/30 transition-transform duration-500 group-hover:rotate-90" />
                  </div>
                  <div style={{ transform: "translateZ(30px)" }}>
                    <h3 className="disp text-2xl font-light text-white">{a.title}</h3>
                    <p className="mt-3 text-sm font-light leading-relaxed text-white/55">{a.desc}</p>
                  </div>
                </div>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ============================ 04 · LES RÉSIDENCES ============================ */
function ResidenceRow({ t, i }: { t: Typology; i: number }) {
  const flip = i % 2 === 1
  const [mode, setMode] = useState<"photo" | "3d">("photo")
  const has3d = !!t.view3d
  const src = mode === "3d" && t.view3d ? t.view3d : t.image
  return (
    <div className="mx-auto max-w-7xl px-6">
      <div className={`grid grid-cols-1 items-center gap-10 py-16 lg:grid-cols-12 lg:gap-16 ${flip ? "" : ""}`}>
        {/* Visuel */}
        <div className={`lg:col-span-7 ${flip ? "lg:order-2" : ""}`}>
          <Parallax distance={50}>
            <TiltCard intensity={6}>
              <div className="relative aspect-[16/10] w-full overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={mode}
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={src}
                      alt={mode === "3d" ? `Vue 3D ${t.name}` : t.name}
                      fill
                      className="object-cover"
                    />
                  </motion.div>
                </AnimatePresence>
                <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/10" />

                {/* Bascule Photo / Vue 3D */}
                {has3d && (
                  <div
                    className="absolute left-4 top-4 z-20 flex gap-1 border border-white/15 bg-black/50 p-1 backdrop-blur-sm"
                    style={{ transform: "translateZ(60px)" }}
                  >
                    {(["photo", "3d"] as const).map((m) => (
                      <button
                        key={m}
                        onClick={() => setMode(m)}
                        className="px-3 py-1.5 text-[10px] uppercase tracking-[0.15em] transition-colors duration-300"
                        style={{
                          backgroundColor: mode === m ? BEIGE : "transparent",
                          color: mode === m ? "#000" : "rgba(255,255,255,0.75)",
                        }}
                        data-cursor
                      >
                        {m === "photo" ? "Photo" : "Vue 3D"}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </TiltCard>
          </Parallax>
        </div>

        {/* Texte */}
        <div className={`lg:col-span-5 ${flip ? "lg:order-1" : ""}`}>
          <Reveal>
            <p className="text-[11px] uppercase tracking-[0.3em]" style={{ color: BEIGE }}>
              {t.kicker}
            </p>
            <h3 className="disp mt-4 text-[clamp(2rem,4vw,3.5rem)] font-light leading-none text-white">{t.name}</h3>
            <div className="mt-6 flex gap-8">
              <div>
                <p className="disp text-2xl text-white">{t.surface}</p>
                <p className="text-[10px] uppercase tracking-[0.2em] text-white/40">Surface</p>
              </div>
              <div>
                <p className="disp text-2xl text-white">{t.pieces}</p>
                <p className="text-[10px] uppercase tracking-[0.2em] text-white/40">Agencement</p>
              </div>
            </div>
            <p className="mt-6 max-w-md text-base font-light leading-relaxed text-white/60">{t.desc}</p>
            <Link
              href={t.href}
              className="group mt-8 inline-flex items-center gap-3 border-b border-white/20 pb-2 text-sm uppercase tracking-[0.2em] text-white transition-colors hover:border-[#b6b09f] hover:text-[#b6b09f]"
              data-cursor
            >
              Découvrir cette typologie
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </Reveal>
        </div>
      </div>
      <DrawLine />
    </div>
  )
}

function Residences() {
  return (
    <section id="residences" className="relative bg-[#0c0c0c] py-28 md:py-36">
      <div className="mx-auto mb-8 max-w-7xl px-6">
        <ChapterTag index="04" label="Les Résidences" />
        <h2 className="disp max-w-3xl text-[clamp(2rem,5vw,4.5rem)] font-light leading-[1.05] text-white">
          <RiseWords text="Cinq façons" />{" "}
          <span className="italic" style={{ color: BEIGE }}>
            <RiseWords text="d'habiter le lieu." delay={0.15} />
          </span>
        </h2>
      </div>
      {TYPOLOGIES.map((t, i) => (
        <ResidenceRow key={t.code} t={t} i={i} />
      ))}
    </section>
  )
}

/* ============================ 05 · LES PLANS ============================ */
function Plans() {
  const [active, setActive] = useState(0)
  const [lightbox, setLightbox] = useState<{ open: boolean; index: number }>({ open: false, index: 0 })
  const t = TYPOLOGIES[active]

  return (
    <section id="plans" className="relative bg-[#f4f2ec] py-28 text-black md:py-40">
      <div className="mx-auto max-w-7xl px-6">
        <ChapterTag index="05" label="Les Plans" dark />
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <h2 className="disp max-w-2xl text-[clamp(2rem,5vw,4.5rem)] font-light leading-[1.03]">
            <RiseWords text="Explorez chaque" />{" "}
            <span className="italic" style={{ color: "#8a836f" }}>
              <RiseWords text="mètre carré." delay={0.15} />
            </span>
          </h2>
          <Reveal>
            <p className="max-w-xs text-base font-light leading-relaxed text-black/55">
              Plans d'agencement détaillés, appartement par appartement. Cliquez pour agrandir.
            </p>
          </Reveal>
        </div>

        {/* Sélecteur de typologie */}
        <div className="mt-14 flex flex-wrap gap-3">
          {TYPOLOGIES.map((ty, i) => (
            <button
              key={ty.code}
              onClick={() => setActive(i)}
              className="border px-5 py-2.5 text-xs uppercase tracking-[0.2em] transition-all duration-300"
              style={{
                borderColor: i === active ? "#000" : "rgba(0,0,0,0.2)",
                backgroundColor: i === active ? "#000" : "transparent",
                color: i === active ? "#fff" : "rgba(0,0,0,0.6)",
              }}
              data-cursor
            >
              {ty.name.replace("Appartement ", "")}
            </button>
          ))}
        </div>

        {/* Grille de plans */}
        <AnimatePresence mode="wait">
          <motion.div
            key={t.code}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="mt-10"
          >
            {t.plans.length > 0 ? (
              <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                {t.plans.map((p, idx) => (
                  <button
                    key={p.src}
                    onClick={() => setLightbox({ open: true, index: idx })}
                    className="group relative aspect-square overflow-hidden border border-black/10 bg-white"
                    data-cursor
                  >
                    <Image src={p.src} alt={p.alt} fill className="object-contain p-3 transition-transform duration-500 group-hover:scale-105" />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors duration-300 group-hover:bg-black/5">
                      <Maximize2 className="h-5 w-5 text-black/0 transition-colors duration-300 group-hover:text-black/60" />
                    </div>
                    <span className="absolute bottom-0 left-0 right-0 truncate bg-white/90 px-3 py-2 text-left text-[11px] uppercase tracking-wider text-black/60">
                      {p.title}
                    </span>
                  </button>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-start gap-5 border border-black/10 bg-white p-10">
                <p className="disp text-2xl">Plans de villa sur demande</p>
                <p className="max-w-md text-base font-light text-black/55">
                  Les plans détaillés des villas individuelles (353–357 m²) sont communiqués sur rendez-vous
                  personnalisé.
                </p>
                <a
                  href={`https://wa.me/${PROJECT.phoneRaw}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 bg-black px-6 py-3 text-xs uppercase tracking-[0.2em] text-white transition-colors hover:bg-[#8a836f]"
                  data-cursor
                >
                  <MessageCircle className="h-4 w-4" /> Recevoir les plans
                </a>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      <PlanLightbox
        isOpen={lightbox.open}
        onClose={() => setLightbox({ open: false, index: 0 })}
        plans={t.plans}
        initialIndex={lightbox.index}
      />
    </section>
  )
}

/* ============================ 06 · INVESTIR ============================ */
function Investir() {
  return (
    <section id="investir" className="relative overflow-hidden bg-[#0c0c0c] py-28 md:py-40">
      <Parallax distance={90} className="pointer-events-none absolute inset-0 opacity-25">
        <div className="relative h-[130%] w-full">
          <Image src={SCENES.night} alt="" fill className="object-cover" />
        </div>
      </Parallax>
      <div className="absolute inset-0 bg-black/70" />

      <div className="relative mx-auto max-w-7xl px-6">
        <ChapterTag index="06" label="Investir" />
        <h2 className="disp max-w-3xl text-[clamp(2rem,5vw,4.5rem)] font-light leading-[1.05] text-white">
          <RiseWords text="Acheter sur plan," />{" "}
          <span className="italic" style={{ color: BEIGE }}>
            <RiseWords text="acheter mieux." delay={0.15} />
          </span>
        </h2>

        <div className="mt-16 grid grid-cols-1 gap-x-16 gap-y-10 md:grid-cols-2">
          {OFFPLAN.map((o, i) => (
            <Reveal key={o.k} delay={(i % 2) * 0.1}>
              <div className="border-t border-white/15 pt-6">
                <div className="flex items-baseline gap-4">
                  <span className="disp text-sm" style={{ color: BEIGE }}>
                    0{i + 1}
                  </span>
                  <h3 className="disp text-2xl font-light text-white">{o.k}</h3>
                </div>
                <p className="mt-3 max-w-md pl-8 text-base font-light leading-relaxed text-white/60">{o.v}</p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Timeline */}
        <div className="mt-24">
          <Reveal>
            <p className="text-[11px] uppercase tracking-[0.3em] text-white/50">Le parcours, en 4 étapes</p>
          </Reveal>
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {TIMELINE.map((s, i) => (
              <Reveal key={s.step} delay={i * 0.1}>
                <div className="border-l-2 pl-5" style={{ borderColor: BEIGE }}>
                  <p className="disp text-4xl font-light text-white/25">{s.step}</p>
                  <h4 className="disp mt-2 text-xl text-white">{s.title}</h4>
                  <p className="mt-1 text-xs uppercase tracking-[0.2em]" style={{ color: BEIGE }}>
                    {s.when}
                  </p>
                  <p className="mt-3 text-sm font-light leading-relaxed text-white/55">{s.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ============================ 07 · CONTACT ============================ */
function Contact() {
  return (
    <section id="contact" className="relative flex min-h-[90svh] items-center overflow-hidden bg-[#0a0a0a] py-28">
      <Parallax distance={80} className="pointer-events-none absolute inset-0 opacity-30">
        <div className="relative h-[130%] w-full">
          <Image src={SCENES.pool} alt="" fill className="object-cover" />
        </div>
      </Parallax>
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black" />

      <div className="relative mx-auto w-full max-w-7xl px-6 text-center">
        <ChapterTag index="07" label="Contact" />
        <h2 className="disp mx-auto max-w-4xl text-[clamp(2.5rem,7vw,6.5rem)] font-light leading-[0.98] text-white">
          <RiseWords text="Écrivons" />{" "}
          <span className="italic" style={{ color: BEIGE }}>
            <RiseWords text="la suite." delay={0.15} />
          </span>
        </h2>
        <Reveal delay={0.15}>
          <p className="mx-auto mt-8 max-w-xl text-lg font-light text-white/70">
            Notre équipe vous accompagne, du premier échange à la remise des clés.
          </p>
        </Reveal>

        <div className="mt-14 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Magnetic>
            <a
              href={`https://wa.me/${PROJECT.phoneRaw}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 bg-[#b6b09f] px-8 py-4 text-sm uppercase tracking-[0.2em] text-black transition-colors hover:bg-white"
              data-cursor
            >
              <MessageCircle className="h-4 w-4" /> WhatsApp
            </a>
          </Magnetic>
          <Magnetic>
            <a
              href={`tel:${PROJECT.phoneRaw}`}
              className="flex items-center gap-3 border border-white/25 px-8 py-4 text-sm uppercase tracking-[0.2em] text-white transition-colors hover:border-[#b6b09f] hover:text-[#b6b09f]"
              data-cursor
            >
              <Phone className="h-4 w-4" /> {PROJECT.phone}
            </a>
          </Magnetic>
          <Magnetic>
            <a
              href={`mailto:${PROJECT.email}`}
              className="flex items-center gap-3 border border-white/25 px-8 py-4 text-sm uppercase tracking-[0.2em] text-white transition-colors hover:border-[#b6b09f] hover:text-[#b6b09f]"
              data-cursor
            >
              <Mail className="h-4 w-4" /> Email
            </a>
          </Magnetic>
        </div>

        <Reveal delay={0.2}>
          <p className="mt-14 text-xs uppercase tracking-[0.25em] text-white/40">
            {PROJECT.location} — {PROJECT.developer}
          </p>
        </Reveal>
      </div>
    </section>
  )
}

/* ============================ PAGE ============================ */
export default function ImmersiveClient() {
  const [active, setActive] = useState("ouverture")
  const [barShown, setBarShown] = useState(false)

  useEffect(() => {
    const ids = CHAPTERS.map((c) => c.id)
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id)
        })
        setBarShown(window.scrollY > window.innerHeight * 0.9)
      },
      { rootMargin: "-45% 0px -45% 0px" }
    )
    ids.forEach((id) => {
      const el = document.getElementById(id)
      if (el) obs.observe(el)
    })
    const onScroll = () => setBarShown(window.scrollY > window.innerHeight * 0.9)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => {
      obs.disconnect()
      window.removeEventListener("scroll", onScroll)
    }
  }, [])

  return (
    <div className="relative bg-[#0a0a0a]">
      <div className="immersive-root grain">
        <Cursor />
        <ScrollProgress />
        <TopBar shown={barShown} />
        <ChapterNav active={active} />

        <main>
          <Hero />
          <Lieu />
          <Vision />
          <ArtDeVivre />
          <Residences />
          <Plans />
          <Investir />
          <Contact />
        </main>
      </div>
    </div>
  )
}
