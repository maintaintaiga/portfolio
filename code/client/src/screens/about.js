import { useOutletContext, Link } from "react-router-dom";
import { Button, Stack, Typography } from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";

import Header from "../components/header";
import { ApiAxios } from "../utils/customAxios";
import { about } from "../utils/cvInfo";

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
      <Typography>{about}</Typography>
      <Button
        variant="outlined"
        color="inherit"
        to="cv"
        target="_blank"
        LinkComponent={Link}
      >
        Cv
      </Button>
    </Stack>
  );
};
