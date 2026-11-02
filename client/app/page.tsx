import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, ShieldCheck, Truck } from "lucide-react";

const FEATURED_PRODUCTS = [
  {
    id: "1",
    name: "Pure Silk Summer Floral Dress",
    slug: "pure-silk-summer-floral-dress",
    description: "Graceful floral silk summer dress featuring effortless drape and timeless silhouettes.",
    price: 129.99,
    originalPrice: 169.99,
    image: "https://res.cloudinary.com/demo/image/upload/w_800,h_800,c_fill,q_auto,f_auto/dress.jpg",
    category: "Apparel",
  },
  {
    id: "2",
    name: "Classic Tailored Oxford Shirt",
    slug: "classic-tailored-oxford-shirt",
    description: "Structured breathable cotton oxford shirt tailored for clean lines and all-day comfort.",
    price: 69.99,
    originalPrice: 89.99,
    image: "https://res.cloudinary.com/demo/image/upload/w_800,h_800,c_fill,q_auto,f_auto/shirt.jpg",
    category: "Apparel",
  },
  {
    id: "3",
    name: "Bespoke Navy Wool Suit",
    slug: "bespoke-navy-wool-suit",
    description: "Precision-tailored two-piece wool suit with pick-stitched lapels and natural horn buttons.",
    price: 389.99,
    originalPrice: 489.99,
    image: "https://res.cloudinary.com/demo/image/upload/w_800,h_800,c_fill,q_auto,f_auto/suit.jpg",
    category: "Apparel",
  },
  {
    id: "4",
    name: "Blake-Stitched Leather Derby Shoes",
    slug: "blake-stitched-leather-derby-shoes",
    description: "Handcrafted calfskin leather dress shoes with durable Blake-stitched outsoles.",
    price: 179.99,
    originalPrice: 220.0,
    image: "https://res.cloudinary.com/demo/image/upload/w_800,h_800,c_fill,q_auto,f_auto/shoes.jpg",
    category: "Footwear",
  },
  {
    id: "5",
    name: "Minimalist Court Street Sneakers",
    slug: "minimalist-court-street-sneakers",
    description: "Clean monochromatic low-top sneakers in Italian full-grain leather with cushioned soles.",
    price: 139.99,
    originalPrice: 160.0,
    image: "https://res.cloudinary.com/demo/image/upload/w_800,h_800,c_fill,q_auto,f_auto/sneakers.jpg",
    category: "Footwear",
  },
  {
    id: "6",
    name: "Artisan Leather Commuter Backpack",
    slug: "artisan-leather-commuter-backpack",
    description: "Full-grain water-resistant leather backpack with padded 16-inch laptop compartment.",
    price: 189.99,
    originalPrice: 249.99,
    image: "https://res.cloudinary.com/demo/image/upload/w_800,h_800,c_fill,q_auto,f_auto/backpack.jpg",
    category: "Accessories",
  },
];

export default function Home() {
  return (
    <div className="flex-1">
      {/* Hero Section */}
      <section className="py-20 md:py-32 bg-gradient-to-br from-background to-secondary">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-balance">
              Discover Your Next Favorite Style
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground text-balance">
              Browse our curated collection of premium apparel, footwear, and accessories. Fast shipping,
              secure checkout, and exceptional craftsmanship.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Link href="/collection">
                <Button size="lg" className="w-full sm:w-auto">
                  Explore Collection
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
              <Link href="/collection?category=new">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto bg-transparent"
                >
                  Browse New Arrivals
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Preview */}
      <section id="featured" className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-3">
              Featured Products
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Explore our handpicked selection of trending fashion and accessories loved by our
              customers
            </p>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURED_PRODUCTS.map((prod) => (
              <Link
                key={prod.id}
                href={`/catalog`}
                className="group rounded-lg border border-border bg-card overflow-hidden hover:shadow-lg transition-all flex flex-col"
              >
                {/* Product Image */}
                <div className="relative w-full aspect-square bg-muted overflow-hidden">
                  <Image
                    src={prod.image}
                    alt={prod.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  {prod.originalPrice && prod.originalPrice > prod.price && (
                    <span className="absolute top-3 right-3 bg-destructive text-destructive-foreground px-2.5 py-1 rounded-md text-xs font-semibold">
                      Sale
                    </span>
                  )}
                  <span className="absolute top-3 left-3 bg-background/80 backdrop-blur-sm text-foreground px-2.5 py-1 rounded-md text-xs font-medium">
                    {prod.category}
                  </span>
                </div>
                {/* Product Info */}
                <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
                      {prod.name}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                      {prod.description}
                    </p>
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t border-border/50">
                    <div className="flex items-baseline gap-2">
                      <span className="font-bold text-lg">
                        ${prod.price.toFixed(2)}
                      </span>
                      {prod.originalPrice && (
                        <span className="text-sm text-muted-foreground line-through">
                          ${prod.originalPrice.toFixed(2)}
                        </span>
                      )}
                    </div>
                    <Button size="sm" variant="default">
                      View Product
                    </Button>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/collection">
              <Button size="lg" variant="outline">
                View Full Collection
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-16 md:py-24 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="space-y-2 flex flex-col items-center">
              <Truck className="w-8 h-8 text-primary mb-2" />
              <h3 className="font-semibold text-lg">Free Express Shipping</h3>
              <p className="text-sm text-muted-foreground">
                On orders over $50. Fast, insured and carbon-neutral delivery
              </p>
            </div>
            <div className="space-y-2 flex flex-col items-center">
              <ShieldCheck className="w-8 h-8 text-primary mb-2" />
              <h3 className="font-semibold text-lg">Secure Checkout</h3>
              <p className="text-sm text-muted-foreground">
                Your payment and personal details are encrypted and protected
              </p>
            </div>
            <div className="space-y-2 flex flex-col items-center">
              <Sparkles className="w-8 h-8 text-primary mb-2" />
              <h3 className="font-semibold text-lg">Artisan Craftsmanship</h3>
              <p className="text-sm text-muted-foreground">
                Premium materials, ethical sourcing, and 30-day hassle-free returns
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
