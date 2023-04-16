import { MobileStepper, IconButton, CardMedia } from "@mui/material";
import { useState } from "react";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";

export const Carousel = ({ images }) => {
  const [active, setActive] = useState(0);

  return (
    <>
      <CardMedia title="" image={images[active]} sx={{ height: 250 }} />
      <MobileStepper
        position="static"
        sx={{ bgcolor: "inherit", p: 0 }}
        steps={images.length}
        activeStep={active}
        backButton={
          <IconButton
            size="small"
            onClick={() =>
              setActive((prev) => (prev === 0 ? images.length - 1 : prev - 1))
            }
          >
            <KeyboardArrowLeft />
          </IconButton>
        }
        nextButton={
          <IconButton
            size="small"
            onClick={() =>
              setActive((prev) => (prev === images.length - 1 ? 0 : prev + 1))
            }
          >
            <KeyboardArrowRight />
          </IconButton>
        }
      ></MobileStepper>
    </>
  );
};
