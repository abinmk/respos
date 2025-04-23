import React, { useState } from "react";
import "./Items.css";
import { toast } from "react-toastify";

export default function Items() {
  const [quantities, setQuantities] = useState({}); // { [item.id]: quantity }

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
  ];

  const addItem = async (item) => {
    try {
      const res = await fetch("http://localhost:8080/api/additem", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tableNum: 1,
          itemName: item.name,
          price: item.price,
        }),
      });

      if (res.ok) {
        const result = await res.json(); // { count: number }
        setQuantities((prev) => ({
          ...prev,
          [item.id]: result.item.quantity,
        }));
      } else {
        toast.error("Failed to add item.");
      }
    } catch (err) {
      toast.error("Server error. Try again later.");
    }
  };

  const removeItem = async (item) => {
    try {
      const res = await fetch("http://localhost:8080/api/removeitem", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tableNum: 1,
          itemName: item.name,
        }),
      });

      if (res.ok) {
        const result = await res.json(); // { count: number }
        setQuantities((prev) => ({
          ...prev,
          [item.id]: result.item.quantity,
        }));
      } else {
        toast.error("Failed to remove item.");
      }
    } catch (err) {
      toast.error("Server error. Try again later.");
    }
  };

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
              <p>Quantity: {quantities[item.id] || 0}</p>
            </div>
            <button className="add-btn" onClick={() => addItem(item)}>
              + Add
            </button>
            <button className="remove-btn" onClick={() => removeItem(item)}>
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
