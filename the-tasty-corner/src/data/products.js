// Photos in src/photos are found by file name, e.g. image: "asun-rice.png".
// A full web link (https://...) still works too.
const photoFiles = import.meta.glob("../photos/*.{jpg,jpeg,png,webp}", {
  eager: true,
  import: "default",
});
const resolvePhoto = (file) => photoFiles[`../photos/${file}`] ?? file;

const rawProducts = [
  { id: 1, name: "Asun Rice & Chicken", price: 4500, category: "Mains", image: "asun-rice.png", desc: "Rice cooked with smoky, peppery asun and served with juicy chicken." },
  { id: 2, name: "White Rice & Pepper Soup Stew", price: 4000, category: "Mains", image: "white-pepper.jpg", desc: "Fluffy white rice served with a hot, spicy pepper soup stew." },
  { id: 3, name: "Gizdodo", price: 3000, category: "Mains", image: "giz-dodo.jpg", desc: "Gizzard and ripe plantain fried and tossed in a sweet, spicy pepper sauce." },
  { id: 4, name: "Fried Rice & Chicken", price: 3500, category: "Mains", image: "fried.jpg", desc: "Colourful fried rice with mixed vegetables, served with juicy chicken." },
  { id: 5, name: "Goat meat Pepper Soup", price: 4000, category: "Sides", image: "goat-meat.jpg", desc: "Hot, peppery broth with tender goat meat and local spices." },
  { id: 6, name: "Cat Fish Pepper Soup", price: 2500, category: "Sides", image: "cat-fish.jpg", desc: "Aromatic, spicy broth with fresh catfish and local herbs." },
  { id: 7, name: "Smirnoff Ice", price: 1200, category: "Drinks", image: "smirnoff.jpg", desc: "Crisp, citrusy Smirnoff Ice, served ice cold." },
  { id: 8, name: "Chivita", price: 1800, category: "Drinks", image: "chivita.png", desc: "Chilled Chivita fruit juice, sweet and refreshing." },
  { id: 9, name: "Yoghurt", price: 2000, category: "Drinks", image: "yoghurt.webp", desc: "Cold, creamy yoghurt, smooth and lightly sweet." },
  { id: 10, name: "Water", price: 1500, category: "Drinks", image: "water.jpg", desc: "Chilled bottled water to go with your meal." },
];

export const products = rawProducts.map((p) => ({ ...p, image: resolvePhoto(p.image) }));

export const categories = ["All", ...new Set(products.map((p) => p.category))];
export const formatNaira = (n) => "₦" + n.toLocaleString("en-NG");