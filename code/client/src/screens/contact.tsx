import { ChangeEvent, useEffect, useState } from "react";
import { Stack, Paper, Button } from "@mui/material";

import FormControl from "../components/formControl";
import Header from "../components/header";
import { ApiAxios } from "../utils/customAxios";
import { useNavProps } from "../utils/useNavProps";

type FormProps = {
  name: string;
  email: string;
  message: string;
};

const successProps = {
  open: true,
  severity: "success",
  message: "Successfuly Sent Message",
};
const errorProps = {
  open: true,
  severity: "error",
  message: "There was a problem with your request",
};
const initialData = { name: "", email: "", message: "" };

export const Contact = (): JSX.Element => {
  const [formData, setFormData] = useState<FormProps>(initialData);
  const [formError, setFormError] = useState<FormProps>(initialData);
  const [setSnackbarProps, setIsLoading] = useNavProps();
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const formHeight = windowSize.height - 300;

  useEffect(() => {
    // Handler to call on window resize
    function handleResize(): void {
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

  const handleUpdateForm = (e: ChangeEvent<HTMLInputElement>): void => {
    const localData = { ...formData };
    const { name, value } = e.target;
    localData[name as keyof FormProps] = value;
    setFormData(localData);
  };

  const checkFormData = (): void => {
    try {
      const localErrors: FormProps = { ...initialData };
      const localFormData = { ...formData };
      Object.entries(localFormData).forEach((el) => {
        localErrors[el[0] as keyof FormProps] =
          el[1].length < 1 ? `The ${el[0]} field can't be empty` : "";
      });
      if (Object.values(localErrors).every((el) => el.length === 0)) {
        setFormError(localErrors);
        handleSendForm();
      } else {
        setFormError(localErrors);
      }
    } catch (err) {
      console.log(err);
      setSnackbarProps({ ...errorProps });
    }
  };

  const handleSendForm = async (): Promise<void> => {
    setIsLoading(true);
    try {
      const initCsrf = await ApiAxios.get("/csrf-init");
      if (initCsrf) {
        const res = await ApiAxios.post("/contact", formData).catch((err) => {
          console.error(err);
          setSnackbarProps({ ...errorProps });
        });
        if (res && res.status === 201) {
          setSnackbarProps({ ...successProps });
          setFormData(initialData);
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
          height: { xs: "auto", sm: formHeight },
          overflow: "auto",
        }}
      >
        <Stack spacing={2} sx={{ height: "100%" }}>
          {Object.keys(initialData).map((el) => (
            <FormControl
              key={el}
              label={el}
              value={formData ? formData[el as keyof FormProps] : ""}
              onChange={handleUpdateForm}
              multiline={el === "message"}
              error={Boolean(
                formError ? formError[el as keyof FormProps] : false
              )}
              helperText={formError ? formError[el as keyof FormProps] : ""}
            />
          ))}
        </Stack>
      </Paper>
      <Button onClick={checkFormData} color="inherit" variant="outlined">
        Submit
      </Button>
    </Stack>
  );
};
