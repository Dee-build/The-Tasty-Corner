// Edit these details once. The Contact page, Order page and footer all use them.
export const business = {
  name: "The Tasty Corner",
  phone: "+234 703 387 3069",
  whatsapp: "2348132189584", // country code + number, no "+" and no spaces
  email: "adedayobabalola18@gmail.com",
  address: "Osogbo, Osun State, Nigeria",

  bank: {
    name: "OPAY",
    accountNumber: "9160404544",
    accountName: "The Tasty Corner",
  },
  deliveryFee: 0, // flat delivery fee in naira, e.g. 1000. Use 0 for free delivery.

  //Web3forms key for the order form. 
    orderEmailKey: "bac2a200-f552-442f-b54b-d9a4020f2575",

  hours: [
    ["Monday to Saturday", "11:00 AM – 9:00 PM"],
    ["Sunday", "Closed"],
  ],
};

export const whatsappLink = (text) =>
  `https://wa.me/${business.whatsapp}?text=${encodeURIComponent(text)}`;
