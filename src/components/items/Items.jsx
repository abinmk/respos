import React from "react";
import "./Items.css";

const items = [
  {
    id: 1,
    name: "Chicken Biryani",
    price: 150,
    image: "https://source.unsplash.com/100x100/?biryani",
  },
  {
    id: 2,
    name: "Margherita Pizza",
    price: 200,
    image: "https://source.unsplash.com/100x100/?pizza",
  },
  {
    id: 3,
    name: "Veg Fried Rice",
    price: 120,
    image: "https://source.unsplash.com/100x100/?fried-rice",
  },
  {
    id: 4,
    name: "Paneer Butter Masala",
    price: 180,
    image: "https://source.unsplash.com/100x100/?paneer",
  },
  {
    id: 5,
    name: "Chicken 65",
    price: 140,
    image: "https://source.unsplash.com/100x100/?chicken",
  },
  {
    id: 6,
    name: "Masala Dosa",
    price: 100,
    image: "https://source.unsplash.com/100x100/?dosa",
  },
  // Add more items as needed
];

export default function Items() {
  return (
    <div className="items-container">
      <h2 className="items-title">Menu Items</h2>
      <div className="items-list">
        {items.map((item) => (
          <div className="item-card" key={item.id}>
            <img src={item.image} alt={item.name} className="item-image" />
            <div className="item-info">
              <h4>{item.name}</h4>
              <p>₹{item.price}</p>
            </div>
            <button className="add-btn">+ Add</button>
          </div>
        ))}
      </div>
    </div>
  );
}