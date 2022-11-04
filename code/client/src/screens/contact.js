import { useState } from "react";
import { Stack, Button, Paper, Grid, Box } from "@mui/material";

import FormControl from "../components/formControl";
import Header from "../components/header";

const initialData = { name: "", email: "", message: "" };

export const Contact = () => {
  const [formData, setFormData] = useState(initialData);
  const handleUpdateForm = (e) => {
    let localData = { ...formData };
    localData[e.target.name] = e.target.value;
    setFormData(localData);
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
              <Button variant="outlined" color="inherit">
                Submit
              </Button>
            </Stack>
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Stack
            sx={{ height: "100%" }}
            alignItems="center"
            justifyContent="center"
          >
            <Box sx={{ width: 100, height: 100, bgcolor: "#616161" }} />
          </Stack>
        </Grid>
      </Grid>
    </Stack>
  );
};
