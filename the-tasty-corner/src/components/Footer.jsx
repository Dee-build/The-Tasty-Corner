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
    icon: (
      <>
        <path d="M9 18V5l12-2v13" />
        <circle cx="6" cy="18" r="3" />
        <circle cx="18" cy="16" r="3" />
      </>
    ),
  },
  {
    key: "x",
    label: "X (Twitter)",
    icon: (
      <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
    ),
  },
  {
    key: "youtube",
    label: "YouTube",
    icon: (
      <>
        <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
        <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
      </>
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
