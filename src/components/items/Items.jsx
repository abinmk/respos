import React, { useState, useEffect } from "react";
import "./Items.css";
import { toast } from "react-toastify";

export default function Items({ selectedTable, setSelectedTable }) {
  const [quantities, setQuantities] = useState({});

  const items = [
    { id: 1, name: "Chicken Biryani", price: 150, image: "https://media.istockphoto.com/id/2077426665/photo/selective-focus-of-one-of-the-most-popular-food-in-india-biryani.jpg?s=1024x1024&w=is&k=20&c=TrplV8CyNlyWQf0TU9yYqavs81Oq3GkCmuiVGVbgDGY=" },
    { id: 2, name: "Margherita Pizza", price: 200, image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=2881&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { id: 3, name: "Veg Fried Rice", price: 120, image: "https://media.istockphoto.com/id/2180205841/photo/stir-fried-rice-with-mushroom-and-tofu-directly-above-photo.jpg?s=1024x1024&w=is&k=20&c=MP_zUAtEZ8WvoWIhKVlq9MndiV2eaNSfPErROQeHeCI=" },
    { id: 4, name: "Paneer Butter Masala", price: 180, image: "https://media.istockphoto.com/id/1085159910/photo/malai-or-achari-paneer-in-a-gravy-made-using-red-gravy-and-green-capsicum-served-in-a-bowl.jpg?s=1024x1024&w=is&k=20&c=x-AgV0vfukGAAXVdbKVYwiI5b3a212D66gLSMk9g_cw=" },
    { id: 5, name: "Chicken 65", price: 140, image: "https://media.istockphoto.com/id/1322439549/photo/indian-chicken-fry.jpg?s=1024x1024&w=is&k=20&c=kLLH1jaWiXDYeimYL4MAMpV3GLDLNI9GF4qoQ3ogPo4=" },
    { id: 6, name: "Masala Dosa", price: 100, image: "https://images.unsplash.com/photo-1743517894265-c86ab035adef?q=80&w=2882&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
  ];

  useEffect(() => {
    // Set default table (if none selected)
    if (!selectedTable) {
      setSelectedTable({ tableNumber: 1 });
    }

    const fetchTableDetails = async () => {
      if (!selectedTable || !selectedTable.tableNumber) return;

      try {
        const res = await fetch(`http://localhost:8080/api/tabledetails/${selectedTable.tableNumber}`);
        if (!res.ok) {
          toast.error("Failed to fetch table details.");
          return;
        }

        const data = await res.json();
        const updatedQuantities = {};

        data.items.forEach((item) => {
          const matched = items.find((i) => i.name === item.itemName);
          if (matched) updatedQuantities[matched.id] = item.quantity;
        });

        setQuantities(updatedQuantities);
      } catch (err) {
        toast.error("Error fetching table details.");
      }
    };

    fetchTableDetails();
  }, [selectedTable, setSelectedTable]);

  const addItem = async (item) => {
    if (!selectedTable || !selectedTable.tableNumber)
      return toast.warn("Please select a table first.");

    try {
      const res = await fetch("http://localhost:8080/api/additem", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tableNum: selectedTable.tableNumber,
          itemName: item.name,
          price: item.price,
        }),
      });

      if (!res.ok) throw new Error("Add failed");

      const result = await res.json();
      setQuantities((prev) => ({
        ...prev,
        [item.id]: result.item.quantity,
      }));
      setSelectedTable({tableNumber:selectedTable.tableNumber});
    } catch (err) {
      toast.error("Server error. Try again later.");
    }
  };

  const removeItem = async (item) => {
    if (!selectedTable || !selectedTable.tableNumber)
      return toast.warn("Please select a table first.");

    try {
      const res = await fetch("http://localhost:8080/api/removeitem", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tableNum: selectedTable.tableNumber,
          itemName: item.name,
        }),
      });

      if (!res.ok) throw new Error("Remove failed");

      const result = await res.json();
      setQuantities((prev) => ({
        ...prev,
        [item.id]: result.item?.quantity ?? 0,
      }));

      setSelectedTable({tableNumber:selectedTable.tableNumber});
    } catch (err) {
      toast.error("Server error. Try again later.");
    }
  };

  return (
    <div className="items-container">
      <h2 className="items-title">Menu Items</h2>
      <h4>
        Selected Table:{" "}
        {selectedTable?.tableNumber ? `#${selectedTable.tableNumber}` : "None"}
      </h4>

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