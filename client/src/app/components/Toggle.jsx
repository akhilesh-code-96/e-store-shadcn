import React, { useState, useRef } from "react";
import { FaChevronRight, FaChevronDown } from "react-icons/fa";

const Toggle = ({ name }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleRef = useRef(null);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleBlur = (e) => {
    if (!toggleRef.current.contains(e.relatedTarget)) {
      setIsOpen(false);
    }
  };

  return (
    <button
      ref={toggleRef}
      onClick={handleToggle}
      onBlur={handleBlur}
      className="flex items-center self-start space-x-2 dark:text-neutral-300 hover:bg-transparent focus:bg-transparent active:bg-transparent"
    >
      {isOpen ? <FaChevronDown /> : <FaChevronRight />}
      <span>{name}</span>
    </button>
  );
};

export default Toggle;
