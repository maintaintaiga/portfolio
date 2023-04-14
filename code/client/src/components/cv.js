import {
  Box,
  List,
  ListItem,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";

import { htmlToPdf } from "../utils/convertHtmlToPdf";
import { ApiAxios } from "../utils/customAxios";

const showAdditional = false;

const errorProps = {
  open: true,
  severity: "error",
  message: "There was a problem with your request",
};

const Section = ({ title, children }) => (
  <Stack spacing={1} sx={{ p: 2 }}>
    <Typography sx={{ bgcolor: "#e3dbce", pl: 1 }} variant="h6" gutterBottom>
      {title}
    </Typography>
    {children}
  </Stack>
);

export const CVDocument = () => {
  const [setSnackbarProps, setIsLoading] = useOutletContext();
  const [data, setData] = useState(null);

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);
      let res = await ApiAxios.get("/cv").catch((err) => {
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

  useEffect(() => {
    if (data) {
      htmlToPdf(["cv1", "cv2"]);
    }
  }, [data]);

  let summary = (
    <Stack spacing={1} sx={{ m: 2, p: 2, bgcolor: "#e3dbce" }}>
      <Typography variant="h5" sx={{ color: "#4e4a43", fontWeight: 800 }}>
        Kate Ramshaw
      </Typography>
      <Typography color="textSecondary" sx={{ fontWeight: "bold" }}>
        Web Developer | {process.env.REACT_APP_PORTFOLIO_URL}
      </Typography>
      <Typography variant="body2">{data?.about}</Typography>
    </Stack>
  );

  let skillList = (
    <List disablePadding>
      {data?.skills
        ? data.skills.map((el) => (
            <ListItem key={el.label} disablePadding>
              <ListItemText
                primaryTypographyProps={{
                  fontStyle: "italic",
                  fontWeight: 500,
                }}
                primary={el.label}
                secondary={el.skills}
              />
            </ListItem>
          ))
        : null}
    </List>
  );

  let courseList = (
    <List disablePadding>
      {data?.courses
        ? data.courses.map((el) => (
            <ListItem key={el.label} disablePadding>
              <ListItemText
                primaryTypographyProps={{
                  fontStyle: "italic",
                  fontWeight: 500,
                }}
                primary={el.label}
                secondary={el.description}
              />
            </ListItem>
          ))
        : null}
    </List>
  );

  let timeline = (data) =>
    data
      ? data.map((el) => (
          <Stack key={el.label}>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography sx={{ fontStyle: "italic", fontWeight: 500 }}>
                {el.label}
              </Typography>
              <Typography color="textSecondary">{el.date}</Typography>
            </Box>
            {el.location ? (
              <Typography sx={{ fontSize: 14 }}>{el.location}</Typography>
            ) : null}
            <Typography variant="body2" color="textSecondary">
              {el.description}
            </Typography>
          </Stack>
        ))
      : null;

  let employment = timeline(
    showAdditional
      ? data?.experience.concat(data?.additionalExperience)
      : data?.experience
  );

  let educationData = timeline(data?.education);

  let interests = (
    <Typography>
      Baking, Music, Yoga, Fitness, Photography, Travel, Piano, Languages, Video
      Gaming
    </Typography>
  );

  let references = <Typography>Available upon request</Typography>;

  return (
    <Box
      sx={{
        marginLeft: "auto",
        marginRight: "auto",
        width: "210mm",
        minHeight: "297mm",
        bgcolor: (theme) => theme.palette.background.default,
      }}
    >
      <div id="cv1">
        {summary}
        <Section title="Skills">{skillList}</Section>
        <Section title="Courses">{courseList}</Section>
      </div>
      <div id="cv2">
        <Section title="Experience">{employment}</Section>
        <Section title="Education">{educationData}</Section>
        <Section title="Interests">{interests}</Section>
        <Section title="References">{references}</Section>
      </div>
    </Box>
  );
};
