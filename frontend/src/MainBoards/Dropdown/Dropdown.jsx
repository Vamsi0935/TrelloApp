import React, { useEffect, useRef } from "react";
import "./dropdown.css";

function Dropdown({ onClose, className = "", children }) {
  const dropdownRef = useRef(null);

  const handleClick = (event) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target) &&
      onClose
    ) {
      onClose();
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onClose]);

  return (
    <div ref={dropdownRef} className={`dropdown custom-scroll ${className}`}>
      {children}
    </div>
  );
}

export default Dropdown;
