import { Link } from "react-router-dom";
import { products, formatNaira } from "../data/products.js";
import { useStore } from "../context/StoreContext.jsx";
import ProductCard from "../components/ProductCard.jsx";
import HeroCarousel from "../components/HeroCarousel.jsx";

const perks = [
  { title: "Delicious meals", d: "M3 17h18M5 17a7 7 0 0 1 14 0M12 8V6" },
  { title: "Fresh ingredients", d: "M5 19c0-9 5-14 14-14 0 9-5 14-14 14zM5 19l7-7" },
  {
    title: "Affordable prices",
    d: "M12 21l-1.5-1.4C5.4 15.4 2 12.3 2 8.5 2 5.4 4.4 3 7.5 3c1.7 0 3.4.8 4.5 2.1C13.1 3.8 14.8 3 16.5 3 19.6 3 22 5.4 22 8.5c0 3.8-3.4 6.9-8.5 11.1L12 21z",
  },
  {
    title: "Friendly service",
    d: "M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM9 10h.01M15 10h.01M8.5 14c1 1.5 2.2 2 3.5 2s2.5-.5 3.5-2",
  },
];

// Sample reviews: replace these with real ones from your customers.
const reviews = [
  { name: "Funke A.", text: "The gizzdodo was crunchy, spicy and sweet in all the right places. I finished the plate and wanted more." },
  { name: "Tayo O.", text: "Best fried rice I've had in Osogbo. Colourful, full of flavour and the chicken was perfectly done." },
  { name: "Samuel T.", text: "The asun rice has real heat and a smoky taste. I'm already planning my next order." },
];

function Special({ product }) {
  const { cart, addToCart, setQty } = useStore();
  const inCart = cart.find((i) => i.id === product.id);

  return (
    <article className="special">
      <img className="photo" src={product.image} alt={product.name} loading="lazy" />
      <div className="special-body">
        <p className="eyebrow">Chef's special</p>
        <h3>{product.name}</h3>
        <p className="desc">{product.desc}</p>
        <p className="price big">{formatNaira(product.price)}</p>
        <div className="row">
          {inCart ? (
            <div className="stepper">
              <button onClick={() => setQty(product.id, inCart.qty - 1)} aria-label="Fewer plates">−</button>
              <span>{inCart.qty} {inCart.qty === 1 ? "plate" : "plates"}</span>
              <button onClick={() => setQty(product.id, inCart.qty + 1)} aria-label="More plates">+</button>
            </div>
          ) : (
            <button className="btn" onClick={() => addToCart(product.id)}>Add to cart</button>
          )}
          <Link to={`/products/${product.id}`} className="btn ghost">View dish</Link>
        </div>
      </div>
    </article>
  );
}

export default function Landing() {
  const specials = products.filter((p) => [1, 4].includes(p.id));

  return (
    <>
      <section className="hero">
        <div className="hero-text">
          <p className="eyebrow">Osogbo, Osun State</p>
          <h1>Nigerian food, cooked fresh and made the way it should be.</h1>
          <p className="lead">Fried rice, Gizzdodo, Asun rice, and more. Order online for pickup or delivery.</p>
          <div className="hero-actions">
            <Link to="/menu" className="btn">Order now</Link>
            <a href="#specials" className="btn ghost">Chef's specials</a>
          </div>
        </div>
       <HeroCarousel />
      </section>

      <section className="page">
        <div className="perks">
          {perks.map((p) => (
            <div className="perk" key={p.title}>
              <span className="perk-icon">
                <svg viewBox="0 0 24 24" width="26" height="26" aria-hidden="true">
                  <path d={p.d} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <p>{p.title}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="page">
        <div className="section-head">
          <h2>Popular Dishes</h2>
        </div>
        <div className="grid popular">
          {products.slice(0, 3).map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
        <p className="more"><Link to="/menu" className="btn ghost">See full menu</Link></p>
      </section>

      <section className="page" id="specials">
        <div className="section-head">
          <h2>Chef's Specials</h2>
        </div>
        <div className="specials">
          {specials.map((p) => (
            <Special key={p.id} product={p} />
          ))}
        </div>
      </section>

      <section className="page">
        <div className="section-head">
          <h2>Customer Testimonials</h2>
        </div>
        <div className="testimonials">
          {reviews.map((r) => (
            <figure className="quote" key={r.name}>
              <div className="avatar">{r.name[0]}</div>
              <div className="stars" aria-label="5 out of 5 stars">★★★★★</div>
              <blockquote>{r.text}</blockquote>
              <figcaption>{r.name}</figcaption>
            </figure>
          ))}
        </div>
      </section>
    </>
  );
}
