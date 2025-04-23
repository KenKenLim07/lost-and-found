// src/animations/variants.jsx

// Backdrop fade for modals
export const backdropVariant = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  };
  
  // Image pop-in effect
  export const imageVariant = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 120,
        damping: 20,
      },
    },
    exit: { scale: 0.8, opacity: 0 },
  };
  
  // Fade and scale in/out for dropdowns or popups
  export const fadeScale = {
    hidden: {
      opacity: 0,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.3,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      transition: {
        duration: 0.2,
      },
    },
  };
  
  // Staggered burger line appearance
  export const burgerStagger = (i) => ({
    hidden: { opacity: 0, y: -10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, type: "spring", stiffness: 300 },
    },
  });
  
  // Burger icon toggle animation
  export const burgerTop = (menuOpen) => ({
    rotate: menuOpen ? 45 : 0,
    y: menuOpen ? 10 : 0,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 25,
    },
  });
  
  export const burgerMiddle = (menuOpen) => ({
    opacity: menuOpen ? 0 : 1,
    transition: {
      duration: 0.2,
    },
  });
  
  export const burgerBottom = (menuOpen) => ({
    rotate: menuOpen ? -45 : 0,
    y: menuOpen ? -5 : 0,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 25,
    },
  });
  
  // Dropdown fade-slide
  export const dropdownVariant = {
    hidden: { opacity: 0, y: -5 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -5 },
  };
  
  export const spring = {
    type: "spring",
    stiffness: 500,
    damping: 30,
  };
  