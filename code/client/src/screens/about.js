import { useState, useEffect } from "react";
import { Link, useOutletContext } from "react-router-dom";
import { Button, Stack, Typography } from "@mui/material";

import Header from "../components/header";
import { ApiAxios } from "../utils/customAxios";

const errorProps = {
  open: true,
  severity: "error",
  message: "There was a problem with your request",
};

export const About = () => {
  const [setSnackbarProps, setIsLoading] = useOutletContext();
  const [data, setData] = useState(null);

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);
      let res = await ApiAxios.get("/cv/about").catch((err) => {
        console.error(err);
        setSnackbarProps({ ...errorProps });
      });
      if (res && res.status === 200) {
        setData(res.data);
      } else {
        setData(null);
        setSnackbarProps({ ...errorProps });
      }
      setIsLoading(false);
    };
    getData();
  }, [setIsLoading, setSnackbarProps]);

  return (
    <Stack spacing={3}>
      <Header title="About" />
      {Array.isArray(data) ? (
        data.map((el, i) => <Typography key={i}>{el}</Typography>)
      ) : (
        <Typography>{data}</Typography>
      )}
      <Button
        variant="outlined"
        color="inherit"
        to="/cv"
        target="_blank"
        LinkComponent={Link}
      >
        Download Cv
      </Button>
    </Stack>
  );
};
