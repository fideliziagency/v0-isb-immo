// Contenu éditorial de l'expérience immersive — The Life Residence
// Faits issus du projet réel (ISB Immobilière Sodaprim Bouaziz).

export const PROJECT = {
  name: "The Life Residence",
  tagline: "L'art de vivre au cœur de la modernité",
  developer: "ISB Immobilière — Sodaprim Bouaziz",
  location: "Chotrana 3, La Soukra — Tunis",
  street: "Rue des fruits",
  delivery: "Fin 2027",
  phone: "+216 58 666 963",
  phoneRaw: "21658666963",
  email: "contact@isbimmobiliere.com",
  maps: "https://maps.app.goo.gl/KTdZAkeXNtD2qfbQ6",
}

export const CHAPTERS = [
  { id: "ouverture", index: "00", label: "Ouverture" },
  { id: "lieu", index: "01", label: "Le Lieu" },
  { id: "vision", index: "02", label: "La Vision" },
  { id: "art-de-vivre", index: "03", label: "L'Art de vivre" },
  { id: "residences", index: "04", label: "Les Résidences" },
  { id: "plans", index: "05", label: "Les Plans" },
  { id: "investir", index: "06", label: "Investir" },
  { id: "contact", index: "07", label: "Contact" },
]

export const STATS = [
  { value: 82, suffix: "", label: "Appartements" },
  { value: 6, suffix: "", label: "Villas individuelles" },
  { value: 2, suffix: "", label: "Duplex de prestige" },
  { value: 2027, suffix: "", label: "Livraison", raw: true },
]

export const AMENITIES = [
  { title: "Sécurité 24h/24", desc: "Gardiennage permanent et surveillance active en continu.", tag: "Sérénité" },
  { title: "Salle de sport", desc: "Un espace fitness équipé, réservé aux résidents.", tag: "Bien-être" },
  { title: "Bassin intérieur", desc: "Un plan d'eau apaisant au cœur de la cour.", tag: "Loisirs" },
  { title: "Aire de jeux", desc: "Un espace sécurisé pensé pour les enfants.", tag: "Famille" },
  { title: "Fibre optique", desc: "Très haut débit pré-installé dans chaque logement.", tag: "Technologie" },
  { title: "Parking sécurisé", desc: "Stationnement couvert et surveillé pour tous.", tag: "Commodités" },
  { title: "Vidéosurveillance", desc: "Caméras HD couvrant l'ensemble des parties communes.", tag: "Sécurité" },
  { title: "Énergie photovoltaïque", desc: "Alimentation de secours des parties communes.", tag: "Durable" },
]

export type Typology = {
  code: string
  name: string
  kicker: string
  pieces: string
  surface: string
  desc: string
  image: string
  view3d?: string
  href: string
  plans: { src: string; alt: string; title: string }[]
}

export const TYPOLOGIES: Typology[] = [
  {
    code: "s1",
    name: "Appartement S+1",
    kicker: "L'essentiel, sublimé",
    pieces: "2 pièces",
    surface: "48 – 77 m²",
    desc: "Un premier chez-soi lumineux, pensé au millimètre, où chaque volume respire.",
    image: "/s1-luxury-living-room-hero.png",
    view3d: "/apartment-3d-view-s1.png",
    href: "/logements/s1",
    plans: [
      { src: "/apartment-floor-plan-s1.png", alt: "Plan type Appartement S+1", title: "S+1 — Plan type" },
      { src: "/s1-plan-a02.png", alt: "Plan S+1 A.02", title: "S+1 — Appartement A.02" },
      { src: "/s1-plan-c02.png", alt: "Plan S+1 C.02", title: "S+1 — Appartement C.02" },
      { src: "/s1-plan-e01.png", alt: "Plan S+1 E.01", title: "S+1 — Appartement E.01" },
    ],
  },
  {
    code: "s2",
    name: "Appartement S+2",
    kicker: "L'équilibre parfait",
    pieces: "3 pièces",
    surface: "87 – 136 m²",
    desc: "L'espace pour vivre à deux ou en famille, entre intimité et convivialité.",
    image: "/s2-modern-living-room-hero.png",
    view3d: "/apartment-3d-view-s2.png",
    href: "/logements/s2",
    plans: [
      { src: "/apartment-floor-plan-s2.png", alt: "Plan type Appartement S+2", title: "S+2 — Plan type" },
      { src: "/s2-plan-a04.png", alt: "Plan S+2 A.04", title: "S+2 — Appartement A.04" },
      { src: "/s2-plan-b03.png", alt: "Plan S+2 B.03", title: "S+2 — Appartement B.03" },
      { src: "/s2-plan-c01.png", alt: "Plan S+2 C.01", title: "S+2 — Appartement C.01" },
    ],
  },
  {
    code: "s3",
    name: "Appartement S+3",
    kicker: "L'espace pour grandir",
    pieces: "4 pièces",
    surface: "139 – 208 m²",
    desc: "Une suite parentale, de vastes pièces de vie : la maison de famille, en hauteur.",
    image: "/s3-modern-living-dining-hero.jpeg",
    view3d: "/apartment-3d-view-s3.png",
    href: "/logements/s3",
    plans: [
      { src: "/apartment-floor-plan-s3.png", alt: "Plan type Appartement S+3", title: "S+3 — Plan type" },
      { src: "/s3-plan-a01.png", alt: "Plan S+3 A.01", title: "S+3 — Appartement A.01" },
      { src: "/s3-plan-b01.png", alt: "Plan S+3 B.01", title: "S+3 — Appartement B.01" },
      { src: "/s3-plan-d01.png", alt: "Plan S+3 D.01", title: "S+3 — Appartement D.01" },
    ],
  },
  {
    code: "duplex",
    name: "Duplex de prestige",
    kicker: "Vivre sur deux niveaux",
    pieces: "2 niveaux",
    surface: "221 – 254 m²",
    desc: "Trois suites, une piscine privée, un escalier sculptural : l'exception au quotidien.",
    image: "/duplex-new-cover-hero.png",
    view3d: "/duplex-3d-architectural-view.png",
    href: "/logements/duplex",
    plans: [
      { src: "/duplex-plan-fd01.png", alt: "Plan Duplex FD.01", title: "Duplex FD.01 — 254 m²" },
      { src: "/duplex-plan-gd05.png", alt: "Plan Duplex GD.05", title: "Duplex GD.05 — 221 m²" },
      { src: "/duplex-floor-plan-level1.png", alt: "Duplex — niveau 1", title: "Duplex — Rez-de-chaussée" },
      { src: "/duplex-floor-plan-level2.png", alt: "Duplex — niveau 2", title: "Duplex — Étage" },
    ],
  },
  {
    code: "villa",
    name: "Villa individuelle",
    kicker: "Le sommet de l'adresse",
    pieces: "2 niveaux",
    surface: "353 – 357 m²",
    desc: "Une villa avec piscine et jardin privatifs, la pièce maîtresse de la résidence.",
    image: "/villa-new-exterior-view.png",
    view3d: "/villa-modern-pool-exterior.jpeg",
    href: "/logements/villa",
    plans: [],
  },
]

export const OFFPLAN = [
  { k: "Prix préférentiels", v: "Des conditions réservées aux premiers acquéreurs, avant livraison." },
  { k: "Choix prioritaire", v: "Étage, orientation et vue : vous sélectionnez parmi les meilleures options." },
  { k: "Paiement échelonné", v: "Jusqu'à 36 mois de facilités, un échéancier adapté à votre budget." },
  { k: "Garanties légales", v: "Décennale, biennale et parfait achèvement — votre investissement protégé." },
]

export const TIMELINE = [
  { step: "01", title: "Réservation", when: "Immédiat", desc: "Contrat de réservation et acompte." },
  { step: "02", title: "Construction", when: "24 mois", desc: "Suivi de chantier et visites régulières." },
  { step: "03", title: "Pré-livraison", when: "1 mois", desc: "Réception et vérification de la conformité." },
  { step: "04", title: "Livraison", when: "Fin 2027", desc: "Remise des clés et garanties." },
]

// Visuels utilisés dans les scènes cinématiques (parallax / fonds)
export const SCENES = {
  heroPoster: "/nouvelle-facade-residence.png",
  heroVideo: "/header-isb.mp4",
  aerial: "/isb-residence-6.jpg",
  facade: "/isb-residence-3.jpg",
  night: "/isb-residence-4.jpg",
  pool: "/the-life-residence-pool-courtyard.png",
  fitness: "/isb-residence-7.jpg",
  villas: "/isb-residence-5.jpg",
  front: "/the-life-residence-front-view.jpeg",
}
