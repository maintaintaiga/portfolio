import {
  Box,
  List,
  ListItem,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import { ReactNode, useEffect, useState } from "react";

import { htmlToPdf } from "../utils/convertHtmlToPdf";
import { ApiAxios } from "../utils/customAxios";
import { useNavProps } from "../utils/useNavProps";

const showAdditional = false;

const errorProps = {
  open: true,
  severity: "error",
  message: "There was a problem with your request",
};

type DataProps = {
  about: string[] | string;
  skills: SkillsProps[];
  courses: CoursesProps[];
  experience: TimelineProps[];
  additionalExperience?: TimelineProps[];
  education: TimelineProps[];
};

type SkillsProps = {
  label: string;
  skills: string;
};

type CoursesProps = {
  label: string;
  description: string;
};

type TimelineProps = {
  label: string;
  date: string;
  location?: string;
  description: string;
};

type SectionProps = {
  title: ReactNode;
  children: ReactNode;
};

const Section = ({ title, children }: SectionProps): JSX.Element => (
  <Stack spacing={1} sx={{ p: 2 }}>
    <Typography sx={{ bgcolor: "#e3dbce", pl: 1 }} variant="h6" gutterBottom>
      {title}
    </Typography>
    {children}
  </Stack>
);

export const CVDocument = (): JSX.Element => {
  const [setSnackbarProps, setIsLoading] = useNavProps();
  const [data, setData] = useState<DataProps | null>(null);

  useEffect(() => {
    const getData = async (): Promise<void> => {
      setIsLoading(true);
      const res = await ApiAxios.get("/cv").catch((err) => {
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

  const summary = (
    <Stack spacing={1} sx={{ m: 2, p: 2, bgcolor: "#e3dbce" }}>
      <Typography variant="h5" sx={{ color: "#4e4a43", fontWeight: 800 }}>
        Kate Ramshaw
      </Typography>
      <Typography color="textSecondary" sx={{ fontWeight: "bold" }}>
        Web Developer | {process.env.REACT_APP_PORTFOLIO_URL}
      </Typography>
      {data && Array.isArray(data?.about) ? (
        data.about.map((el, i) => (
          <Typography key={i} variant="body2">
            {el}
          </Typography>
        ))
      ) : (
        <Typography variant="body2">{data?.about}</Typography>
      )}
    </Stack>
  );

  const skillList = (
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

  const courseList = (
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

  const timeline = (data: TimelineProps[] | undefined): ReactNode =>
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

  const employment = timeline(
    showAdditional && data && data.additionalExperience
      ? data.experience.concat(data.additionalExperience)
      : data
      ? data?.experience
      : []
  );

  const educationData = timeline(data?.education);

  const interests = (
    <Typography>
      Baking, Music, Yoga, Fitness, Photography, Travel, Piano, Languages, Video
      Gaming
    </Typography>
  );

  const references = <Typography>Available upon request</Typography>;

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
