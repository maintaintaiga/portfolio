import { Box, Chip, Typography, Grid } from "@mui/material";
import Header from "../components/header";

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
