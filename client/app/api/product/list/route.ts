import { NextResponse } from "next/server";

const CLOUDINARY_PRODUCTS = [
  {
    _id: "velora_p1",
    name: "Pure Silk Summer Floral Dress",
    description: "Graceful floral silk summer dress featuring effortless drape and timeless silhouettes.",
    price: 129.99,
    image: [
      "https://res.cloudinary.com/demo/image/upload/w_800,h_800,c_fill,q_auto,f_auto/dress.jpg",
    ],
    category: "Women",
    subCategory: "Topwear",
    sizes: ["S", "M", "L", "XL"],
    bestseller: true,
    date: Date.now() - 100000,
  },
  {
    _id: "velora_p2",
    name: "Classic Tailored Oxford Shirt",
    description: "Structured breathable cotton oxford shirt tailored for clean lines and all-day comfort.",
    price: 69.99,
    image: [
      "https://res.cloudinary.com/demo/image/upload/w_800,h_800,c_fill,q_auto,f_auto/shirt.jpg",
    ],
    category: "Men",
    subCategory: "Topwear",
    sizes: ["M", "L", "XL", "XXL"],
    bestseller: true,
    date: Date.now() - 200000,
  },
  {
    _id: "velora_p3",
    name: "Bespoke Navy Wool Suit",
    description: "Precision-tailored two-piece wool suit with pick-stitched lapels and natural horn buttons.",
    price: 389.99,
    image: [
      "https://res.cloudinary.com/demo/image/upload/w_800,h_800,c_fill,q_auto,f_auto/suit.jpg",
    ],
    category: "Men",
    subCategory: "Winterwear",
    sizes: ["38R", "40R", "42R", "44R"],
    bestseller: true,
    date: Date.now() - 300000,
  },
  {
    _id: "velora_p4",
    name: "Blake-Stitched Leather Derby Shoes",
    description: "Handcrafted calfskin leather dress shoes with durable Blake-stitched outsoles and memory foam insoles.",
    price: 179.99,
    image: [
      "https://res.cloudinary.com/demo/image/upload/w_800,h_800,c_fill,q_auto,f_auto/shoes.jpg",
    ],
    category: "Men",
    subCategory: "Bottomwear",
    sizes: ["8", "9", "10", "11"],
    bestseller: false,
    date: Date.now() - 400000,
  },
  {
    _id: "velora_p5",
    name: "Minimalist Court Street Sneakers",
    description: "Clean monochromatic low-top sneakers in Italian full-grain leather with cushioned vulcanized soles.",
    price: 139.99,
    image: [
      "https://res.cloudinary.com/demo/image/upload/w_800,h_800,c_fill,q_auto,f_auto/sneakers.jpg",
    ],
    category: "Men",
    subCategory: "Bottomwear",
    sizes: ["7", "8", "9", "10", "11"],
    bestseller: true,
    date: Date.now() - 500000,
  },
  {
    _id: "velora_p6",
    name: "Artisan Leather Commuter Backpack",
    description: "Full-grain water-resistant leather backpack featuring a padded 16-inch laptop compartment.",
    price: 189.99,
    image: [
      "https://res.cloudinary.com/demo/image/upload/w_800,h_800,c_fill,q_auto,f_auto/backpack.jpg",
    ],
    category: "Kids",
    subCategory: "Winterwear",
    sizes: ["Standard"],
    bestseller: true,
    date: Date.now() - 600000,
  },
  {
    _id: "velora_p7",
    name: "Selvedge Indigo Raw Denim Jeans",
    description: "Japanese 14oz shuttle-loomed selvedge denim designed for a custom fade and lifetime wear.",
    price: 149.99,
    image: [
      "https://res.cloudinary.com/demo/image/upload/w_800,h_800,c_fill,q_auto,f_auto/pants.jpg",
    ],
    category: "Men",
    subCategory: "Bottomwear",
    sizes: ["30", "32", "34", "36"],
    bestseller: false,
    date: Date.now() - 700000,
  },
  {
    _id: "velora_p8",
    name: "Cashmere Ribbed Knit Cardigan",
    description: "Plush Mongolian cashmere knit cardigan offering effortless warmth and casual sophistication.",
    price: 219.99,
    image: [
      "https://res.cloudinary.com/demo/image/upload/w_800,h_800,c_fill,q_auto,f_auto/sweater.jpg",
    ],
    category: "Women",
    subCategory: "Winterwear",
    sizes: ["XS", "S", "M", "L"],
    bestseller: true,
    date: Date.now() - 800000,
  },
  {
    _id: "velora_p9",
    name: "Vintage Aviator Hand-Polished Sunglasses",
    description: "Titanium aviator sunglasses with polarized UV400 Carl Zeiss lenses and custom acetate temple tips.",
    price: 119.99,
    image: [
      "https://res.cloudinary.com/demo/image/upload/w_800,h_800,c_fill,q_auto,f_auto/sunglasses.jpg",
    ],
    category: "Men",
    subCategory: "Topwear",
    sizes: ["One Size"],
    bestseller: false,
    date: Date.now() - 900000,
  },
  {
    _id: "velora_p10",
    name: "Waterproof Lightweight Trail Jacket",
    description: "Three-layer breathable Gore-Tex shell with sealed taped seams and adjustable storm hood.",
    price: 199.99,
    image: [
      "https://res.cloudinary.com/demo/image/upload/w_800,h_800,c_fill,q_auto,f_auto/jacket.jpg",
    ],
    category: "Women",
    subCategory: "Winterwear",
    sizes: ["S", "M", "L", "XL"],
    bestseller: true,
    date: Date.now() - 1000000,
  },
  {
    _id: "velora_p11",
    name: "Pima Cotton Crewneck Essential Tee",
    description: "Heavyweight Peruvian long-staple pima cotton tee pre-washed for zero shrinkage and ultra-soft feel.",
    price: 34.99,
    image: [
      "https://res.cloudinary.com/demo/image/upload/w_800,h_800,c_fill,q_auto,f_auto/tshirt.jpg",
    ],
    category: "Men",
    subCategory: "Topwear",
    sizes: ["S", "M", "L", "XL", "XXL"],
    bestseller: true,
    date: Date.now() - 1100000,
  },
  {
    _id: "velora_p12",
    name: "Studio Activewear High-Rise Leggings",
    description: "Four-way stretch sweat-wicking compression leggings featuring hidden waistband drop-in pockets.",
    price: 79.99,
    image: [
      "https://res.cloudinary.com/demo/image/upload/w_800,h_800,c_fill,q_auto,f_auto/leggings.jpg",
    ],
    category: "Women",
    subCategory: "Bottomwear",
    sizes: ["XS", "S", "M", "L"],
    bestseller: false,
    date: Date.now() - 1200000,
  },
];

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, token",
};

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: CORS_HEADERS,
  });
}

export async function GET() {
  return NextResponse.json(
    {
      success: true,
      products: CLOUDINARY_PRODUCTS,
    },
    {
      status: 200,
      headers: CORS_HEADERS,
    }
  );
}

export async function POST() {
  return NextResponse.json(
    {
      success: true,
      products: CLOUDINARY_PRODUCTS,
    },
    {
      status: 200,
      headers: CORS_HEADERS,
    }
  );
}
