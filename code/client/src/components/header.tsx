import { Typography } from "@mui/material";

type HeaderProps = {
  title: string | undefined;
  large?: boolean | undefined;
  noColor?: boolean | undefined;
};

export default function Header({
  title,
  large,
  noColor,
}: HeaderProps): JSX.Element {
  return (
    <Typography
      sx={{
        fontSize: { xs: "2.5rem", sm: large ? "6rem" : "5rem" },
      }}
      variant="h1"
      color={noColor ? "default" : "primary.main"}
    >
      {title ? title : ""}
    </Typography>
  );
}
