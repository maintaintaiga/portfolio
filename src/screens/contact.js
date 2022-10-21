import { useState } from "react";
import { Stack, Button, Paper } from "@mui/material";

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
      <Paper
        elevation={5}
        sx={{
          border: "8px solid",
          borderColor: (theme) =>
            theme.palette.mode === "dark" ? "#424242" : "#fff8ee",
          bgcolor: (theme) =>
            theme.palette.mode === "dark" ? "#3e3b35" : "#ffd289",
          p: 2,
          width: "60%",
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
    </Stack>
  );
};
