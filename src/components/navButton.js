import Button from "@mui/material/Button";
import { Link as RouterLink } from "react-router-dom";

export default function NavButton({ label = "", url = "" }) {
  return (
    <Button
      sx={{
        color: (theme) => (theme.palette.mode === "dark" ? "white" : "black"),
      }}
      to={url}
      component={RouterLink}
    >
      {label}
    </Button>
  );
}
