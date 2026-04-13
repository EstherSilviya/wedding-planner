import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDY1QbECTnHJ1ip2kAEyyTm9M_ZTX0z2kU",
  authDomain: "wedding-planner-app-de568.firebaseapp.com",
  projectId: "wedding-planner-app-de568",
  storageBucket: "wedding-planner-app-de568.appspot.com",
  messagingSenderId: "678671369473",
  appId: "1:678671369473:web:test"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// ✅ CLEAN DATA (FIXED FEATURES TEXT)
const services = [

  // 💄 MAKEUP (5)
  {
    name: "Makeup Artist Vijay",
    category: "makeup",
    price: 30000,
    description: "Professional bridal beauty services",
    features: [
      "Bridal makeup",
      "Hair styling",
      "Trial session included",
      "On-demand touch-up"
    ],
    website: "http://www.bridalmakeupartistinchennai.com/",
    packages: ["classic", "royal", "grand"],
    image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9"
  },
  {
    name: "Elite Bridal Studio",
    category: "makeup",
    price: 80000,
    description: "Luxury bridal makeover experience",
    features: [
      "Airbrush HD makeup",
      "Celebrity-style look",
      "Complete bridal package",
      "Premium products"
    ],
    website: "https://elitebridal.com",
    packages: ["royal", "grand"],
    image: "https://images.unsplash.com/photo-1519741497674-611481863552"
  },
  {
    name: "Glow Bridal Makeup",
    category: "makeup",
    price: 45000,
    description: "Elegant and natural bridal looks",
    features: [
      "HD makeup finish",
      "Hair styling included",
      "Trial session available",
      "Skin prep care"
    ],
    website: "https://glowmakeup.in",
    packages: ["classic", "royal"],
    image: "https://images.unsplash.com/photo-1487412912498-0447578fcca8"
  },
  {
    name: "Chennai Makeup Studio",
    category: "makeup",
    price: 25000,
    description: "Affordable bridal makeup solutions",
    features: [
      "Basic bridal makeup",
      "Hair styling",
      "Quick touch-up",
      "Budget-friendly package"
    ],
    website: "https://chennaimakeup.com",
    packages: ["classic"],
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330"
  },
  {
    name: "Royal Bride Studio",
    category: "makeup",
    price: 100000,
    description: "Premium celebrity bridal experience",
    features: [
      "Luxury bridal makeover",
      "Airbrush technology",
      "Full styling package",
      "Personal stylist"
    ],
    website: "https://royalbride.com",
    packages: ["royal", "grand"],
    image: "https://images.unsplash.com/photo-1526047932273-341f2a7631f9"
  },

  // 🏨 HOTEL (5)
{
  name: "Taj Coromandel",
  category: "hotel",
  price: 500000,
  description: "Luxury 5-star wedding accommodation",
  features: [
    "Bridal suite",
    "Premium guest rooms",
    "Concierge service",
    "Banquet halls"
  ],
  website: "https://www.tajhotels.com/",
  packages: ["royal", "grand"],
  image: "https://images.unsplash.com/photo-1566073771259-6a8506099945"
},
{
  name: "ITC Grand Chola",
  category: "hotel",
  price: 600000,
  description: "Grand luxury wedding venue",
  features: [
    "Luxury suites",
    "Fine dining",
    "Spa services",
    "Large event halls"
  ],
  website: "https://itchotels.com",
  packages: ["royal", "grand"],
  image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa"
},
{
  name: "Leela Palace Chennai",
  category: "hotel",
  price: 700000,
  description: "Sea-facing luxury wedding venue",
  features: [
    "Ocean view rooms",
    "Luxury suites",
    "Wedding halls",
    "Premium service"
  ],
  website: "https://www.theleela.com/",
  packages: ["grand"],
  image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb"
},
{
  name: "Radisson Blu Chennai",
  category: "hotel",
  price: 350000,
  description: "Modern hotel for wedding stays",
  features: [
    "Comfortable rooms",
    "Conference halls",
    "Dining",
    "Parking"
  ],
  website: "https://www.radissonhotels.com/",
  packages: ["classic", "royal"],
  image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267"
},
{
  name: "Budget Inn",
  category: "hotel",
  price: 150000,
  description: "Affordable stay for guests",
  features: [
    "Clean rooms",
    "WiFi",
    "Parking",
    "24/7 service"
  ],
  website: "https://budgetinn.com",
  packages: ["classic"],
  image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267"
},

// ✈️ TRAVEL (5)
{
  name: "Chennai Travel Planners",
  category: "travel",
  price: 100000,
  description: "Complete guest travel management",
  features: [
    "Airport pickup",
    "Guest transport",
    "Route planning",
    "Coordination"
  ],
  website: "https://chennaitravels.com",
  packages: ["classic", "royal", "grand"],
  image: "https://images.unsplash.com/photo-1502920917128-1aa500764ce7"
},
{
  name: "Elite Travels",
  category: "travel",
  price: 200000,
  description: "Luxury transport services",
  features: [
    "Luxury cars",
    "Chauffeur service",
    "Guest coordination",
    "Premium vehicles"
  ],
  website: "https://elitetravels.com",
  packages: ["royal", "grand"],
  image: "https://images.unsplash.com/photo-1473625247510-8ceb1760943f"
},
{
  name: "Royal Wedding Travels",
  category: "travel",
  price: 180000,
  description: "Exclusive wedding transport",
  features: [
    "Bridal car",
    "Guest buses",
    "Driver support",
    "On-time service"
  ],
  website: "https://royaltravels.com",
  packages: ["royal"],
  image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70"
},
{
  name: "City Ride Services",
  category: "travel",
  price: 90000,
  description: "Affordable transport solutions",
  features: [
    "Mini buses",
    "Car rentals",
    "Flexible timing",
    "Local travel"
  ],
  website: "https://cityride.com",
  packages: ["classic"],
  image: "https://images.unsplash.com/photo-1502877338535-766e1452684a"
},
{
  name: "Premium Fleet",
  category: "travel",
  price: 250000,
  description: "High-end luxury fleet services",
  features: [
    "Luxury fleet",
    "VIP service",
    "Full coordination",
    "Premium drivers"
  ],
  website: "https://premiumfleet.com",
  packages: ["grand"],
  image: "https://images.unsplash.com/photo-1494976388531-d1058494cdd8"
},

// 💌 INVITATION (5)
{
  name: "Elegant Invitations",
  category: "invitation",
  price: 20000,
  description: "Custom wedding invitations",
  features: [
    "Custom design",
    "Printing",
    "Digital invites",
    "RSVP support"
  ],
  website: "https://elegantinvites.com",
  packages: ["classic", "royal", "grand"],
  image: "https://images.unsplash.com/photo-1520854221256-17451cc331bf"
},
{
  name: "Royal Cards",
  category: "invitation",
  price: 50000,
  description: "Luxury invitation cards",
  features: [
    "Premium cards",
    "Designer layouts",
    "Custom prints",
    "Gift box invites"
  ],
  website: "https://royalcards.com",
  packages: ["royal", "grand"],
  image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622"
},
{
  name: "Digital Invite Studio",
  category: "invitation",
  price: 15000,
  description: "Modern digital invitations",
  features: [
    "Animated invites",
    "WhatsApp invites",
    "RSVP tracking",
    "Quick delivery"
  ],
  website: "https://digitalinvites.com",
  packages: ["classic"],
  image: "https://images.unsplash.com/photo-1492724441997-5dc865305da7"
},
{
  name: "Creative Cards",
  category: "invitation",
  price: 30000,
  description: "Creative wedding card designs",
  features: [
    "Unique designs",
    "Print + digital",
    "Custom themes",
    "Fast delivery"
  ],
  website: "https://creativecards.com",
  packages: ["classic", "royal"],
  image: "https://images.unsplash.com/photo-1503602642458-232111445657"
},
{
  name: "Luxury Invite Co",
  category: "invitation",
  price: 80000,
  description: "High-end wedding invitations",
  features: [
    "Luxury boxes",
    "Premium prints",
    "Custom branding",
    "Exclusive designs"
  ],
  website: "https://luxuryinvites.com",
  packages: ["grand"],
  image: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486"
},

// 🎁 GIFTS (5)
{
  name: "Gift Studio",
  category: "gifts",
  price: 30000,
  description: "Custom wedding return gifts",
  features: [
    "Custom gifts",
    "Packaging",
    "Guest favors",
    "Bulk orders"
  ],
  website: "https://giftstudio.com",
  packages: ["classic", "royal", "grand"],
  image: "https://images.unsplash.com/photo-1512909006721-3d6018887383"
},
{
  name: "Premium Gifts Co",
  category: "gifts",
  price: 70000,
  description: "Luxury gifting solutions",
  features: [
    "Luxury items",
    "Custom branding",
    "Gift hampers",
    "Premium packaging"
  ],
  website: "https://premiumgifts.com",
  packages: ["royal", "grand"],
  image: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48"
},
{
  name: "Wedding Hampers",
  category: "gifts",
  price: 40000,
  description: "Beautiful wedding hampers",
  features: [
    "Customized hampers",
    "Decorative packaging",
    "Bulk delivery",
    "Theme-based gifts"
  ],
  website: "https://weddinghampers.com",
  packages: ["classic", "royal"],
  image: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da"
},
{
  name: "Return Gift Hub",
  category: "gifts",
  price: 25000,
  description: "Affordable guest gifts",
  features: [
    "Budget gifts",
    "Custom options",
    "Quick delivery",
    "Bulk supply"
  ],
  website: "https://returngifthub.com",
  packages: ["classic"],
  image: "https://images.unsplash.com/photo-1519681393784-d120267933ba"
},
{
  name: "Luxury Gift Box",
  category: "gifts",
  price: 90000,
  description: "Premium luxury gifting",
  features: [
    "Luxury boxes",
    "High-end products",
    "Custom branding",
    "Exclusive items"
  ],
  website: "https://luxurygiftbox.com",
  packages: ["grand"],
  image: "https://images.unsplash.com/photo-1607082349566-187342175e2f"
},

  // 📸 PHOTOGRAPHY (5)
  {
    name: "SS Digital Photography",
    category: "photography",
    price: 80000,
    description: "Capture every special moment",
    features: [
      "Full-day coverage",
      "Photography & videography",
      "Album design",
      "Basic editing"
    ],
    website: "https://www.candidweddingphotographerschennai.com/",
    packages: ["classic", "royal"],
    image: "https://images.unsplash.com/photo-1519741497674-611481863552"
  },
  {
    name: "Candid Red Studios",
    category: "photography",
    price: 150000,
    description: "Premium candid wedding shoots",
    features: [
      "Candid photography",
      "Cinematic video",
      "Pre-wedding shoot",
      "Online gallery"
    ],
    website: "https://www.candidred.com/",
    packages: ["royal", "grand"],
    image: "https://images.unsplash.com/photo-1529636798458-92182e662485"
  },
  {
    name: "Lens Queen Studio",
    category: "photography",
    price: 60000,
    description: "Affordable photography services",
    features: [
      "Event photography",
      "Photo editing",
      "Album printing",
      "Basic coverage"
    ],
    website: "https://lensqueen.com",
    packages: ["classic"],
    image: "https://images.unsplash.com/photo-1502920917128-1aa500764ce7"
  },
  {
    name: "Dream Capture",
    category: "photography",
    price: 120000,
    description: "Creative storytelling photography",
    features: [
      "Candid shots",
      "Video coverage",
      "Drone shots",
      "Creative edits"
    ],
    website: "https://dreamcapture.com",
    packages: ["royal"],
    image: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4"
  },
  {
    name: "Royal Frames",
    category: "photography",
    price: 200000,
    description: "Luxury cinematic experience",
    features: [
      "4K cinematic video",
      "Drone coverage",
      "Premium album",
      "Full team coverage"
    ],
    website: "https://royalframes.com",
    packages: ["grand"],
    image: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc"
  }

];

// ✅ UPLOAD FUNCTION
async function upload() {
  console.log("🔥 Upload started...");

  const snapshot = await getDocs(collection(db, "services"));
  const existing = snapshot.docs.map(doc => doc.data().name);

  for (let service of services) {
    if (existing.includes(service.name)) {
      console.log("⚠️ Skipped:", service.name);
      continue;
    }

    await addDoc(collection(db, "services"), service);
    console.log("✅ Uploaded:", service.name);
  }

  console.log("🔥 DONE!");
}

upload();