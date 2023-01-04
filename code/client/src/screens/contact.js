import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { Stack, Button, Paper, Grid } from "@mui/material";

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

  const handleUpdateForm = (e) => {
    let localData = { ...formData };
    localData[e.target.name] = e.target.value;
    setFormData(localData);
  };

  const handleSendForm = async () => {
    setIsLoading(true);
    try {
      let res = await ApiAxios.post("/contact", formData).catch((err) => {
        console.error(err);
        setSnackbarProps({ ...errorProps });
      });
      if (res && res.status === 201) {
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
      <Header title="Contact" />
      <Grid container spacing={1}>
        <Grid item xs={12} md={6}>
          <Paper
            elevation={0}
            sx={{
              border: "8px solid",
              borderColor: (theme) =>
                theme.palette.mode === "dark" ? "#424242" : "#fff8ee",
              bgcolor: (theme) =>
                theme.palette.mode === "dark" ? "#3e3b35" : "#ffd289",
              p: 2,
            }}
          >
            <Stack spacing={2}>
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
        </Grid>
        <Grid item xs={6}>
          <Stack
            sx={{ height: "100%" }}
            alignItems="center"
            justifyContent="center"
          >
            <Button onClick={handleSendForm} variant="outlined" color="inherit">
              Submit
            </Button>
          </Stack>
        </Grid>
      </Grid>
    </Stack>
  );
};
