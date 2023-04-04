import { Box, Chip, Typography, Grid } from "@mui/material";

const skills = [
  "React",
  "React Native",
  "Node.JS",
  "Docker",
  "Ansible",
  "Git",
  "Jira",
  "MongoDB",
  "JS",
  "HTML",
  "CSS",
];

export const Home = () => {
  return (
    <Box>
      <Typography variant="h1">{"Frontend"}</Typography>
      <Typography variant="h1">{"Developer"}</Typography>
      <Typography variant="h4" color="textSecondary">
        {"// Kate Ramshaw"}
      </Typography>
      <Box sx={{ mt: 5 }}>
        <Grid container spacing={3}>
          {skills.map((el) => (
            <Grid item key={el}>
              <Chip
                color="secondary"
                sx={{ fontWeight: 700, p: 1 }}
                label={el}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};
