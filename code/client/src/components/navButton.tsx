import Button from "@mui/material/Button";
import { Link as RouterLink, useMatch } from "react-router-dom";

type NavButtonProps = {
  label: string;
  url: string;
};

export default function NavButton({ label, url }: NavButtonProps): JSX.Element {
  const match = useMatch(url);
  return (
    <Button
      sx={{
        color: (theme) => (theme.palette.mode === "dark" ? "white" : "black"),
        borderBottom: match ? 2 : 0,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
        "&:hover": {
          color: (theme) => theme.palette.primary.main,
          bgcolor: "transparent",
        },
      }}
      to={url}
      component={RouterLink}
    >
      {label}
    </Button>
  );
}
