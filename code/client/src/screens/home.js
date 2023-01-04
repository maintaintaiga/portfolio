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
      <Box
        sx={{
          mt: 4,
          mb: 4,
          bgcolor: (theme) => theme.palette.primary.light,
          transform: "skewX(20deg)",
          width: "100%",
          height: 20,
        }}
      />
      <Box sx={{ p: 4, mt: 4 }}>
        <Grid container spacing={3}>
          {skills.map((el) => (
            <Grid item key={el}>
              <Chip color="secondary" label={el} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};
