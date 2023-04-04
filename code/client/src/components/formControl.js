import { TextField } from "@mui/material";

export default function FormControl({ label, value, onChange, multiline }) {
  return (
    <TextField
      label={label}
      value={value}
      name={label}
      onChange={onChange}
      fullWidth
      multiline={multiline}
      minRows={4}
    />
  );
}
