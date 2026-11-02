import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useStore } from "../context/StoreContext.jsx";
import { products, formatNaira } from "../data/products.js";
import { business, whatsappLink } from "../data/business.js";

const STEPS = ["Details", "Payment", "Confirm"];

// Short reference the customer puts in the transfer narration, e.g. TTC-7KQ4M
const makeRef = () => {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let code = "";
  for (let i = 0; i < 5; i++) code += chars[Math.floor(Math.random() * chars.length)];
  return `TASTY-${code}`;
};

function CopyButton({ value, label }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      window.prompt(`Copy the ${label}:`, value);
    }
  };

  return (
    <button type="button" className="copy-btn" onClick={copy} aria-label={`Copy ${label}`}>
      {copied ? "Copied" : "Copy"}
    </button>
  );
}

export default function Order() {
  const { cart, removeFromCart } = useStore();
  const navigate = useNavigate();
  const [step, setStep] = useState("details"); // details -> pay -> done
  const [ref, setRef] = useState("");
  const [form, setForm] = useState({ name: "", phone: "", mode: "pickup", address: "", notes: "" });

  const lines = cart
    .map((i) => ({ ...i, product: products.find((p) => p.id === i.id) }))
    .filter((l) => l.product);
  const subtotal = lines.reduce((sum, l) => sum + l.product.price * l.qty, 0);
  const deliveryFee = form.mode === "delivery" ? business.deliveryFee || 0 : 0;
  const total = subtotal + deliveryFee;
  const bank = business.bank;
  const stepIndex = step === "details" ? 0 : step === "pay" ? 1 : 2;

  const update = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const goTo = (next) => {
    setStep(next);
    window.scrollTo(0, 0);
  };

  const toPayment = (e) => {
    e.preventDefault();
    setRef((r) => r || makeRef());
    goTo("pay");
  };

  const buildMessage = () =>
    [
      `Hello ${business.name}, I have made payment for my order.`,
      "",
      `Order ref: ${ref}`,
      "",
      ...lines.map((l) => `${l.qty} x ${l.product.name} - ${formatNaira(l.product.price * l.qty)}`),
      deliveryFee ? `Delivery fee: ${formatNaira(deliveryFee)}` : null,
      `Total paid: ${formatNaira(total)}`,
      "",
      `Name: ${form.name}`,
      `Phone: ${form.phone}`,
      form.mode === "delivery" ? `Delivery to: ${form.address}` : "Pickup",
      form.notes ? `Notes: ${form.notes}` : null,
      "",
      "I am sending my payment receipt below.",
    ]
      .filter((line) => line !== null)
      .join("\n");

  const openWhatsApp = () => {
    const url = whatsappLink(buildMessage());
    const win = window.open(url, "_blank");
    if (win) {
      win.opener = null;
    } else {
      window.location.href = url; // popup blocked: go there in this tab
    }
  };

  const madePayment = () => {
    openWhatsApp();
    goTo("done");
  };

  const startNewOrder = () => {
    lines.forEach((l) => removeFromCart(l.id));
    navigate("/");
  };

  if (lines.length === 0 && step !== "done") {
    return (
      <section className="page empty">
        <h1>Nothing to order yet</h1>
        <p>Add some dishes to your cart first.</p>
        <Link className="btn" to="/menu">Browse the menu</Link>
      </section>
    );
  }

  return (
    <section className="page">
      <h1>Place your order</h1>

      <ol className="steps" aria-label="Order progress">
        {STEPS.map((label, i) => (
          <li key={label} className={i === stepIndex ? "current" : i < stepIndex ? "done" : ""}>
            <span>{i < stepIndex ? "✓" : i + 1}</span>
            {label}
          </li>
        ))}
      </ol>

      <div className="cart">
        {/* ---------- step 1: details ---------- */}
        {step === "details" && (
          <form className="form" onSubmit={toPayment}>
            <h2>Your details</h2>

            <label className="field">
              <span>Full name</span>
              <input name="name" value={form.name} onChange={update} required autoComplete="name" />
            </label>
            <label className="field">
              <span>Phone number (WhatsApp)</span>
              <input name="phone" type="tel" value={form.phone} onChange={update} required autoComplete="tel" />
            </label>

            <div className="choice" role="radiogroup" aria-label="Pickup or delivery">
              <label className={form.mode === "pickup" ? "chip active" : "chip"}>
                <input type="radio" name="mode" value="pickup" checked={form.mode === "pickup"} onChange={update} />
                Pickup
              </label>
              <label className={form.mode === "delivery" ? "chip active" : "chip"}>
                <input type="radio" name="mode" value="delivery" checked={form.mode === "delivery"} onChange={update} />
                Delivery
              </label>
            </div>

            {form.mode === "delivery" && (
              <label className="field">
                <span>Delivery address</span>
                <input name="address" value={form.address} onChange={update} required autoComplete="street-address" />
              </label>
            )}

            <label className="field">
              <span>Notes (optional)</span>
              <textarea
                name="notes"
                rows="3"
                value={form.notes}
                onChange={update}
                placeholder="Less pepper, extra plantain, and so on"
              />
            </label>

            <button type="submit" className="btn">Continue to payment</button>
          </form>
        )}

        {/* ---------- step 2: pay by transfer ---------- */}
        {step === "pay" && (
          <div className="form">
            <h2>Pay by bank transfer</h2>
            <p className="pay-amount">
              Transfer exactly <strong>{formatNaira(total)}</strong> to the account below.
            </p>

            {bank ? (
              <div className="bank">
                <div className="bank-row">
                  <span>Bank</span>
                  <strong>{bank.name}</strong>
                </div>
                <div className="bank-row">
                  <span>Account number</span>
                  <strong className="mono">{bank.accountNumber}</strong>
                  <CopyButton value={bank.accountNumber} label="account number" />
                </div>
                <div className="bank-row">
                  <span>Account name</span>
                  <strong>{bank.accountName}</strong>
                </div>
              </div>
            ) : (
              <p className="notice">Bank details are not set up yet. Add them in src/data/business.js.</p>
            )}

            <div className="ref-box">
              <span>Put this reference in your transfer narration</span>
              <div className="ref-row">
                <strong className="mono">{ref}</strong>
                <CopyButton value={ref} label="order reference" />
              </div>
            </div>

            <p className="hint">
              Only tap the button below after your bank app shows the transfer as successful. WhatsApp will
              open with your order details. Attach a screenshot of your payment receipt and send it, and we
              will confirm your order.
            </p>

            <button type="button" className="btn" onClick={madePayment}>I've made the payment</button>
            <button type="button" className="btn ghost" onClick={() => goTo("details")}>Back to details</button>
          </div>
        )}

        {/* ---------- step 3: confirm on WhatsApp ---------- */}
        {step === "done" && (
          <div className="form">
            <h2>Almost done</h2>
            <p className="pay-amount">
              Your order reference is <strong className="mono">{ref}</strong>.
            </p>
            <ol className="todo">
              <li>In WhatsApp, press send on the message with your order details.</li>
              <li>Attach a screenshot of your payment receipt and send it too.</li>
              <li>We will confirm your payment and start processing your order.</li>
            </ol>
            <button type="button" className="btn" onClick={openWhatsApp}>Open WhatsApp again</button>
            <button type="button" className="btn ghost" onClick={startNewOrder}>Start a new order</button>
          </div>
        )}

        <aside className="summary">
          <h2>Your order</h2>
          <ul className="mini-lines">
            {lines.map(({ product, qty }) => (
              <li key={product.id}>
                <span>{qty} × {product.name}</span>
                <strong>{formatNaira(product.price * qty)}</strong>
              </li>
            ))}
            {deliveryFee > 0 && (
              <li>
                <span>Delivery fee</span>
                <strong>{formatNaira(deliveryFee)}</strong>
              </li>
            )}
          </ul>
          <p className="row between total"><span>Total</span><strong>{formatNaira(total)}</strong></p>
          {step !== "done" && <Link to="/cart" className="btn ghost">Edit cart</Link>}
        </aside>
      </div>
    </section>
  );
}
