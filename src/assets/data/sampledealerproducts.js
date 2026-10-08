// Sample products, used when a dealer has no productList of its own.
export const SAMPLE_PRODUCTS = [
  { id: 1, name: "brand", price: 324242, location: "Tadimarri, Nicobars", date: "September 05, 2026", image: "" },
  { id: 2, name: "Test title", price: 100, location: "Tadimarri, Nicobars", date: "September 04, 2026", image: "" },
  { id: 3, name: "FARMTRAC Champion", price: 280000, location: "Singpur, Bhopal", date: "June 25, 2025", image: "" },
  { id: 4, name: "Mahindra 575 DI", price: 450000, location: "Nashik, Maharashtra", date: "May 12, 2025", image: "" },
  { id: 5, name: "Swaraj 744 FE", price: 520000, location: "Ludhiana, Punjab", date: "April 18, 2025", image: "" },
];

export const getDealerProducts = (dealer) =>
  dealer?.productList?.length ? dealer.productList : SAMPLE_PRODUCTS;