import { Box, Chip, Typography, Grid } from "@mui/material";
import Header from "../components/header";
import { generateShades } from "../utils/generateShades";
import { Kevin } from "../components/kevin";

import type { JSX } from "react";

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
    <Box sx={{ mt: 12 }}>
      <Grid
        container
        sx={{
          alignItems: "center",
        }}
      >
        <Grid size={6} sx={{ mt: 5, mb: 10 }}>
          <Header title="Hello," noColor />
          <Typography
            variant="h4"
            color="textSecondary"
            sx={{ mt: 3, fontWeight: 300 }}
          >
            I'm a full stack web developer with a passion for creating beautiful
            and functional websites. I have experience working with a variety of
            technologies and am always eager to learn new skills and take on new
            challenges.
          </Typography>
        </Grid>
      </Grid>
      <Kevin />
      <Box sx={{ mt: 5 }}>
        <Typography variant="h5" color="textSecondary" sx={{ mb: 3 }}>
          Skills
        </Typography>
        <Grid container spacing={3}>
          {feskills.map((el) => (
            <Grid key={el}>
              <Chip
                sx={{
                  fontWeight: 700,
                  p: 1,
                  bgcolor: (theme) =>
                    generateShades(theme.palette.primary.main, 30),
                }}
                label={el}
              />
            </Grid>
          ))}
        </Grid>
        <Grid container spacing={3} sx={{ mt: 1 }}>
          {beskills.map((el) => (
            <Grid key={el}>
              <Chip
                sx={{
                  fontWeight: 700,
                  p: 1,
                  bgcolor: (theme) =>
                    generateShades(theme.palette.primary.main, 30),
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
