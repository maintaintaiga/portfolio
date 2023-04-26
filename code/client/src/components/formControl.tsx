import { TextField } from "@mui/material";
import { ChangeEvent } from "react";

type CompProps = {
  label: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  multiline?: boolean;
  error?: boolean;
  helperText?: string;
};

export default function FormControl({
  label,
  value,
  onChange,
  multiline,
  error,
  helperText,
}: CompProps): JSX.Element {
  return (
    <TextField
      label={label}
      value={value}
      name={label}
      onChange={onChange}
      fullWidth
      multiline={multiline}
      minRows={4}
      error={error}
      helperText={helperText}
    />
  );
}
