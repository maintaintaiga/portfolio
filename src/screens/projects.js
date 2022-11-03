import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import LaunchIcon from "@mui/icons-material/Launch";

import Tooltip from "../components/tooltip";
import Header from "../components/header";

const exampleProjects = [
  {
    name: "E-Commerce",
    link: "#",
    description:
      "Nunc eu tincidunt augue. Sed rhoncus ligula in molestie accumsan. Nullam quis volutpat metus. Nulla semper a tellus non eleifend. Pellentesque non tellus eget.",
    githubLink: "https://github.com/maintaintaiga/e-Commerce",
    img: "/example-project-screenshot.png",
  },
  {
    name: "Tv Guide",
    link: "#",
    description:
      "Phasellus sed nunc nec velit lacinia rutrum. Fusce consectetur, felis quis sodales euismod, justo velit sodales turpis, nec commodo velit mauris ac diam.",
    githubLink: "https://github.com/maintaintaiga/tvGuide",
    img: "/example-project-screenshot.png",
  },
  {
    name: "Blog",
    link: "#",
    description:
      "Nullam pharetra nunc magna, at sodales eros feugiat nec. Aliquam elementum arcu vitae sapien viverra volutpat.",
    githubLink: "https://github.com/maintaintaiga/blog",
    img: "/example-project-screenshot.png",
  },
];

export const Projects = () => {
  return (
    <Stack spacing={3}>
      <Header title="Projects" />
      <Box>
        <Grid container spacing={2}>
          {exampleProjects.map((el) => (
            <Grid key={el.name} item xs={12} sm={6} md={4} lg={3}>
              <Card elevation={0} raised sx={{ border: "2px solid" }}>
                <CardMedia component="img" image={el.img} alt="projectimage" />
                <CardContent sx={{ p: 1 }}>
                  <Typography gutterBottom variant="h5" component="div">
                    {el.name}
                  </Typography>
                  <Tooltip title={el.description}>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        display:
                          "-webkit-box;-webkit-line-clamp: 2;line-clamp: 2;-webkit-box-orient: vertical;",
                      }}
                    >
                      {el.description}
                    </Typography>
                  </Tooltip>
                </CardContent>
                <CardActions sx={{ py: 0 }}>
                  <IconButton href={el.githubLink} target="_blank">
                    <GitHubIcon />
                  </IconButton>
                  <IconButton href={el.link} target="_blank">
                    <LaunchIcon />
                  </IconButton>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Stack>
  );
};
