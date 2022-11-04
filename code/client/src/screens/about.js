import { Fab, Stack, Typography } from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import Header from "../components/header";

export const About = () => {
  return (
    <Stack spacing={3}>
      <Header title="About" />
      <Typography>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam blandit
        tellus vitae ipsum tristique, id commodo nibh scelerisque. Donec
        pulvinar est tellus, vel efficitur massa euismod sit amet. Maecenas
        facilisis vulputate volutpat. Integer porttitor consectetur tellus,
        vitae rutrum ipsum. Ut nec ex aliquet nunc cursus pulvinar. Nulla
        pretium, eros ac molestie scelerisque, lacus diam vestibulum orci, et
        elementum mauris orci sed elit. Mauris cursus malesuada euismod. Nulla
        sed interdum metus. Suspendisse rutrum sem eu viverra ultrices. Ut ac
        malesuada massa. Cras nisi lorem, finibus et tempus a, malesuada sed
        neque. Sed in viverra urna. Suspendisse potenti. Maecenas dignissim mi
        eu rutrum sollicitudin. Curabitur eleifend est odio, eget ornare ex
        pellentesque eget.
      </Typography>
      <Fab variant="extended" sx={{ width: 300 }}>
        Download CV <DownloadIcon sx={{ ml: 1 }} />
      </Fab>
    </Stack>
  );
};
