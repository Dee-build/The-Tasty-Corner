// Photos in src/photos are found by file name, e.g. image: "asun-rice.png".
// A full web link (https://...) still works too.
// const photoFiles = import.meta.glob("../photos/*.{jpg,jpeg,png,webp}", {
//   eager: true,
//   import: "default",
// });
// const resolvePhoto = (file) => photoFiles[`../photos/${file}`] ?? file;

// const rawProducts = [
//   { id: 1, name: "Asun Rice & Chicken", price: 4500, category: "Mains", image: "asun-rice.png", desc: "Rice cooked with smoky, peppery asun and served with juicy chicken." },
//   { id: 2, name: "White Rice & Pepper Soup Stew", price: 4000, category: "Mains", image: "white-pepper.jpg", desc: "Fluffy white rice served with a hot, spicy pepper soup stew." },
//   { id: 3, name: "Gizdodo", price: 3000, category: "Mains", image: "giz-dodo.jpg", desc: "Gizzard and ripe plantain fried and tossed in a sweet, spicy pepper sauce." },
//   { id: 4, name: "Fried Rice & Chicken", price: 3500, category: "Mains", image: "fried.jpg", desc: "Colourful fried rice with mixed vegetables, served with juicy chicken." },
//   { id: 5, name: "Goat meat Pepper Soup", price: 4000, category: "Sides", image: "goat-meat.jpg", desc: "Hot, peppery broth with tender goat meat and local spices." },
//   { id: 6, name: "Cat Fish Pepper Soup", price: 2500, category: "Sides", image: "cat-fish.jpg", desc: "Aromatic, spicy broth with fresh catfish and local herbs." },
//   { id: 7, name: "Smirnoff Ice", price: 1200, category: "Drinks", image: "smirnoff.jpg", desc: "Crisp, citrusy Smirnoff Ice, served ice cold." },
//   { id: 8, name: "Chivita", price: 1800, category: "Drinks", image: "chivita.png", desc: "Chilled Chivita fruit juice, sweet and refreshing." },
//   { id: 9, name: "Yoghurt", price: 2000, category: "Drinks", image: "yoghurt.webp", desc: "Cold, creamy yoghurt, smooth and lightly sweet." },
//   { id: 10, name: "Water", price: 1500, category: "Drinks", image: "water.jpg", desc: "Chilled bottled water to go with your meal." },
// ];

// export const products = rawProducts.map((p) => ({ ...p, image: resolvePhoto(p.image) }));

// export const categories = ["All", ...new Set(products.map((p) => p.category))];
// export const formatNaira = (n) => "₦" + n.toLocaleString("en-NG");





// Photos in src/photos are found by file name, e.g. image: "asun-rice.png".
// A full web link (https://...) still works too.
const photoFiles = import.meta.glob("../photos/*.{jpg,jpeg,png,webp}", {
  eager: true,
  import: "default",
});
const resolvePhoto = (file) => photoFiles[`../photos/${file}`] ?? file;

// desc    = one-line blurb (menu and Chef's Special cards)
// details = the longer, mouth-watering text on each dish's own page
const rawProducts = [
  {
    id: 1, name: "Asun Rice & Chicken", price: 4500, category: "Mains", image: "asun-rice.png",
    desc: "Rice cooked with smoky, peppery asun and served with juicy chicken.",
    details: "Fragrant rice tossed with smoky, peppery asun: spiced goat meat grilled over fire and cut into bite-sized pieces. Every forkful is rich, smoky and just fiery enough to keep you coming back, served with juicy chicken on the side.",
  },
  {
    id: 2, name: "White Rice & Pepper Soup Stew", price: 4000, category: "Mains", image: "white-pepper.jpg",
    desc: "Fluffy white rice served with a hot, spicy pepper soup stew.",
    details: "Soft, fluffy white rice paired with a steaming pepper soup stew that is hot, aromatic and full of warming spices. Comforting, bold and deeply satisfying, it is the kind of plate that feels like home.",
  },
  {
    id: 3, name: "Gizdodo", price: 3000, category: "Mains", image: "giz-dodo.jpg",
    desc: "Gizzard and ripe plantain fried and tossed in a sweet, spicy pepper sauce.",
    details: "Tender gizzard and golden, caramelised plantain tossed together in a spicy-sweet pepper sauce. Savoury, sweet and gently hot all at once, it is the dish that makes everyone at the table reach across for another bite.",
  },
  {
    id: 4, name: "Fried Rice & Chicken", price: 3500, category: "Mains", image: "fried.jpg",
    desc: "Colourful fried rice with mixed vegetables, served with juicy chicken.",
    details: "Colourful fried rice, full of savoury flavour and flecked with mixed vegetables, served with juicy chicken. A party-table favourite that turns an ordinary day into a small celebration.",
  },
  {
    id: 5, name: "Goat meat Pepper Soup", price: 3000, category: "Sides", image: "goat-meat.jpg",
    desc: "Hot, peppery broth with tender goat meat and local spices.",
    details: "A steaming bowl of peppery broth loaded with tender goat meat and warming local spices. Light on the stomach and big on flavour, it is the bowl to reach for on a rainy evening, or whenever you need a little comfort.",
  },
  {
    id: 6, name: "Cat Fish Pepper Soup", price: 2500, category: "Sides", image: "cat-fish.jpg",
    desc: "Aromatic, spicy broth with fresh catfish and local herbs.",
    details: "Fresh catfish gently simmered in a fragrant, spicy broth with local herbs. Delicate, aromatic and full of heat, it is a light but fiery bowl that clears the head and warms you through.",
  },
  {
    id: 7, name: "Smirnoff Ice", price: 1200, category: "Drinks", image: "smirnoff.jpg",
    desc: "Crisp, citrusy Smirnoff Ice, served ice cold.",
    details: "Crisp, citrusy and served ice cold, the perfect partner for grilled and peppery dishes. A refreshing way to cool down between spicy bites. For guests aged 18 and over.",
  },
  {
    id: 8, name: "Chivita", price: 1800, category: "Drinks", image: "chivita.png",
    desc: "Chilled Chivita fruit juice, sweet and refreshing.",
    details: "Chilled, fruity and refreshingly sweet, a Nigerian favourite for cooling down after a pepper-rich meal. Perfect alongside rice, grills and everything in between.",
  },
  {
    id: 9, name: "Yoghurt", price: 2000, category: "Drinks", image: "yoghurt.webp",
    desc: "Cold, creamy yoghurt, smooth and lightly sweet.",
    details: "Cold, creamy and smooth with a lightly sweet finish. The cool, gentle treat that balances spicy food and rounds off any meal on a soft note.",
  },
  {
    id: 10, name: "Water", price: 1500, category: "Drinks", image: "water.jpg",
    desc: "Chilled bottled water to go with your meal.",
    details: "Ice-cold bottled water, the simplest way to refresh between every spicy bite. Crisp and clean, it goes with everything on the menu.",
  },
];

export const products = rawProducts.map((p) => ({ ...p, image: resolvePhoto(p.image) }));

export const categories = ["All", ...new Set(products.map((p) => p.category))];
export const formatNaira = (n) => "₦" + n.toLocaleString("en-NG");