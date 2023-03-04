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
      <Typography variant="h1">Frontend</Typography>
      <Typography variant="h1">Developer</Typography>
      <Box
        sx={{
          mt: 6,
          mb: 6,
          bgcolor: (theme) =>
            theme.palette.mode === "dark" ? "#353535" : "#e7d4b675",
          opacity: 0.9,
          borderRadius: 30,
          width: "100%",
          height: 18,
        }}
      />
      <Box>
        <Grid container spacing={3}>
          {skills.map((el) => (
            <Grid item key={el}>
              <Chip color="secondary" variant="outlined" label={el} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};
