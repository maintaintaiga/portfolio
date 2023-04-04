import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { Stack, Paper, Fab } from "@mui/material";

import FormControl from "../components/formControl";
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
const initialData = { name: "", email: "", message: "" };

export const Contact = () => {
  const [formData, setFormData] = useState(initialData);
  const [setSnackbarProps, setIsLoading] = useOutletContext();
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  let formHeight = windowSize.height - 300;

  useEffect(() => {
    // Handler to call on window resize
    function handleResize() {
      // Set window width/height to state
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    // Add event listener
    window.addEventListener("resize", handleResize);
    // Call handler right away so state gets updated with initial window size
    handleResize();
    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleUpdateForm = (e) => {
    let localData = { ...formData };
    localData[e.target.name] = e.target.value;
    setFormData(localData);
  };

  const handleSendForm = async () => {
    setIsLoading(true);
    try {
      let initCsrf = await ApiAxios.get("/csrf-init");
      if (initCsrf) {
        let res = await ApiAxios.post("/contact", formData).catch((err) => {
          console.error(err);
          setSnackbarProps({ ...errorProps });
        });
        if (res && res.status === 201) {
          setSnackbarProps({ ...successProps });
        } else {
          setSnackbarProps({ ...errorProps });
        }
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
      <Header title="Contact" />
      <Paper
        elevation={0}
        sx={{
          border: "8px solid",
          borderColor: (theme) =>
            theme.palette.mode === "dark" ? "#424242" : "#ffdfac",
          bgcolor: (theme) =>
            theme.palette.mode === "dark" ? "#3e3b35" : "#ffd289",
          p: 2,
          width: "100%",
          height: formHeight,
          overflow: "auto",
        }}
      >
        <Stack spacing={2} sx={{ height: "100%" }}>
          {Object.keys(initialData).map((el) => (
            <FormControl
              key={el}
              label={el}
              value={formData[el]}
              onChange={handleUpdateForm}
              multiline={el === "message"}
            />
          ))}
        </Stack>
      </Paper>
      <Fab
        onClick={handleSendForm}
        color="inherit"
        variant="extended"
        sx={{
          bgcolor: "transparent",
          borderRadius: 1,
          boxShadow: "none",
          border: 1,
          margin: 1,
        }}
      >
        Submit
      </Fab>
    </Stack>
  );
};
