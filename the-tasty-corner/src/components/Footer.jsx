import { Link } from "react-router-dom";
import { business, whatsappLink } from "../data/business.js";

function Icon({ children, size = 22 }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

const SOCIALS = [
  {
    key: "instagram",
    label: "Instagram",
    icon: (
      <>
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </>
    ),
  },
  {
    key: "facebook",
    label: "Facebook",
    icon: <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />,
  },
  {
    key: "tiktok",
    label: "TikTok",
    // the TikTok logo is a solid shape, so it is filled instead of outlined like the others
    icon: (
      <path
        fill="currentColor"
        stroke="none"
        transform="translate(2 2) scale(0.8333)"
        d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"
      />
    ),
  },

];

const whatsappIcon = (
  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
);

export default function Footer() {
  // only the social accounts you filled in (business.js) are shown
  const socials = SOCIALS.filter((s) => business.socials?.[s.key]).map((s) => ({
    ...s,
    href: business.socials[s.key],
  }));
  socials.push({ key: "whatsapp", label: "WhatsApp", icon: whatsappIcon, href: whatsappLink("Hello!") });

  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <Link to="/" className="footer-brand">
          The <span>Tasty</span> Corner
        </Link>
        <p className="footer-tagline">Good Food. Great Taste. Happy Moments.</p>

        <div className="socials">
          {socials.map((s) => (
            <a key={s.key} className="social" href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label}>
              <Icon>{s.icon}</Icon>
            </a>
          ))}
        </div>

        <div className="footer-cols">
          <nav className="footer-col" aria-label="Quick links">
            <h3>Quick Links</h3>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/menu">Menu</Link></li>
              <li><Link to="/about">About</Link></li>
              <li><Link to="/contact">Contact</Link></li>
              <li><Link to="/order">Order</Link></li>
            </ul>
          </nav>

          <div className="footer-col">
            <h3>Opening Hours</h3>
            <ul>
              {business.hours.map(([days, time]) => (
                <li key={days}>
                  {days}
                  <br />
                  <strong>{time}</strong>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-col">
            <h3>Contact</h3>
            <ul>
              <li>
                <a className="contact-line" href={`mailto:${business.email}`}>
                  <Icon size={18}>
                    <path d="M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </Icon>
                  {business.email}
                </a>
              </li>
              <li>
                <a className="contact-line" href={whatsappLink("Hello!")} target="_blank" rel="noopener noreferrer">
                  <Icon size={18}>{whatsappIcon}</Icon>
                  {business.phone}
                </a>
              </li>
              <li>
                <span className="contact-line">
                  <Icon size={18}>
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </Icon>
                  {business.address}
                </span>
              </li>
            </ul>
          </div>
        </div>

        <hr className="footer-rule" />
        <p className="footer-copy">© {new Date().getFullYear()} {business.name}. All rights reserved.</p>
        <p className="footer-legal">
          <Link to="/privacy">Privacy Policy</Link>
          <Link to="/terms">Terms of Service</Link>
        </p>
      </div>
    </footer>
  );
}
