import { Typography } from "@mui/material";

export default function Header({ title }) {
  return (
    <Typography
      sx={{ fontSize: "5rem", fontWeight: 400 }}
      variant="h1"
      color="primary.main"
    >
      {title ? title : ""}
    </Typography>
  );
}
