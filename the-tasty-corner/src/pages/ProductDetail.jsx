import { useParams, Link, useNavigate } from "react-router-dom";
import { products, formatNaira } from "../data/products.js";
import { useStore } from "../context/StoreContext.jsx";
import { Swatch } from "../components/ProductCard.jsx";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { favorites, toggleFavorite, addToCart } = useStore();
  const product = products.find((p) => p.id === Number(id));

  if (!product) {
    return (
      <section className="page empty">
        <h1>Dish not found</h1>
        <Link className="btn" to="/menu">Back to menu</Link>
      </section>
    );
  }

  const isFav = favorites.includes(product.id);

  return (
    <section className="page detail">
      <Swatch p={product} large />
      <div>
        <Link to="/menu" className="back">Back to menu</Link>
        <h1>{product.name}</h1>
        <p className="price big">{formatNaira(product.price)}</p>
        <p className="desc">{product.desc}</p>
        <div className="row">
          <button
            className="btn"
            onClick={() => {
              addToCart(product.id);
              navigate("/cart");
            }}
          >
            Add to order
          </button>
          <button
            className={isFav ? "btn ghost active" : "btn ghost"}
            onClick={() => toggleFavorite(product.id)}
            aria-pressed={isFav}
          >
            {isFav ? "Saved to favorites" : "Save to favorites"}
          </button>
        </div>
      </div>
    </section>
  );
}
