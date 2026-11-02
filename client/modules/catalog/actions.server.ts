"use server";

import type {
  Product,
  Category,
  ProductListResponse,
  CatalogFilters,
  CatalogError,
} from "./types";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://127.0.0.1:4000";

const MOCK_PRODUCTS: Product[] = [
  {
    id: "1",
    name: "Pure Silk Summer Floral Dress",
    slug: "pure-silk-summer-floral-dress",
    description:
      "Graceful floral silk summer dress featuring effortless drape and timeless silhouettes.",
    price: 129.99,
    originalPrice: 169.99,
    image:
      "https://res.cloudinary.com/demo/image/upload/w_800,h_800,c_fill,q_auto,f_auto/dress.jpg",
    category: "apparel",
    inStock: true,
    stock: 45,
    rating: 4.8,
    reviewCount: 234,
    tags: ["dress", "silk", "floral", "summer"],
  },
  {
    id: "2",
    name: "Classic Tailored Oxford Shirt",
    slug: "classic-tailored-oxford-shirt",
    description:
      "Structured breathable cotton oxford shirt tailored for clean lines and all-day comfort.",
    price: 69.99,
    originalPrice: 89.99,
    image:
      "https://res.cloudinary.com/demo/image/upload/w_800,h_800,c_fill,q_auto,f_auto/shirt.jpg",
    category: "apparel",
    inStock: true,
    stock: 38,
    rating: 4.7,
    reviewCount: 164,
    tags: ["shirt", "cotton", "formal", "oxford"],
  },
  {
    id: "3",
    name: "Bespoke Navy Wool Suit",
    slug: "bespoke-navy-wool-suit",
    description:
      "Precision-tailored two-piece wool suit with pick-stitched lapels and natural horn buttons.",
    price: 389.99,
    originalPrice: 489.99,
    image:
      "https://res.cloudinary.com/demo/image/upload/w_800,h_800,c_fill,q_auto,f_auto/suit.jpg",
    category: "apparel",
    inStock: true,
    stock: 18,
    rating: 4.9,
    reviewCount: 112,
    tags: ["suit", "wool", "tailored", "luxury"],
  },
  {
    id: "4",
    name: "Blake-Stitched Leather Derby Shoes",
    slug: "blake-stitched-leather-derby-shoes",
    description:
      "Handcrafted calfskin leather dress shoes with durable Blake-stitched outsoles and memory foam insoles.",
    price: 179.99,
    originalPrice: 220.0,
    image:
      "https://res.cloudinary.com/demo/image/upload/w_800,h_800,c_fill,q_auto,f_auto/shoes.jpg",
    category: "footwear",
    inStock: true,
    stock: 29,
    rating: 4.8,
    reviewCount: 198,
    tags: ["footwear", "leather", "shoes", "formal"],
  },
  {
    id: "5",
    name: "Minimalist Court Street Sneakers",
    slug: "minimalist-court-street-sneakers",
    description:
      "Clean monochromatic low-top sneakers in Italian full-grain leather with cushioned vulcanized soles.",
    price: 139.99,
    originalPrice: 160.0,
    image:
      "https://res.cloudinary.com/demo/image/upload/w_800,h_800,c_fill,q_auto,f_auto/sneakers.jpg",
    category: "footwear",
    inStock: true,
    stock: 64,
    rating: 4.7,
    reviewCount: 310,
    tags: ["sneakers", "streetwear", "casual", "footwear"],
  },
  {
    id: "6",
    name: "Selvedge Raw Denim Jeans",
    slug: "selvedge-raw-denim-jeans",
    description:
      "Heavyweight 14oz Japanese selvedge denim in a straight-tapered cut that molds to your silhouette.",
    price: 119.99,
    image:
      "https://res.cloudinary.com/demo/image/upload/w_800,h_800,c_fill,q_auto,f_auto/jeans.jpg",
    category: "apparel",
    inStock: true,
    stock: 52,
    rating: 4.6,
    reviewCount: 145,
    tags: ["denim", "selvedge", "jeans", "casual"],
  },
  {
    id: "7",
    name: "Artisan Leather Commuter Backpack",
    slug: "artisan-leather-commuter-backpack",
    description:
      "Full-grain water-resistant leather backpack with padded 16-inch laptop compartment and brass hardware.",
    price: 189.99,
    originalPrice: 249.99,
    image:
      "https://res.cloudinary.com/demo/image/upload/w_800,h_800,c_fill,q_auto,f_auto/backpack.jpg",
    category: "accessories",
    inStock: true,
    stock: 24,
    rating: 4.9,
    reviewCount: 220,
    tags: ["backpack", "leather", "commuter", "accessories"],
  },
  {
    id: "8",
    name: "Acetate Polarized Aviator Sunglasses",
    slug: "acetate-polarized-aviator-sunglasses",
    description:
      "Handmade Italian acetate frames paired with scratch-resistant UV400 polarized mineral glass lenses.",
    price: 89.99,
    originalPrice: 119.99,
    image:
      "https://res.cloudinary.com/demo/image/upload/w_800,h_800,c_fill,q_auto,f_auto/sunglasses.jpg",
    category: "accessories",
    inStock: true,
    stock: 85,
    rating: 4.7,
    reviewCount: 175,
    tags: ["sunglasses", "eyewear", "accessories", "summer"],
  },
  {
    id: "9",
    name: "Classic Round Optical Frames",
    slug: "classic-round-optical-frames",
    description:
      "Ultra-lightweight titanium and acetate eyeglasses crafted for everyday comfort and subtle style.",
    price: 79.99,
    image:
      "https://res.cloudinary.com/demo/image/upload/w_800,h_800,c_fill,q_auto,f_auto/glasses.jpg",
    category: "accessories",
    inStock: true,
    stock: 42,
    rating: 4.5,
    reviewCount: 92,
    tags: ["eyewear", "glasses", "accessories"],
  },
  {
    id: "10",
    name: "Luxe Wool Trench Coat",
    slug: "luxe-wool-trench-coat",
    description:
      "Double-breasted trench coat tailored in water-repellent virgin wool blend with storm flaps.",
    price: 299.99,
    originalPrice: 350.0,
    image:
      "https://res.cloudinary.com/demo/image/upload/w_800,h_800,c_fill,q_auto,f_auto/docs/model.jpg",
    category: "apparel",
    inStock: true,
    stock: 19,
    rating: 4.9,
    reviewCount: 188,
    tags: ["coat", "trench", "outerwear", "winter"],
  },
  {
    id: "11",
    name: "Studio Hi-Fi Wireless Headphones",
    slug: "studio-hi-fi-wireless-headphones",
    description:
      "Audiophile-grade 40mm beryllium drivers, hybrid active noise cancellation, and 35-hour battery.",
    price: 249.99,
    originalPrice: 299.99,
    image:
      "https://res.cloudinary.com/demo/image/upload/w_800,h_800,c_fill,q_auto,f_auto/docs/headphones.jpg",
    category: "accessories",
    inStock: true,
    stock: 31,
    rating: 4.8,
    reviewCount: 420,
    tags: ["audio", "headphones", "wireless", "tech"],
  },
  {
    id: "12",
    name: "Vintage Athletic Leather Runners",
    slug: "vintage-athletic-leather-runners",
    description:
      "Heritage runner silhouette constructed with supple suede overlays and EVA shock-absorbing midsoles.",
    price: 149.99,
    image:
      "https://res.cloudinary.com/demo/image/upload/w_800,h_800,c_fill,q_auto,f_auto/docs/shoes.jpg",
    category: "footwear",
    inStock: true,
    stock: 48,
    rating: 4.6,
    reviewCount: 130,
    tags: ["footwear", "runners", "sneakers", "athletic"],
  },
];

const MOCK_CATEGORIES: Category[] = [
  {
    id: "1",
    name: "Apparel",
    slug: "apparel",
    description: "Curated dresses, shirts, suits, and everyday denim",
    productCount: 5,
  },
  {
    id: "2",
    name: "Footwear",
    slug: "footwear",
    description: "Handcrafted dress shoes, street sneakers, and runners",
    productCount: 3,
  },
  {
    id: "3",
    name: "Accessories",
    slug: "accessories",
    description: "Artisan leather bags, sunglasses, opticals, and headphones",
    productCount: 4,
  },
];

async function fetchFromAPI<T>(
  endpoint: string,
  options?: RequestInit
): Promise<{ data?: T; error?: CatalogError; usedMockData?: boolean }> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        "Content-Type": "application/json",
        ...options?.headers,
      },
      signal: controller.signal,
      ...options,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      const error = await response.json();
      return {
        error: {
          code: error.code || "UNKNOWN_ERROR",
          message: error.message || "An error occurred while fetching data",
        },
      };
    }

    const data = await response.json();
    return { data };
  } catch (error) {
    console.error(`[v0] API Error at ${endpoint}:`, error);
    return {
      error: {
        code: "NETWORK_ERROR",
        message:
          "Using mock data - Backend server is not available. Connect a backend to see real data.",
      },
      usedMockData: true,
    };
  }
}

// Get all products with filters and pagination
export async function getProducts(filters: CatalogFilters = {}) {
  const { category, search, sortBy = "newest", page = 1, limit = 12 } = filters;
  const minPrice =
    typeof filters.minPrice === "number" ? filters.minPrice : undefined;
  const maxPrice =
    typeof filters.maxPrice === "number" ? filters.maxPrice : undefined;

  const apiResult = await fetchFromAPI<ProductListResponse>(
    "/catalog/products"
  );

  let products = apiResult.data?.products || MOCK_PRODUCTS;

  // Apply client-side filtering if using mock data or for consistency
  if (category) {
    // Special virtual categories used by the UI:
    // - "new": show newest products (no category filter)
    // - "sale": show products with an originalPrice greater than the current price
    if (category === "sale") {
      products = products.filter(
        (p) => p.originalPrice && p.originalPrice > p.price
      );
    } else if (category === "new") {
      // keep all products and rely on sortBy to show newest first
    } else {
      products = products.filter((p) => p.category === category);
    }
  }

  if (search) {
    const query = search.toLowerCase();
    products = products.filter(
      (p) =>
        p.name.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query) ||
        p.tags?.some((tag) => tag.toLowerCase().includes(query))
    );
  }

  // Only apply price filtering when the client explicitly provided bounds.
  if (typeof minPrice === "number" || typeof maxPrice === "number") {
    const low =
      typeof minPrice === "number" ? minPrice : Number.NEGATIVE_INFINITY;
    const high =
      typeof maxPrice === "number" ? maxPrice : Number.POSITIVE_INFINITY;
    products = products.filter((p) => p.price >= low && p.price <= high);
  }

  // Sort
  switch (sortBy) {
    case "price-low":
      products.sort((a, b) => a.price - b.price);
      break;
    case "price-high":
      products.sort((a, b) => b.price - a.price);
      break;
    case "popular":
      products.sort((a, b) => (b.rating || 0) - (a.rating || 0));
      break;
    case "newest":
    default:
      products.reverse();
  }

  // Paginate
  const total = products.length;
  const startIndex = (page - 1) * limit;
  const paginatedProducts = products.slice(startIndex, startIndex + limit);

  return {
    data: {
      products: paginatedProducts,
      total,
      page,
      limit,
      hasMore: startIndex + limit < total,
    },
    usedMockData: apiResult.usedMockData,
  };
}

// Get single product by slug
export async function getProductBySlug(slug: string) {
  if (!slug || typeof slug !== "string") {
    return {
      error: {
        code: "INVALID_INPUT",
        message: "Product slug is required",
      },
    };
  }

  const apiResult = await fetchFromAPI<Product>(`/catalog/products/${slug}`);

  if (apiResult.usedMockData) {
    const mockProduct = MOCK_PRODUCTS.find((p) => p.slug === slug);
    return {
      data: mockProduct,
      usedMockData: true,
    };
  }

  return apiResult;
}

// Get single product by ID
export async function getProductById(id: string) {
  if (!id || typeof id !== "string") {
    return {
      error: {
        code: "INVALID_INPUT",
        message: "Product ID is required",
      },
    };
  }

  const apiResult = await fetchFromAPI<Product>(`/catalog/products/id/${id}`);

  if (apiResult.usedMockData) {
    const mockProduct = MOCK_PRODUCTS.find((p) => p.id === id);
    return {
      data: mockProduct,
      usedMockData: true,
    };
  }

  return apiResult;
}

// Search products
export async function searchProducts(query: string, limit = 10) {
  if (!query || typeof query !== "string") {
    return {
      error: {
        code: "INVALID_INPUT",
        message: "Search query is required",
      },
    };
  }

  const q = query.toLowerCase();
  const results = MOCK_PRODUCTS.filter(
    (p) =>
      p.name.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.tags?.some((tag) => tag.toLowerCase().includes(q))
  ).slice(0, limit);

  return {
    data: {
      products: results,
      total: results.length,
      page: 1,
      limit,
      hasMore: false,
    },
  };
}

// Get all categories
export async function getCategories() {
  // Try legacy compat route first, then API route, then fallback to mock data.
  const tryEndpoints = ["/catalog/categories", "/api/catalog/categories"];
  for (const ep of tryEndpoints) {
    const res = await fetchFromAPI<any[]>(ep);
    if (res.data) {
      const categories = res.data.map((c: any) => ({
        id: c.id,
        name: c.name,
        slug:
          c.slug ??
          (typeof c.name === "string"
            ? c.name.toLowerCase().replace(/\s+/g, "-")
            : c.id),
        description: c.description,
        image: c.image,
        productCount: c.productCount ?? undefined,
      }));
      return { data: categories };
    }
  }

  return {
    data: MOCK_CATEGORIES,
    usedMockData: true,
  };
}

// Get single category by slug
export async function getCategoryBySlug(slug: string) {
  if (!slug || typeof slug !== "string") {
    return {
      error: {
        code: "INVALID_INPUT",
        message: "Category slug is required",
      },
    };
  }

  const category = MOCK_CATEGORIES.find((c) => c.slug === slug);
  return {
    data: category,
  };
}

// Validate product stock
export async function validateProductStock(
  productId: string,
  quantity: number
) {
  if (!productId || !quantity || quantity < 1) {
    return {
      error: {
        code: "INVALID_INPUT",
        message: "Product ID and valid quantity are required",
      },
    };
  }

  const product = MOCK_PRODUCTS.find((p) => p.id === productId);
  const available = product ? (product.stock || 0) >= quantity : false;

  return {
    data: {
      available,
      stock: product?.stock || 0,
    },
  };
}
