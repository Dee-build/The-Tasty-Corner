import { useState } from "react";
import { products, categories } from "../data/products.js";
import ProductCard from "../components/ProductCard.jsx";

export default function Products() {
  const [category, setCategory] = useState("All");
  const shown = category === "All" ? products : products.filter((p) => p.category === category);

  return (
    <section className="page">
      <h1>Menu</h1>
      <div className="filters">
        {categories.map((c) => (
          <button
            key={c}
            className={c === category ? "chip active" : "chip"}
            onClick={() => setCategory(c)}
          >
            {c}
          </button>
        ))}
      </div>
      <div className="grid">
        {shown.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  );
}
