import { Link } from "react-router-dom";
import logoCream from "../photos/logo-full.png";
import logoBrown from "../photos/logo-full-brown.png";

const values = [
  { title: "Freshly prepared", text: "Every plate is cooked when you order it, never reheated from yesterday." },
  { title: "Real Nigerian flavour", text: "Jollof, soups, suya and more, made the way they are meant to taste." },
  { title: "Fair prices", text: "Good food should not cost a fortune, so we keep our prices friendly." },
];

export default function About() {
  return (
    <>
      <section className="page about-split">
        <div>
          <p className="eyebrow">Our story</p>
          <h1>Good food. Great taste. Happy moments.</h1>
          <p className="lead">
            The Tasty Corner is a Nigerian kitchen in Osogbo, Osun State. We cook the meals you grew up on,
            fresh every day and at prices that make sense.
          </p>
          <p className="lead">
            Order online for pickup or delivery, and we will have your food hot and ready.
          </p>
          <div className="hero-actions">
            <Link to="/menu" className="btn">View the menu</Link>
            <Link to="/contact" className="btn ghost">Contact us</Link>
          </div>
        </div>
        <div className="hero-photo">
          <img className="for-dark" src={logoCream} alt="The Tasty Corner" />
          <img className="for-light" src={logoBrown} alt="The Tasty Corner" />
        </div>
      </section>

      <section className="page">
        <div className="section-head">
          <h2>What we stand for</h2>
        </div>
        <div className="values">
          {values.map((v) => (
            <div className="value" key={v.title}>
              <h3>{v.title}</h3>
              <p>{v.text}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
