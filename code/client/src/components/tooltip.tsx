import MuiTooltip, {
  tooltipClasses,
  TooltipProps,
} from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";

type CompProps = {
  children: JSX.Element;
  title: string;
};

export default function Tooltip({ children, title }: CompProps) {
  const LightTooltip = styled(({ className, ...props }: TooltipProps) => (
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
