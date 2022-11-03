import Button from "@mui/material/Button";
import { Link as RouterLink } from "react-router-dom";

export default function NavButton({ label = "", url = "" }) {
  return (
    <Button to={url} component={RouterLink}>
      {label}
    </Button>
  );
}