import { business } from "../data/business.js";

// DRAFT: read this through and edit it so it matches how your business really works
// (especially refunds and delivery).
export default function Terms() {
  return (
    <section className="page legal-doc">
      <h1>Terms of Service</h1>
      <p>By ordering from {business.name} through this website, you agree to the terms below.</p>

      <h2>Orders and payment</h2>
      <p>
        Prices are in naira. You pay by bank transfer to the account shown at checkout. Your order is
        confirmed once we have received your payment and replied to you on WhatsApp.
      </p>

      <h2>Pickup and delivery</h2>
      <p>
        Delivery and pickup times are estimates and may change with demand and traffic. Please give a
        correct phone number and address so we can reach you.
      </p>

      <h2>Availability and changes</h2>
      <p>
        Dishes depend on availability. If something you ordered is not available, we will contact you to
        offer a replacement or a refund.
      </p>

      <h2>Problems with an order</h2>
      <p>If something is wrong with your order, tell us on WhatsApp as soon as possible so we can put it right.</p>

      <h2>Contact</h2>
      <p>{business.email}</p>
    </section>
  );
}
