import { useOutletContext } from "react-router-dom";
import { Button, Stack, Typography } from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";

import Header from "../components/header";
import { ApiAxios } from "../utils/customAxios";

const successProps = {
  open: true,
  severity: "success",
  message: "Successfuly Downloaded",
};
const errorProps = {
  open: true,
  severity: "error",
  message: "There was a problem with your request",
};

export const About = () => {
  const [setSnackbarProps, setIsLoading] = useOutletContext();

  const handleDownload = async () => {
    setIsLoading(true);
    try {
      let res = await ApiAxios.get("/cv", { responseType: "blob" }).catch(
        (err) => {
          console.error(err);
          setSnackbarProps({ ...errorProps });
        }
      );
      if (res && res.status === 200) {
        const url = window.URL.createObjectURL(new Blob([res.data]));
        const link = document.createElement("a");
        link.download = "Kate-Ramshaw-Curriculum-Vitae.pdf";
        link.href = url;
        link.target = "_self";
        document.body.appendChild(link);
        link.click();
        link.remove();
        window.URL.revokeObjectURL(url);
        setSnackbarProps({ ...successProps });
      } else {
        setSnackbarProps({ ...errorProps });
      }
    } catch (err) {
      console.error(err);
      setSnackbarProps({ ...errorProps });
    }
    setIsLoading(false);
  };

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
      <Button variant="outlined" color="inherit" onClick={handleDownload}>
        Download CV <DownloadIcon sx={{ ml: 1 }} />
      </Button>
    </Stack>
  );
};
