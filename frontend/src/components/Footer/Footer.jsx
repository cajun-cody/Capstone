import React, { useState, useEffect } from "react";
import "./Footer.css";


//Function to hide footer while scrolling. Need to fix to also hide as to not cover screen content. 
const Footer = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY || window.pageYOffset;
      const isFooterVisible = document.body.offsetHeight > window.innerHeight + scrollY;
      setIsVisible(isFooterVisible);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <footer id="my-footer" style={{ display: isVisible ? "block" : "none" }}>
      <p><i></i></p>{" "}
    </footer>
  );
};

export default Footer;
