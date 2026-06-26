import { useState, useMemo } from "react";
import { SEO } from "@/components/SEO";
import { ShopHeader } from "@/sections/ShopHeader";
import { ProductFilters } from "@/sections/ProductFilters";
import { ProductGrid } from "@/sections/ProductGrid";
import { Footer } from "@/components/Footer";
import { products } from "@/data/products";
import type { FragranceFamily } from "@/types";

export function ShopPage() {
  const [filter, setFilter] = useState<FragranceFamily | "all">("all");

  const filteredProducts = useMemo(() => {
    if (filter === "all") return products;
    return products.filter((p) => p.fragranceFamily === filter);
  }, [filter]);

  return (
    <>
      <SEO title="Shop NESMA Perfumes" description="Explore NESMA Perfumes collection: oriental, woody, floral, sweet, and fresh fragrances with WhatsApp checkout." canonical="/shop" />
      <ShopHeader />
      <div className="bg-ivory min-h-screen">
        <ProductFilters
          activeFilter={filter}
          onFilterChange={setFilter}
          count={filteredProducts.length}
        />
        <div className="container-main py-10 pb-20">
          <ProductGrid products={filteredProducts} />
        </div>
      </div>
      <Footer />
    </>
  );
}
