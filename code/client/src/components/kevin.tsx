import { useEffect, useState, type JSX } from "react";
import image from "../assets/penguin.png";

import { Box } from "@mui/material";
import ClickAwayListener from "@mui/material/ClickAwayListener";

export const Kevin = (): JSX.Element => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const t = setTimeout((): void => setOpen(false), 3000);
    return () => clearTimeout(t);
  }, [open]);

  return (
    <Box sx={{ position: "fixed", bottom: 16, right: 16, zIndex: 1000 }}>
      <ClickAwayListener onClickAway={(): void => setOpen(false)}>
        <Box>
          <Box
            component="img"
            src={image}
            alt="Kevin"
            onClick={(): void => setOpen((s) => !s)}
            sx={{
              width: "100px",
              height: "100px",
              cursor: "pointer",
              display: "block",
              borderRadius: 1
            }} />

          {open && (
            <Box
              sx={{
                position: "absolute",
                bottom: "110%",
                left: "50%",
                transform: "translateX(-50%)",
                bgcolor: "#fff9c4",
                color: "#333",
                borderRadius: "12px",
                py: 1,
                px: 2,
                boxShadow: "0 6px 18px rgba(0,0,0,0.12)",
                border: "2px solid #fbc02d",
                fontWeight: 700,
                fontSize: "14px",
                maxWidth: "160px",
                textAlign: "center",
                zIndex: 10,
              }}
            >
              Hello
              <Box
                sx={{
                  position: "absolute",
                  top: "100%",
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: 0,
                  height: 0,
                  borderLeft: "10px solid transparent",
                  borderRight: "10px solid transparent",
                  borderTop: "10px solid #fff9c4",
                }}
              />
            </Box>
          )}
        </Box>
      </ClickAwayListener>
    </Box>
  );
};
