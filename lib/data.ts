export type NavLink = {
  label: string;
  href: string;
};

export type Property = {
  id: string;
  slug: string;
  title: string;
  address: string;
  city: string;
  price: number;
  priceType: "sale" | "rent";
  beds: number;
  baths: number;
  sqft: number;
  type: "house" | "condo" | "townhouse" | "land";
  featured: boolean;
  image: string;
  images: string[];
  description: string;
  yearBuilt: number;
  garage: number;
  lotSize: string;
  agentId: string;
};

export type Agent = {
  id: string;
  name: string;
  title: string;
  phone: string;
  email: string;
  image: string;
  bio: string;
  listings: number;
  sold: number;
};

export type Testimonial = {
  id: string;
  name: string;
  location: string;
  rating: number;
  text: string;
  image: string;
};

// ─── Navigation ────────────────────────────────────────────────────────────────
export const navLinks: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Listings", href: "/listings" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

// ─── Brand ─────────────────────────────────────────────────────────────────────
export const BRAND = {
  name: "Harborview Realty",
  tagline: "Find Your Place to Call Home",
  phone: "(555) 842-9100",
  email: "hello@harborviewrealty.com",
  address: "142 Harbor Blvd, Suite 300, Maplewood, CA 94102",
  social: {
    instagram: "https://instagram.com",
    facebook: "https://facebook.com",
    linkedin: "https://linkedin.com",
  },
} as const;

// ─── Agents ────────────────────────────────────────────────────────────────────
export const agents: Agent[] = [
  {
    id: "agent-1",
    name: "Sarah Whitmore",
    title: "Senior Listing Agent",
    phone: "(555) 842-9101",
    email: "sarah@harborviewrealty.com",
    image: "/images/real-estate-agent-woman-professional.jpg",
    bio: "With over 14 years in the Maplewood market, Sarah specializes in luxury residential sales and has closed more than 300 transactions.",
    listings: 24,
    sold: 312,
  },
  {
    id: "agent-2",
    name: "Marcus Chen",
    title: "Buyer's Specialist",
    phone: "(555) 842-9102",
    email: "marcus@harborviewrealty.com",
    image: "/images/real-estate-agent-man-professional.jpg",
    bio: "Marcus brings a data-driven approach to every search, helping first-time buyers and seasoned investors find properties that exceed expectations.",
    listings: 18,
    sold: 198,
  },
  {
    id: "agent-3",
    name: "Elena Vasquez",
    title: "Rental & Relocation Expert",
    phone: "(555) 842-9103",
    email: "elena@harborviewrealty.com",
    image: "/images/real-estate-agent-woman-smiling.jpg",
    bio: "Elena has guided hundreds of families through seamless relocations, with deep expertise in the rental market and neighborhood insights.",
    listings: 31,
    sold: 245,
  },
];

// ─── Testimonials ───────────────────────────────────────────────────────────────
export const testimonials: Testimonial[] = [
  {
    id: "t1",
    name: "James & Priya Holloway",
    location: "Maplewood Heights",
    rating: 5,
    text: "Sarah found us our dream home in under three weeks. The process was smooth, transparent, and genuinely enjoyable. We could not be happier with our new neighborhood.",
    image: "/images/couple-happy-homeowners.jpg",
  },
  {
    id: "t2",
    name: "Derek Fontaine",
    location: "Harborside District",
    rating: 5,
    text: "Marcus helped me navigate a competitive market as a first-time buyer. His patience and expertise saved me from two bad deals and landed me a gem at the right price.",
    image: "/images/man-homeowner-portrait.jpg",
  },
  {
    id: "t3",
    name: "Camille Okafor",
    location: "Riverside Commons",
    rating: 5,
    text: "Elena made our cross-country relocation feel effortless. She knew every block, every school district, and every hidden gem. Truly exceptional service.",
    image: "/images/woman-homeowner-portrait.jpg",
  },
];

// ─── Properties ────────────────────────────────────────────────────────────────
export const properties: Property[] = [
  {
    id: "prop-1",
    slug: "14-cedar-lane",
    title: "14 Cedar Lane",
    address: "14 Cedar Lane",
    city: "Maplewood Heights",
    price: 875000,
    priceType: "sale",
    beds: 4,
    baths: 3,
    sqft: 2840,
    type: "house",
    featured: true,
    image: "/images/luxury-house-exterior-cedar.jpg",
    images: [
      "/images/luxury-house-exterior-cedar.jpg",
      "/images/house-living-room-bright.jpg",
      "/images/house-kitchen-modern.jpg",
      "/images/house-master-bedroom.jpg",
    ],
    description:
      "A stunning craftsman-style home nestled on a tree-lined street in Maplewood Heights. Featuring an open-plan kitchen with quartz countertops, vaulted ceilings in the great room, and a private backyard with mature oaks. The primary suite includes a spa bath and walk-in closet. Walking distance to top-rated schools and the weekend farmers market.",
    yearBuilt: 2018,
    garage: 2,
    lotSize: "0.28 ac",
    agentId: "agent-1",
  },
  {
    id: "prop-2",
    slug: "ocean-view-condo-501",
    title: "Ocean View Condo #501",
    address: "501 Harbor Blvd, Unit 501",
    city: "Harborside District",
    price: 1250000,
    priceType: "sale",
    beds: 3,
    baths: 2,
    sqft: 1920,
    type: "condo",
    featured: true,
    image: "/images/luxury-condo-ocean-view.jpg",
    images: [
      "/images/luxury-condo-ocean-view.jpg",
      "/images/condo-living-room-view.jpg",
      "/images/condo-kitchen-open-plan.jpg",
      "/images/condo-master-suite.jpg",
    ],
    description:
      "Perched on the fifth floor of the prestigious Harbor Tower, this corner unit offers panoramic ocean views from every room. Floor-to-ceiling windows, wide-plank white oak floors, and a chef's kitchen with waterfall island. Building amenities include a rooftop pool, concierge, and private parking.",
    yearBuilt: 2021,
    garage: 1,
    lotSize: "N/A",
    agentId: "agent-2",
  },
  {
    id: "prop-3",
    slug: "riverside-townhouse-7b",
    title: "Riverside Townhouse 7B",
    address: "7B Riverside Commons",
    city: "Riverside Commons",
    price: 4800,
    priceType: "rent",
    beds: 3,
    baths: 2,
    sqft: 1650,
    type: "townhouse",
    featured: true,
    image: "/images/townhouse-riverside-exterior.jpg",
    images: [
      "/images/townhouse-riverside-exterior.jpg",
      "/images/townhouse-living-area.jpg",
      "/images/townhouse-kitchen-dining.jpg",
      "/images/townhouse-rooftop-deck.jpg",
    ],
    description:
      "A beautifully appointed three-story townhouse steps from the river trail. The open main level flows from a gourmet kitchen to a private patio. Upstairs, two generous bedrooms share a spa-inspired bath. The top floor primary suite has a private deck with river views. In-unit laundry, attached garage, and pet-friendly.",
    yearBuilt: 2019,
    garage: 1,
    lotSize: "0.08 ac",
    agentId: "agent-3",
  },
  {
    id: "prop-4",
    slug: "22-elm-street",
    title: "22 Elm Street",
    address: "22 Elm Street",
    city: "Maplewood Heights",
    price: 620000,
    priceType: "sale",
    beds: 3,
    baths: 2,
    sqft: 1980,
    type: "house",
    featured: false,
    image: "/images/charming-house-elm-street.jpg",
    images: [
      "/images/charming-house-elm-street.jpg",
      "/images/house-dining-room-bright.jpg",
      "/images/house-backyard-garden.jpg",
    ],
    description:
      "A charming colonial on one of Maplewood's most beloved streets. Freshly renovated kitchen, hardwood floors throughout, and a sun-drenched backyard garden. Close to downtown shops, restaurants, and the commuter rail.",
    yearBuilt: 1995,
    garage: 1,
    lotSize: "0.19 ac",
    agentId: "agent-1",
  },
  {
    id: "prop-5",
    slug: "harbor-studio-204",
    title: "Harbor Studio #204",
    address: "204 Harbor Blvd, Unit 204",
    city: "Harborside District",
    price: 2400,
    priceType: "rent",
    beds: 1,
    baths: 1,
    sqft: 720,
    type: "condo",
    featured: false,
    image: "/images/modern-studio-apartment-harbor.jpg",
    images: [
      "/images/modern-studio-apartment-harbor.jpg",
      "/images/studio-open-plan-living.jpg",
    ],
    description:
      "A sleek, light-filled studio in the heart of the Harborside District. Polished concrete floors, a Juliet balcony with harbor glimpses, and a fully equipped kitchen. Building has a fitness center, bike storage, and rooftop terrace. Utilities included.",
    yearBuilt: 2020,
    garage: 0,
    lotSize: "N/A",
    agentId: "agent-3",
  },
  {
    id: "prop-6",
    slug: "sunset-ridge-estate",
    title: "Sunset Ridge Estate",
    address: "9 Ridgecrest Drive",
    city: "Sunset Ridge",
    price: 2100000,
    priceType: "sale",
    beds: 5,
    baths: 4,
    sqft: 4600,
    type: "house",
    featured: true,
    image: "/images/luxury-estate-sunset-ridge.jpg",
    images: [
      "/images/luxury-estate-sunset-ridge.jpg",
      "/images/estate-grand-foyer.jpg",
      "/images/estate-pool-terrace.jpg",
      "/images/estate-home-office.jpg",
    ],
    description:
      "An extraordinary estate commanding sweeping valley views from its elevated Sunset Ridge setting. Grand foyer with double-height ceilings, a chef's kitchen with La Cornue range, a home theater, and a resort-style pool terrace. The five-bedroom layout includes a detached guest suite and a three-car garage.",
    yearBuilt: 2016,
    garage: 3,
    lotSize: "0.72 ac",
    agentId: "agent-1",
  },
];