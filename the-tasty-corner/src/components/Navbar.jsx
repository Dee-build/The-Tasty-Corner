import { useEffect, useLayoutEffect, useState } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import { useStore } from "../context/StoreContext.jsx";
import logoCream from "../photos/logo.png";
import logoBrown from "../photos/logo-brown.png";

function CartIcon() {
  return (
    <svg viewBox="0 0 24 24" width="26" height="26" aria-hidden="true">
      <path
        d="M3 4h2l2.4 11.2a1 1 0 0 0 1 .8h8.8a1 1 0 0 0 1-.76L20 8H6.2"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="9.5" cy="20" r="1.5" fill="currentColor" />
      <circle cx="17" cy="20" r="1.5" fill="currentColor" />
    </svg>
  );
}

function SunIcon() {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
      <circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="2" />
      <path
        d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
      <path
        d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function MenuIcon() {
  return (
    <svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true">
      <path d="M4 7h16M4 12h16M4 17h16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true">
      <path d="M6 6l12 12M18 6L6 18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export default function Navbar() {
  const { cartCount, favorites } = useStore();
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
  const [theme, setTheme] = useState(() => {
    try {
      return localStorage.getItem("theme") || "dark";
    } catch {
      return "dark";
    }
  });

  useLayoutEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    try {
      localStorage.setItem("theme", theme);
    } catch {
      /* ignore */
    }
  }, [theme]);

  // close the menu whenever the page changes
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // while the menu is open: lock page scroll, close on Escape or if the screen gets wide
  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    const onResize = () => {
      if (window.innerWidth > 960) setOpen(false);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [open]);

  const goingLight = theme === "dark";
  const toggleTheme = () => setTheme(goingLight ? "light" : "dark");

  return (
    <header className="nav">
      <Link to="/" className="logo">
        <img className="for-dark" src={logoCream} alt="The Tasty Corner, home" />
        <img className="for-light" src={logoBrown} alt="The Tasty Corner, home" />
      </Link>

      <nav id="site-menu" className={open ? "menu open" : "menu"} aria-label="Main">
        <button className="menu-close" onClick={() => setOpen(false)} aria-label="Close menu">
          <CloseIcon />
        </button>
        <NavLink to="/" end>Home</NavLink>
        <NavLink to="/menu">Menu</NavLink>
        <NavLink to="/about">About</NavLink>
        <NavLink to="/contact">Contact</NavLink>
        <NavLink to="/order" className="nav-order nav-order-desktop">Order</NavLink>
        <button className="menu-theme" onClick={toggleTheme}>
          {goingLight ? <SunIcon /> : <MoonIcon />}
          <span>{goingLight ? "Light mode" : "Dark mode"}</span>
        </button>
      </nav>

      <div className="nav-actions">
        <NavLink to="/order" className="nav-order nav-order-mobile">Order</NavLink>
        <button
          className="theme-toggle in-bar"
          onClick={toggleTheme}
          aria-label={goingLight ? "Switch to light mode" : "Switch to dark mode"}
          title={goingLight ? "Light mode" : "Dark mode"}
        >
          {goingLight ? <SunIcon /> : <MoonIcon />}
        </button>
        <NavLink to="/cart" className="cart-link" aria-label={`Cart, ${cartCount} items`}>
          <CartIcon />
          {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
        </NavLink>
        <button
          className="hamburger"
          onClick={() => setOpen(true)}
          aria-label="Open menu"
          aria-expanded={open}
          aria-controls="site-menu"
        >
          <MenuIcon />
        </button>
      </div>

      <div className={open ? "scrim show" : "scrim"} onClick={() => setOpen(false)} aria-hidden="true" />
    </header>
  );
}
