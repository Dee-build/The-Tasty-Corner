import { useState } from "react";
import { business, whatsappLink } from "../data/business.js";

export default function Contact() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const send = (e) => {
    e.preventDefault();
    const text = `Hello ${business.name}, my name is ${name}.\n\n${message}`;
    window.open(whatsappLink(text), "_blank", "noopener");
  };

  return (
    <section className="page">
      <div className="section-head">
        <h1>Contact us</h1>
        <p className="lead centered">Questions, bulk orders, or just an inquiry? Reach us any of these ways.</p>
      </div>

      <div className="contact-grid">
        <div className="info-list">
          <div className="info">
            <h3>Phone</h3>
            <p><a href={`tel:${business.phone.replace(/\s/g, "")}`}>{business.phone}</a></p>
          </div>
          <div className="info">
            <h3>WhatsApp</h3>
            <p><a href={whatsappLink("Hello!")} target="_blank" rel="noopener noreferrer">Chat with us</a></p>
          </div>
          <div className="info">
            <h3>Email</h3>
            <p><a href={`mailto:${business.email}`}>{business.email}</a></p>
          </div>
          <div className="info">
            <h3>Find us</h3>
            <p>{business.address}</p>
          </div>
          <div className="info">
            <h3>Opening hours</h3>
            {business.hours.map(([days, time]) => (
              <p key={days}>{days}: <strong>{time}</strong></p>
            ))}
          </div>
        </div>

        <form className="form" onSubmit={send}>
          <h2>Send a message</h2>
          <label className="field">
            <span>Your name</span>
            <input value={name} onChange={(e) => setName(e.target.value)} required autoComplete="name" />
          </label>
          <label className="field">
            <span>Message</span>
            <textarea rows="5" value={message} onChange={(e) => setMessage(e.target.value)} required />
          </label>
          <button type="submit" className="btn">Send on WhatsApp</button>
        </form>
      </div>
    </section>
  );
}
