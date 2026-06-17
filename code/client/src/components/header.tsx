import { Typography } from "@mui/material";

import type { JSX } from "react";

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
        opacity: 0.8,
        fontWeight: 700,
        fontSize: { xs: "2.5rem", sm: large ? "6rem" : "3.5rem" },
      }}
      variant="h1"
      color={noColor ? "default" : "primary.main"}
    >
      {title ? title : ""}
    </Typography>
  );
}
