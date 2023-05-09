import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button, Skeleton, Stack, Typography } from "@mui/material";

import Header from "../components/header";
import { ApiAxios } from "../utils/customAxios";
import { useNavProps } from "../utils/useNavProps";

const errorProps = {
  open: true,
  severity: "error",
  message: "There was a problem with your request",
};

const MyLink = (): JSX.Element => <Link to="/cv" target="_blank" />;

export const About = (): JSX.Element => {
  const [setSnackbarProps, setIsLoading] = useNavProps();
  const [data, setData] = useState<string[] | string | null>([]);

  useEffect(() => {
    const getData = async (): Promise<void> => {
      setIsLoading(true);
      const res = await ApiAxios.get("/cv/about").catch((err) => {
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
      {data && Array.isArray(data) && data.length > 0 ? (
        data.map((el, i) => <Typography key={i}>{el}</Typography>)
      ) : data && typeof data === "string" ? (
        <Typography>{data}</Typography>
      ) : (
        <>
          <Skeleton
            variant="rectangular"
            animation="wave"
            sx={{ height: 80 }}
          />
          <Skeleton
            variant="rectangular"
            animation="wave"
            sx={{ height: 120 }}
          />
        </>
      )}
      <Button color="inherit" variant="outlined" LinkComponent={MyLink}>
        Download Cv
      </Button>
    </Stack>
  );
};
