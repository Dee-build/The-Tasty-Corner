import { Link } from "react-router-dom";
import { useStore } from "../context/StoreContext.jsx";
import { products, formatNaira } from "../data/products.js";
import { Swatch } from "../components/ProductCard.jsx";

export default function Cart() {
  const { cart, setQty, removeFromCart } = useStore();
  const lines = cart
    .map((i) => ({ ...i, product: products.find((p) => p.id === i.id) }))
    .filter((l) => l.product);
  const total = lines.reduce((sum, l) => sum + l.product.price * l.qty, 0);

  if (lines.length === 0) {
    return (
      <section className="page empty">
        <h1>Your order is empty</h1>
        <p>Add a dish and it will show up here.</p>
        <Link className="btn" to="/menu">
          See the menu
        </Link>
      </section>
    );
  }

  return (
    <section className="page">
      <h1>Your order</h1>
      <div className="cart">
        <ul className="lines">
          {lines.map(({ product, qty }) => (
            <li key={product.id} className="line">
              <Swatch p={product} />
              <div className="line-info">
                <Link to={`/menu/${product.id}`} className="card-title">
                  {product.name}
                </Link>
                <p className="price">{formatNaira(product.price)}</p>
                <button
                  className="delete-btn"
                  onClick={() => removeFromCart(product.id)}
                  aria-label={`Delete ${product.name} from order`}
                >
                  <svg
                    viewBox="0 0 24 24"
                    width="18"
                    height="18"
                    aria-hidden="true"
                  >
                    <path
                      d="M3 6h18M8 6V4h8v2M6 6l1 14h10l1-14M10 10v6M14 10v6"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  Delete
                </button>
              </div>
              <div className="qty">
                <button
                  onClick={() => setQty(product.id, qty - 1)}
                  aria-label="Decrease quantity"
                >
                  −
                </button>
                <span>{qty}</span>
                <button
                  onClick={() => setQty(product.id, qty + 1)}
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>
              <p className="line-total">{formatNaira(product.price * qty)}</p>
            </li>
          ))}
        </ul>
        <aside className="summary">
          <h2>Order summary</h2>
          <p className="row between">
            <span>Subtotal</span>
            <strong>{formatNaira(total)}</strong>
          </p>
          <Link to="/order" className="btn">
            Checkout
          </Link>
        </aside>
      </div>
    </section>
  );
}
