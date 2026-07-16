import type { Metadata } from "next"
import { Cormorant_Garamond } from "next/font/google"
import ImmersiveClient from "@/components/immersive/immersive-client"

const display = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
})

export const metadata: Metadata = {
  title: "The Life Residence — Expérience immersive | La Soukra",
  description:
    "Découvrez The Life Residence comme une histoire : parcours cinématique du lieu aux plans détaillés. 82 appartements, 2 duplex et 6 villas à La Soukra. Livraison fin 2027.",
}

export default function ImmersivePage() {
  return (
    <div className={display.variable}>
      <ImmersiveClient />
    </div>
  )
}
