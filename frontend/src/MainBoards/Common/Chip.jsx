import React from "react";
import "./chip.css"; 

function Chip({ item, removeLabel }) {
  const handleRemove = (event) => {
    event.stopPropagation(); 
    if (removeLabel) removeLabel(item);
  };

  return (
    <label className="chip" style={{ backgroundColor: item.color }}>
      {item.text}
      {removeLabel && (
        <span onClick={handleRemove} className="chip-remove">
          &#x2716; 
        </span>
      )}
    </label>
  );
}

export default Chip;
