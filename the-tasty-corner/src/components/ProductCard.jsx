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

export function HeartIcon({ filled }) {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
      <path
        d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
        fill={filled ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function ProductCard({ product }) {
  const { cart, favorites, toggleFavorite, addToCart, setQty } = useStore();
  const isFav = favorites.includes(product.id);
  const inCart = cart.find((i) => i.id === product.id);

  return (
    <article className="card">
      <div className="card-media">
        <Link to={`/products/${product.id}`}>
          <Swatch p={product} />
        </Link>
        <button
          className={isFav ? "fav active" : "fav"}
          onClick={() => toggleFavorite(product.id)}
          aria-pressed={isFav}
          aria-label={
            isFav
              ? `Remove ${product.name} from favorites`
              : `Add ${product.name} to favorites`
          }
        >
          <HeartIcon filled={isFav} />
        </button>
      </div>
      <div className="card-body">
        <Link to={`/products/${product.id}`} className="card-title">
          {product.name}
        </Link>
        <p className="price">{formatNaira(product.price)}</p>

        {inCart ? (
          <div className="stepper">
            <button
              onClick={() => setQty(product.id, inCart.qty - 1)}
              aria-label="Fewer plates"
            >
              −
            </button>
            <span>
              {inCart.qty} {inCart.qty === 1 ? "plate" : "plates"}
            </span>
            <button
              onClick={() => setQty(product.id, inCart.qty + 1)}
              aria-label="More plates"
            >
              +
            </button>
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
