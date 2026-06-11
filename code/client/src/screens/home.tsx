import { Box, Chip, Typography, Grid } from "@mui/material";
import Header from "../components/header";
import { generateShades } from "../utils/generateShades";

const feskills = [
  "Responsive Design",
  "html",
  "css",
  "Tailwind CSS",
  "Javascript",
  "React",
  "Vue.JS",
  "BDD",
  "Figma",
];

const beskills = [
  "REST",
  "Node.JS",
  "Ansible",
  "Git",
  "MongoDB",
  "MySQL",
  "PHP",
  "Laravel",
  "AWS",
  "Plesk",
  "Linux",
];

export const Home = (): JSX.Element => {
  return (
    <Box>
      <Header title="Front End" large noColor />
      <Header title="Developer" large noColor />
      <Typography
        variant="h4"
        sx={{ fontSize: { xs: "1.5rem", sm: "2.125rem" } }}
        color="textSecondary"
      >
        {"Kate Ramshaw"}
      </Typography>
      <Box sx={{ mt: 5 }}>
        <Grid container spacing={3}>
          {feskills.map((el) => (
            <Grid item key={el}>
              <Chip
                sx={{
                  fontWeight: 700,
                  p: 1,
                  bgcolor: (theme) =>
                    generateShades(theme.palette.secondary.main, 30),
                }}
                label={el}
              />
            </Grid>
          ))}
        </Grid>
        <Grid container spacing={3} sx={{ mt: 1 }}>
          {beskills.map((el) => (
            <Grid item key={el}>
              <Chip
                sx={{
                  fontWeight: 700,
                  p: 1,
                  bgcolor: (theme) =>
                    generateShades(theme.palette.secondary.main, 30),
                }}
                label={el}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};
