import {
  MobileStepper,
  IconButton,
  ImageListItem,
  ImageListItemBar,
  ImageList,
  Dialog,
  DialogActions,
  Button,
} from "@mui/material";
import { useState } from "react";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import { Fullscreen } from "@mui/icons-material";

export const Carousel = ({ images }) => {
  const [active, setActive] = useState(0);
  const [open, setOpen] = useState(false);

  let stepper = (
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
  );

  return (
    <>
      <ImageList sx={{ height: 250, m: 0 }} cols={1} gap={0}>
        <ImageListItem>
          <img alt="screenshot" src={images[active]} />
          <ImageListItemBar
            sx={{
              background:
                "linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, " +
                "rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)",
            }}
            title=""
            position="top"
            actionIcon={
              <IconButton onClick={() => setOpen(true)} sx={{ color: "white" }}>
                <Fullscreen />
              </IconButton>
            }
            actionPosition="right"
          />
        </ImageListItem>
      </ImageList>
      {stepper}
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        fullWidth
        maxWidth="md"
      >
        <img alt="screenshot" src={images[active]} />
        {stepper}
        <DialogActions>
          <Button
            variant="contained"
            color="info"
            onClick={() => setOpen(false)}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
