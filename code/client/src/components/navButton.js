import Button from "@mui/material/Button";
import { Link as RouterLink } from "react-router-dom";

export default function NavButton({ label = "", url = "" }) {
  return (
    <Button
      sx={{
        color: (theme) => (theme.palette.mode === "dark" ? "white" : "black"),
        "&:hover": {
          m: 1,
          border: 1,
          fontSize: 15,
        },
      }}
      to={url}
      component={RouterLink}
    >
      {label}
    </Button>
  );
}
