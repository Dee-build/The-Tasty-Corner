import { business } from "../data/business.js";

// DRAFT: read this through and edit it so it matches how your business really works.
export default function Privacy() {
  return (
    <section className="page legal-doc">
      <h1>Privacy Policy</h1>
      <p>This page explains what information {business.name} collects when you use this website, and what we do with it.</p>

      <h2>What we collect</h2>
      <p>
        When you place an order or send us a message, we collect the details you type in: your name, phone
        number, delivery address (for delivery orders) and any notes. These reach us on WhatsApp and may also
        be emailed to us.
      </p>

      <h2>What stays on your device</h2>
      <p>
        Your cart, your favourite dishes and your light or dark mode choice are saved in your own browser so
        they are still there when you come back. We do not receive this information.
      </p>

      <h2>How we use it</h2>
      <p>
        We use your details only to prepare and deliver your order, to contact you about it, and to answer
        your messages. We do not sell your information.
      </p>

      <h2>Your choices</h2>
      <p>
        You can ask us to delete the details you sent us at any time. Contact us at {business.email}.
      </p>
    </section>
  );
}
