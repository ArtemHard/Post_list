import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import style from "./buttonup.module.css";

export const ButtonUp = () => {
  const [showTopBtn, setShowTopBtn] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 400) {
        setShowTopBtn(true);
      } else {
        setShowTopBtn(false);
      }
    });
  }, []);

  const goToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className={style.topToBtm}>
      {showTopBtn && (
        <Button
          sx={{
            position: "fixed",
            bottom: "40px",
            right: "25px",
            zIndex: "20",
          }}
          variant='contained'
          onClick={goToTop}
        >
          Прокрутка вверх
        </Button>
      )}
    </div>
  );
};
