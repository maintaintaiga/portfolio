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

type CarouselProps = {
  images: string[];
};

export const Carousel = ({ images }: CarouselProps): JSX.Element => {
  const [active, setActive] = useState(0);
  const [open, setOpen] = useState(false);

  const stepper = (
    <MobileStepper
      position="static"
      sx={{ bgcolor: "inherit", p: 0 }}
      steps={images.length}
      activeStep={active}
      backButton={
        <IconButton
          size="small"
          onClick={(): void =>
            setActive((prev) => (prev === 0 ? images.length - 1 : prev - 1))
          }
        >
          <KeyboardArrowLeft />
        </IconButton>
      }
      nextButton={
        <IconButton
          size="small"
          onClick={(): void =>
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
              <IconButton
                onClick={(): void => setOpen(true)}
                sx={{ color: "white" }}
              >
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
        onClose={(): void => setOpen(false)}
        fullWidth
        maxWidth="md"
      >
        <img alt="screenshot" src={images[active]} />
        {stepper}
        <DialogActions>
          <Button
            variant="contained"
            color="info"
            onClick={(): void => setOpen(false)}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
