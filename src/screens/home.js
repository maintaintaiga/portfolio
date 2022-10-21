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
    <Box sx={{ width: "50%", my: 4 }}>
      <Typography variant="h1">Frontend</Typography>
      <Typography variant="h1">Developer</Typography>
      <Box sx={{ p: 4 }}>
        <Grid container spacing={3}>
          {skills.map((el) => (
            <Grid item key={el}>
              <Chip color="primary" label={el} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};
