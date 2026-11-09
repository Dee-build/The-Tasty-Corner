import { Link } from "react-router-dom";
import { useStore } from "../context/StoreContext.jsx";
import { formatNaira } from "../data/products.js";

export function Swatch({ p, large }) {
  return (
    <img
      className={large ? "photo large" : "photo"}
      src={p.image}
      alt={p.name}
      loading="lazy"
    />
  );
}

export default function ProductCard({ product }) {
  const { cart, addToCart, setQty } = useStore();
  const inCart = cart.find((i) => i.id === product.id);

  return (
    <article className="card">
      <Link to={`/products/${product.id}`}>
        <Swatch p={product} />
      </Link>
      <div className="card-body">
        <Link to={`/products/${product.id}`} className="card-title">{product.name}</Link>
        <p className="price">{formatNaira(product.price)}</p>

        {inCart ? (
          <div className="stepper">
            <button onClick={() => setQty(product.id, inCart.qty - 1)} aria-label="Fewer plates">−</button>
            <span>{inCart.qty} {inCart.qty === 1 ? "plate" : "plates"}</span>
            <button onClick={() => setQty(product.id, inCart.qty + 1)} aria-label="More plates">+</button>
          </div>
        ) : (
          <button className="btn small" onClick={() => addToCart(product.id)}>
            Add to cart
          </button>
        )}
      </div>
    </article>
  );
}