import { useParams, Link, useNavigate } from "react-router-dom";
import { products, formatNaira } from "../data/products.js";
import { useStore } from "../context/StoreContext.jsx";
import { Swatch } from "../components/ProductCard.jsx";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useStore();
  const product = products.find((p) => p.id === Number(id));

  if (!product) {
    return (
      <section className="page empty">
        <h1>Dish not found</h1>
        <Link className="btn" to="/menu">Back to menu</Link>
      </section>
    );
  }

  const order = () => {
    addToCart(product.id);
    navigate("/cart");
  };

  return (
    <section className="page detail">
      <Swatch p={product} large />
      <div className="detail-info">
        <Link to="/menu" className="back">Back to menu</Link>
        <p className="eyebrow">{product.category}</p>
        <h1>{product.name}</h1>
        <p className="price big">{formatNaira(product.price)}</p>
        <p className="desc">{product.details || product.desc}</p>
        <button className="btn" onClick={order}>Add to order</button>
      </div>
    </section>
  );
}
