import { Injectable } from "@nestjs/common";
import { AppDataSource } from "../data-source";
import { Product } from "../entities/product.entity";
import { Category } from "../entities/category.entity";

@Injectable()
export class CatalogService {
  private get productRepo() {
    if (!AppDataSource) throw new Error("DataSource not initialized");
    return AppDataSource.getRepository(Product);
  }
  private get categoryRepo() {
    if (!AppDataSource) throw new Error("DataSource not initialized");
    return AppDataSource.getRepository(Category);
  }

  async listCategories() {
    return this.categoryRepo.find();
  }

  async getCategory(id: string) {
    return this.categoryRepo.findOneBy({ id });
  }

  async listProducts(opts: {
    categoryId?: string;
    search?: string;
    filters?: any;
  }) {
    // If using SQLite (fallback), perform simple find + in-memory filtering
    if (AppDataSource && AppDataSource.options.type === "sqlite") {
      let items = await this.productRepo.find({ where: { active: true } });
      const categories = await this.categoryRepo.find();
      const catMap = new Map(categories.map((c) => [c.id, c.slug])); // USE SLUG FOR LOGIC

      if (opts.categoryId)
        items = items.filter((i) => i.category_id === opts.categoryId);

      if (opts.search) {
        const q = opts.search.toLowerCase();
        items = items.filter(
          (i) =>
            (i.name && i.name.toLowerCase().includes(q)) ||
            (i.description && i.description.toLowerCase().includes(q)) ||
            (i.sku && i.sku.toLowerCase().includes(q)) ||
            JSON.stringify(i.attributes).toLowerCase().includes(q)
        );
      }
      if (opts.filters && Object.keys(opts.filters).length) {
        items = items.filter((i) => {
          for (const k of Object.keys(opts.filters)) {
            if (i.attributes == null) return false;
            const val = opts.filters[k];
            if (i.attributes[k] == null) return false;
            if (Array.isArray(val)) {
              if (!val.includes(i.attributes[k])) return false;
            } else {
              if (i.attributes[k] != val) return false;
            }
          }
          return true;
        });
      }
      return items.map((i) => ({
        ...i,
        category: catMap.get(i.category_id) || "uncategorized",
      }));
    }

    const qb = this.productRepo
      .createQueryBuilder("p")
      .leftJoin("product_categories", "c", "p.category_id = c.id")
      .select([
        "p.id as id",
        "p.name as name",
        "p.slug as slug",
        "p.description as description",
        "p.sku as sku",
        "p.price as price",
        'p.originalPrice as "originalPrice"',
        "p.image as image",
        "p.stock as stock",
        "p.rating as rating",
        'p.reviewCount as "reviewCount"',
        "p.tags as tags",
        "p.attributes as attributes",
        "c.slug as category",
        "p.active as active",
      ])
      .where("p.active = true");

    if (opts.categoryId)
      qb.andWhere("p.category_id = :cid", { cid: opts.categoryId });

    if (opts.search) {
      qb.andWhere(
        "(LOWER(p.name) LIKE :q OR LOWER(p.description) LIKE :q OR LOWER(p.sku) LIKE :q)",
        {
          q: `%${opts.search.toLowerCase()}%`,
        }
      );
    }

    if (opts.filters && Object.keys(opts.filters).length) {
      qb.andWhere("p.attributes @> :f", { f: JSON.stringify(opts.filters) });
    }

    const raw = await qb.getRawMany();
    // Transform numeric strings back to numbers for price etc if needed, though most drivers handle it.
    return raw.map((r) => ({
      ...r,
      price: Number(r.price),
      originalPrice: r.originalPrice ? Number(r.originalPrice) : null,
      tags: typeof r.tags === "string" ? JSON.parse(r.tags) : r.tags,
      attributes:
        typeof r.attributes === "string"
          ? JSON.parse(r.attributes)
          : r.attributes,
    }));
  }

  async seedIfEmpty() {
    const cats = await this.categoryRepo.count();
    if (cats === 0) {
      const apparel = this.categoryRepo.create({
        name: "Apparel",
        slug: "apparel",
        attribute_schema: {
          size: ["XS", "S", "M", "L", "XL"],
          gender: ["Men", "Women", "Unisex"],
        },
      });
      const footwear = this.categoryRepo.create({
        name: "Footwear",
        slug: "footwear",
        attribute_schema: {
          size: ["38", "39", "40", "41", "42", "43", "44"],
          type: ["Dress", "Sneakers", "Runners"],
        },
      });
      const accessories = this.categoryRepo.create({
        name: "Accessories",
        slug: "accessories",
        attribute_schema: {
          category: ["Bags", "Eyewear", "Audio"],
        },
      });
      await this.categoryRepo.save([apparel, footwear, accessories]);
    }
    const prodCount = await this.productRepo.count();
    if (prodCount === 0) {
      const apparelCat = await this.categoryRepo.findOneBy({ slug: "apparel" });
      const footwearCat = await this.categoryRepo.findOneBy({ slug: "footwear" });
      const accessoriesCat = await this.categoryRepo.findOneBy({ slug: "accessories" });

      const products = [
        this.productRepo.create({
          name: "Pure Silk Summer Floral Dress",
          slug: "pure-silk-summer-floral-dress",
          description: "Graceful floral silk summer dress featuring effortless drape and timeless silhouettes.",
          sku: "DRS-001",
          category_id: apparelCat.id,
          price: 129.99,
          originalPrice: 169.99,
          stock: 45,
          image: "https://res.cloudinary.com/demo/image/upload/w_800,h_800,c_fill,q_auto,f_auto/dress.jpg",
          rating: 4.8,
          reviewCount: 234,
          tags: ["dress", "silk", "floral", "summer"],
          attributes: { size: "M", gender: "Women" },
        }),
        this.productRepo.create({
          name: "Classic Tailored Oxford Shirt",
          slug: "classic-tailored-oxford-shirt",
          description: "Structured breathable cotton oxford shirt tailored for clean lines and all-day comfort.",
          sku: "SHT-001",
          category_id: apparelCat.id,
          price: 69.99,
          originalPrice: 89.99,
          stock: 38,
          image: "https://res.cloudinary.com/demo/image/upload/w_800,h_800,c_fill,q_auto,f_auto/shirt.jpg",
          rating: 4.7,
          reviewCount: 164,
          tags: ["shirt", "cotton", "formal", "oxford"],
          attributes: { size: "L", gender: "Men" },
        }),
        this.productRepo.create({
          name: "Bespoke Navy Wool Suit",
          slug: "bespoke-navy-wool-suit",
          description: "Precision-tailored two-piece wool suit with pick-stitched lapels and natural horn buttons.",
          sku: "SUT-001",
          category_id: apparelCat.id,
          price: 389.99,
          originalPrice: 489.99,
          stock: 18,
          image: "https://res.cloudinary.com/demo/image/upload/w_800,h_800,c_fill,q_auto,f_auto/suit.jpg",
          rating: 4.9,
          reviewCount: 112,
          tags: ["suit", "wool", "tailored", "luxury"],
          attributes: { size: "XL", gender: "Men" },
        }),
        this.productRepo.create({
          name: "Blake-Stitched Leather Derby Shoes",
          slug: "blake-stitched-leather-derby-shoes",
          description: "Handcrafted calfskin leather dress shoes with durable Blake-stitched outsoles.",
          sku: "SHO-001",
          category_id: footwearCat.id,
          price: 179.99,
          originalPrice: 220.0,
          stock: 29,
          image: "https://res.cloudinary.com/demo/image/upload/w_800,h_800,c_fill,q_auto,f_auto/shoes.jpg",
          rating: 4.8,
          reviewCount: 198,
          tags: ["footwear", "leather", "shoes", "formal"],
          attributes: { size: "42", type: "Dress" },
        }),
        this.productRepo.create({
          name: "Minimalist Court Street Sneakers",
          slug: "minimalist-court-street-sneakers",
          description: "Clean monochromatic low-top sneakers in Italian full-grain leather with cushioned soles.",
          sku: "SNK-001",
          category_id: footwearCat.id,
          price: 139.99,
          originalPrice: 160.0,
          stock: 64,
          image: "https://res.cloudinary.com/demo/image/upload/w_800,h_800,c_fill,q_auto,f_auto/sneakers.jpg",
          rating: 4.7,
          reviewCount: 310,
          tags: ["sneakers", "streetwear", "casual", "footwear"],
          attributes: { size: "41", type: "Sneakers" },
        }),
        this.productRepo.create({
          name: "Artisan Leather Commuter Backpack",
          slug: "artisan-leather-commuter-backpack",
          description: "Full-grain water-resistant leather backpack with padded 16-inch laptop compartment.",
          sku: "BCK-001",
          category_id: accessoriesCat.id,
          price: 189.99,
          originalPrice: 249.99,
          stock: 24,
          image: "https://res.cloudinary.com/demo/image/upload/w_800,h_800,c_fill,q_auto,f_auto/backpack.jpg",
          rating: 4.9,
          reviewCount: 220,
          tags: ["backpack", "leather", "commuter", "accessories"],
          attributes: { category: "Bags" },
        }),
      ];
      await this.productRepo.save(products);
    }
  }
}
