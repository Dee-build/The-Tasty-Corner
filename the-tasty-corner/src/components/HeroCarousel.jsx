import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { products, formatNaira } from "../data/products.js";

// Which dishes appear: all food (no drinks). To pick your own, use e.g.
// products.filter((p) => [1, 3, 4].includes(p.id))
const SLIDES = products.filter((p) => p.category !== "Drinks");
const DELAY = 4500; // milliseconds each picture stays
const SWIPE = 40; // how far (px) a swipe must travel

function Icon({ children, fill = "none" }) {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" fill={fill} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {children}
    </svg>
  );
}

export default function HeroCarousel() {
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(() => !window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  const [hold, setHold] = useState(false); // true while the visitor is pointing at / focused on the carousel
  const startX = useRef(null);
  const dragged = useRef(false);

  const next = () => setIndex((i) => (i + 1) % SLIDES.length);
  const prev = () => setIndex((i) => (i - 1 + SLIDES.length) % SLIDES.length);

  // auto-advance; the timer restarts after every change, so tapping an arrow never causes a double jump
  useEffect(() => {
    if (!playing || hold) return undefined;
    const timer = setTimeout(() => setIndex((i) => (i + 1) % SLIDES.length), DELAY);
    return () => clearTimeout(timer);
  }, [index, playing, hold]);

  const onPointerEnter = (e) => {
    if (e.pointerType === "mouse") setHold(true);
  };
  const onPointerDown = (e) => {
    startX.current = e.clientX;
    dragged.current = false;
  };
  const onPointerUp = (e) => {
    if (startX.current === null) return;
    const dx = e.clientX - startX.current;
    startX.current = null;
    if (Math.abs(dx) < SWIPE) return;
    dragged.current = true;
    if (dx < 0) next();
    else prev();
  };
  // a swipe that starts on a picture must not open the dish page
  const onClickCapture = (e) => {
    if (!dragged.current) return;
    e.preventDefault();
    e.stopPropagation();
    dragged.current = false;
  };
  const onKeyDown = (e) => {
    if (e.key === "ArrowRight") next();
    if (e.key === "ArrowLeft") prev();
  };

  if (SLIDES.length === 0) return null;

  return (
    <div
      className="carousel"
      role="region"
      aria-roledescription="carousel"
      aria-label="Our dishes"
      onPointerEnter={onPointerEnter}
      onPointerLeave={() => setHold(false)}
      onFocus={() => setHold(true)}
      onBlur={() => setHold(false)}
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
      onPointerCancel={() => { startX.current = null; }}
      onClickCapture={onClickCapture}
      onKeyDown={onKeyDown}
    >
      <div className="carousel-track" style={{ transform: `translateX(-${index * 100}%)` }}>
        {SLIDES.map((p, i) => (
          <Link
            key={p.id}
            to={`/products/${p.id}`}
            className="slide"
            draggable="false"
            role="group"
            aria-roledescription="slide"
            aria-label={`${i + 1} of ${SLIDES.length}`}
            aria-hidden={i !== index}
            tabIndex={i === index ? 0 : -1}
          >
            <img src={p.image} alt={p.name} draggable="false" loading={i === 0 ? "eager" : "lazy"} />
            <span className="slide-caption">
              <strong>{p.name}</strong>
              <span>{formatNaira(p.price)}</span>
            </span>
          </Link>
        ))}
      </div>

      <button type="button" className="carousel-btn prev" onClick={prev} aria-label="Previous dish">
        <Icon><path d="M15 6l-6 6 6 6" /></Icon>
      </button>
      <button type="button" className="carousel-btn next" onClick={next} aria-label="Next dish">
        <Icon><path d="M9 6l6 6-6 6" /></Icon>
      </button>
      <button
        type="button"
        className="carousel-pause"
        onClick={() => setPlaying((v) => !v)}
        aria-label={playing ? "Pause slideshow" : "Play slideshow"}
      >
        {playing ? <Icon><path d="M9 5v14M15 5v14" /></Icon> : <Icon fill="currentColor"><path d="M7 4l12 8-12 8z" /></Icon>}
      </button>

      <div className="carousel-dots">
        {SLIDES.map((p, i) => (
          <button
            key={p.id}
            type="button"
            className={i === index ? "dot active" : "dot"}
            onClick={() => setIndex(i)}
            aria-label={`Show ${p.name}`}
            aria-current={i === index}
          />
        ))}
      </div>
    </div>
  );
}
