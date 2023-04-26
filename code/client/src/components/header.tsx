import { Typography } from "@mui/material";

type HeaderProps = {
  title: string | undefined;
};

export default function Header({ title }: HeaderProps): JSX.Element {
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
