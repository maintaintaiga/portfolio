import MuiTooltip, { tooltipClasses } from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";

export default function Tooltip({ children, title }) {
  const LightTooltip = styled(({ className, ...props }) => (
    <MuiTooltip {...props} classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: theme.palette.background.paper,
      color: theme.palette.mode === "dark" ? "#e0e0e0" : "#212121",
      border: "1px solid",
      borderColor: theme.palette.mode === "dark" ? "#e0e0e0" : "#212121",
      fontSize: 13,
    },
  }));
  return (
    <LightTooltip title={title} enterDelay={600} enterNextDelay={600}>
      {children}
    </LightTooltip>
  );
}
