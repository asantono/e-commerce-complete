import { useState, useEffect, useRef } from "react";

export default function useClickOutsideComponent(initialIsVisible) {
  const [isComponentVisible, setIsComponentVisible] = useState(
    initialIsVisible
  );
  const ref = useRef(null);

  const handleHideDropdown = (e) => {
    if (e.key === "Escape") {
      setIsComponentVisible(false);
    }
  };

  const handleClickOutside = (e) => {
    if (ref.current && !ref.current.contains(e.target)) {
      setIsComponentVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleHideDropdown);
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("keydown", handleHideDropdown);
      document.removeEventListener("click", handleClickOutside);
    };
  });

  return { ref, isComponentVisible, setIsComponentVisible };
}
