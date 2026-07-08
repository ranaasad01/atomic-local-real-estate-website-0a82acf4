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

export type Neighborhood = {
  id: string;
  name: string;
  description: string;
  image: string;
  avgPrice: string;
  avgRent: string;
  schoolRating: number;
  walkScore: number;
  highlights: string[];
};

export type BlogPost = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  authorImage: string;
  date: string;
  readTime: string;
  image: string;
  featured: boolean;
};

// ─── Navigation ────────────────────────────────────────────────────────────────
export const navLinks: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Listings", href: "/listings" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "Sell", href: "/sell" },
  { label: "Neighborhoods", href: "/neighborhoods" },
  { label: "Blog", href: "/blog" },
  { label: "Agents", href: "/agents" },
  { label: "Mortgage", href: "/mortgage-calculator" },
  { label: "Favorites", href: "/favorites" },
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
    slug: "coastal-craftsman-estate",
    title: "Coastal Craftsman Estate",
    address: "28 Seabreeze Lane",
    city: "Maplewood Heights",
    price: 1_295_000,
    priceType: "sale",
    beds: 4,
    baths: 3,
    sqft: 2_840,
    type: "house",
    featured: true,
    image: "https://onekindesign.com/wp-content/uploads/2023/05/Coastal-Craftsman-Style-Home-Clark-Co-Home-01-1-Kindesign.jpg",
    images: [
      "https://onekindesign.com/wp-content/uploads/2023/05/Coastal-Craftsman-Style-Home-Clark-Co-Home-01-1-Kindesign.jpg",
      "https://photos.zillowstatic.com/fp/8bf29962bf614151ea041c46865b4676-cc_ft_960.jpg",
    ],
    description: "A stunning coastal craftsman estate nestled in the heart of Maplewood Heights. This beautifully maintained home features soaring ceilings, wide-plank hardwood floors, and an open-concept kitchen with quartz countertops.",
    yearBuilt: 2008,
    garage: 2,
    lotSize: "0.34 acres",
    agentId: "agent-1",
  },
  {
    id: "prop-2",
    slug: "harborside-modern-condo",
    title: "Harborside Modern Condo",
    address: "501 Marina View Dr, Unit 12A",
    city: "Harborside District",
    price: 689_000,
    priceType: "sale",
    beds: 2,
    baths: 2,
    sqft: 1_180,
    type: "condo",
    featured: true,
    image: "https://landcast-nwmls-listing-images.s3.us-west-2.amazonaws.com/2518966/2518966_02.webp",
    images: [
      "https://landcast-nwmls-listing-images.s3.us-west-2.amazonaws.com/2518966/2518966_02.webp",
    ],
    description: "A sleek modern condo with stunning harbor views. Floor-to-ceiling windows, designer finishes, and a private balcony make this an exceptional urban retreat.",
    yearBuilt: 2019,
    garage: 1,
    lotSize: "N/A",
    agentId: "agent-2",
  },
  {
    id: "prop-3",
    slug: "riverside-townhouse",
    title: "Riverside Townhouse",
    address: "77 Willowbrook Terrace",
    city: "Riverside Commons",
    price: 4_800,
    priceType: "rent",
    beds: 3,
    baths: 2,
    sqft: 1_620,
    type: "townhouse",
    featured: false,
    image: "https://photos.zillowstatic.com/fp/719fba7ead59e8a7eed15bc6f58fb998-p_e.webp",
    images: [
      "https://photos.zillowstatic.com/fp/719fba7ead59e8a7eed15bc6f58fb998-p_e.webp",
    ],
    description: "A charming riverside townhouse with a private patio and community green space. Perfect for families seeking a peaceful retreat close to nature trails and top schools.",
    yearBuilt: 2015,
    garage: 1,
    lotSize: "0.08 acres",
    agentId: "agent-3",
  },
  {
    id: "prop-4",
    slug: "sunlit-bungalow-retreat",
    title: "Sunlit Bungalow Retreat",
    address: "14 Amber Oak Court",
    city: "Maplewood",
    price: 875_000,
    priceType: "sale",
    beds: 3,
    baths: 2,
    sqft: 1_950,
    type: "house",
    featured: true,
    image: "https://a0.muscache.com/im/pictures/hosting/Hosting-1668221787137807247/original/7844f3cb-de2f-4130-a55a-ce8069c86b4a.jpeg?im_w=720",
    images: [
      "https://a0.muscache.com/im/pictures/hosting/Hosting-1668221787137807247/original/7844f3cb-de2f-4130-a55a-ce8069c86b4a.jpeg?im_w=720",
    ],
    description: "A sunlit bungalow retreat with warm interiors, a wraparound porch, and a beautifully landscaped garden. Ideal for those seeking a serene lifestyle close to the best of Maplewood.",
    yearBuilt: 2001,
    garage: 1,
    lotSize: "0.22 acres",
    agentId: "agent-1",
  },
];

// ─── Neighborhoods ─────────────────────────────────────────────────────────────
export const neighborhoods: Neighborhood[] = [
  {
    id: "maplewood-heights",
    name: "Maplewood Heights",
    description: "A prestigious residential enclave known for its tree-lined streets, top-rated schools, and a strong sense of community. Weekend farmers markets and local boutiques make this neighborhood a perennial favorite for families.",
    image: "https://c8.alamy.com/comp/E6HGT5/aerial-view-of-maplewood-new-jersey-E6HGT5.jpg",
    avgPrice: "$1.1M",
    avgRent: "$3,800/mo",
    schoolRating: 9,
    walkScore: 82,
    highlights: ["Top-rated schools", "Tree-lined streets", "Weekend farmers market"],
  },
  {
    id: "harborside-district",
    name: "Harborside District",
    description: "A vibrant waterfront neighborhood brimming with energy. From marina access and waterfront dining to a lively arts scene and nightlife, Harborside is the heartbeat of the city for young professionals and urban dwellers.",
    image: "https://landcast-nwmls-listing-images.s3.us-west-2.amazonaws.com/2518966/2518966_02.webp",
    avgPrice: "$720K",
    avgRent: "$2,900/mo",
    schoolRating: 8,
    walkScore: 91,
    highlights: ["Waterfront dining", "Marina access", "Vibrant nightlife"],
  },
  {
    id: "riverside-commons",
    name: "Riverside Commons",
    description: "A family-friendly neighborhood nestled along the river, offering scenic trails, community parks, and a calendar full of local events. Riverside Commons strikes the perfect balance between nature and convenience.",
    image: "https://photos.zillowstatic.com/fp/719fba7ead59e8a7eed15bc6f58fb998-p_e.webp",
    avgPrice: "$580K",
    avgRent: "$2,400/mo",
    schoolRating: 8,
    walkScore: 74,
    highlights: ["Riverside trails", "Family-friendly parks", "Community events"],
  },
  {
    id: "elmwood-estates",
    name: "Elmwood Estates",
    description: "The pinnacle of luxury living in the region. Elmwood Estates is home to grand estates, private schools, and exclusive golf club access. Discerning buyers seeking privacy, prestige, and space will find their match here.",
    image: "https://patch.com/img/cdn/users/52627/2013/01/raw/d24ba18677f7abcaca898d7b95489f51.jpg",
    avgPrice: "$1.4M",
    avgRent: "$4,500/mo",
    schoolRating: 10,
    walkScore: 65,
    highlights: ["Luxury estates", "Private schools", "Golf club access"],
  },
  {
    id: "downtown-core",
    name: "Downtown Core",
    description: "The urban pulse of Maplewood. With a near-perfect walk score, the Downtown Core puts restaurants, cafes, galleries, and transit right at your doorstep. Ideal for those who want to live, work, and play in one vibrant district.",
    image: "https://img.peerspace.com/image/upload/f_auto,q_auto,dpr_auto,w_3840/cnl0uk8mwprj4falgoqt",
    avgPrice: "$490K",
    avgRent: "$2,100/mo",
    schoolRating: 7,
    walkScore: 96,
    highlights: ["Transit hub", "Restaurants & cafes", "Arts district"],
  },
  {
    id: "crestview-hills",
    name: "Crestview Hills",
    description: "Perched above the city with sweeping panoramic views, Crestview Hills offers a tranquil escape without sacrificing proximity to amenities. Quiet cul-de-sacs, nature reserves, and a tight-knit community define this elevated enclave.",
    image: "https://a0.muscache.com/im/pictures/hosting/Hosting-1668221787137807247/original/7844f3cb-de2f-4130-a55a-ce8069c86b4a.jpeg?im_w=720",
    avgPrice: "$950K",
    avgRent: "$3,200/mo",
    schoolRating: 9,
    walkScore: 58,
    highlights: ["Panoramic views", "Quiet cul-de-sacs", "Nature reserves"],
  },
];

// ─── Blog Posts ────────────────────────────────────────────────────────────────
export const blogPosts: BlogPost[] = [
  {
    id: "bp-1",
    slug: "maplewood-market-report-2024",
    title: "Maplewood Real Estate Market Report: What Buyers & Sellers Need to Know in 2024",
    excerpt: "Home prices in Maplewood rose 6.2% year-over-year, inventory remains tight, and bidding wars are back in the most desirable neighborhoods. Here is what the data means for you.",
    category: "Market Trends",
    author: "Sarah Whitmore",
    authorImage: "/images/real-estate-agent-woman-professional.jpg",
    date: "2024-06-10",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80",
    featured: true,
  },
  {
    id: "bp-2",
    slug: "first-time-buyer-guide-2024",
    title: "The Complete First-Time Buyer's Guide: From Pre-Approval to Closing Day",
    excerpt: "Buying your first home is one of the biggest decisions of your life. This step-by-step guide walks you through every stage of the process so you can move forward with confidence.",
    category: "Buying Tips",
    author: "Marcus Chen",
    authorImage: "/images/real-estate-agent-man-professional.jpg",
    date: "2024-05-22",
    readTime: "9 min read",
    image: "https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=800&q=80",
    featured: false,
  },
  {
    id: "bp-3",
    slug: "harborside-district-neighborhood-guide",
    title: "Living in Harborside District: A Local's Guide to the Best Spots, Schools & Streets",
    excerpt: "From the best brunch spots on the waterfront to the hidden pocket parks locals love, our Harborside guide covers everything you need to know before making the move.",
    category: "Local News",
    author: "Elena Vasquez",
    authorImage: "/images/real-estate-agent-woman-smiling.jpg",
    date: "2024-05-08",
    readTime: "7 min read",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
    featured: false,
  },
  {
    id: "bp-4",
    slug: "home-staging-tips-sell-faster",
    title: "10 Home Staging Tips That Help Homes Sell 30% Faster (and for More Money)",
    excerpt: "Professional staging can dramatically increase your sale price and cut days on market. Our top agents share the exact techniques they recommend to every seller before listing.",
    category: "Selling Tips",
    author: "Sarah Whitmore",
    authorImage: "/images/real-estate-agent-woman-professional.jpg",
    date: "2024-04-15",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&q=80",
    featured: false,
  },
  {
    id: "bp-5",
    slug: "interest-rates-impact-buying-power",
    title: "How Rising Interest Rates Are Reshaping Buying Power in 2024",
    excerpt: "With mortgage rates fluctuating between 6.5% and 7.2%, many buyers are recalibrating their budgets. We break down the real impact on monthly payments and what strategies are working right now.",
    category: "Market Trends",
    author: "Marcus Chen",
    authorImage: "/images/real-estate-agent-man-professional.jpg",
    date: "2024-03-28",
    readTime: "8 min read",
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&q=80",
    featured: true,
  },
  {
    id: "bp-6",
    slug: "maplewood-new-developments-2024",
    title: "New Developments Coming to Maplewood: What's Being Built and Where",
    excerpt: "Three major mixed-use developments are breaking ground in Maplewood this year, adding over 400 new residential units and reshaping the city's skyline. Here is what to expect.",
    category: "Local News",
    author: "Elena Vasquez",
    authorImage: "/images/real-estate-agent-woman-smiling.jpg",
    date: "2024-03-05",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80",
    featured: false,
  },
];
