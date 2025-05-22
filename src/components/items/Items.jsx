import React, { useState, useEffect } from "react";
import "./Items.css";
import { toast } from "react-toastify";

export default function Items({ selectedTable, setSelectedTable }) {
  const [quantities, setQuantities] = useState({});
  const [items, setItems] = useState([]);  // <-- dynamic items state

  useEffect(() => {
    // Fetch menu items from backend on component mount
    const fetchMenuItems = async () => {
      try {
        const res = await fetch("http://localhost:8080/api/menuitems");
        if (!res.ok) {
          toast.error("Failed to fetch menu items.");
          return;
        }
        const data = await res.json();
        setItems(data);
      } catch (err) {
        toast.error("Error fetching menu items.");
      }
    };

    fetchMenuItems();
  }, []);

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
          if (matched) updatedQuantities[matched._id ] = item.quantity;
        });

        setQuantities(updatedQuantities);
      } catch (err) {
        toast.error("Error fetching table details.");
      }
    };

    fetchTableDetails();
  }, [selectedTable, setSelectedTable, items]); // <-- include items so quantities update after items load

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
        [item.id ]: result.item.quantity,
      }));
      setSelectedTable({ tableNumber: selectedTable.tableNumber });
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

      setSelectedTable({ tableNumber: selectedTable.tableNumber });
    } catch (err) {
      toast.error("Server error. Try again later.");
    }
  };

  return (
    <div className="items-container">
     <h2 className="items-title">
     Menu Items
         <span className="selected-table">
        Table: <strong>{selectedTable?.tableNumber || "None"}</strong>
      </span>
    </h2>
    <hr />
     

      <div className="items-list">
        {items.length === 0 ? (
          <p>Loading menu items...</p>
        ) : (
          items.map((item) => (
            <div className="item-card" key={item._id }>
              <img src={item.image} alt={item.name} className="item-image" />
              <div className="item-info">
                <h4>{item.name}</h4>
                <p>₹{item.price}</p>
                <p>Quantity: {quantities[item._id] || 0}</p>
              </div>
              <button className="add-btn" onClick={() => addItem(item)}>
                + Add
              </button>
              <button className="remove-btn" onClick={() => removeItem(item)}>
                Remove
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}