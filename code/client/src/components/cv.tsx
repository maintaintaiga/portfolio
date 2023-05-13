import {
  Box,
  List,
  ListItem,
  ListItemText,
  Stack,
  Typography,
  Grid,
} from "@mui/material";
import { ReactNode, useEffect, useState } from "react";

import { htmlToPdf } from "../utils/convertHtmlToPdf";
import { ApiAxios } from "../utils/customAxios";
import { useNavProps } from "../utils/useNavProps";

const showAdditional = true;
const isGeneral = false;
const generalSize = [260, 250];
//todo: fix size for not general.

const errorProps = {
  open: true,
  severity: "error",
  message: "There was a problem with your request",
};

type DataProps = {
  about: string[] | string;
  aboutGeneral: string[] | string;
  interests: string[];
  skills: SkillsProps[];
  skillsGeneral: SkillsProps[];
  courses: CoursesProps[];
  experience: TimelineProps[];
  projects: TimelineProps[];
  additionalExperience?: TimelineProps[];
  education: TimelineProps[];
};

type SkillsProps = {
  label: string;
  skills?: string;
};

type CoursesProps = {
  label: string;
  description: string;
  general?: boolean;
};

type TimelineProps = {
  label: string;
  date: string;
  location?: string;
  description: string;
  descriptionGeneral: string;
};

type SectionProps = {
  title: ReactNode;
  children: ReactNode;
};

const Section = ({ title, children }: SectionProps): JSX.Element => (
  <Stack spacing={1} sx={{ pl: 2, pr: 2, pt: 1, pb: 1 }}>
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
      htmlToPdf(["cv1", "cv2"], isGeneral ? generalSize : undefined);
    }
  }, [data]);

  const summary = (about: string | string[]): JSX.Element => (
    <Stack spacing={1} sx={{ m: 2, p: 2, bgcolor: "#e3dbce" }}>
      <Typography variant="h5" sx={{ color: "#4e4a43", fontWeight: 800 }}>
        Kate Ramshaw
      </Typography>
      {!isGeneral ? (
        <Typography color="textSecondary" sx={{ fontWeight: "bold" }}>
          Web Developer | {process.env.REACT_APP_PORTFOLIO_URL}
        </Typography>
      ) : null}
      {about && Array.isArray(about) ? (
        about.map((el, i) => (
          <Typography key={i} variant="body2">
            {el}
          </Typography>
        ))
      ) : (
        <Typography variant="body2">{about}</Typography>
      )}
    </Stack>
  );

  const skillList = (
    <List disablePadding dense={isGeneral}>
      {data?.skills
        ? data.skills.map((el) => (
            <ListItem key={el.label} disablePadding>
              <ListItemText
                primaryTypographyProps={{
                  fontStyle: "italic",
                  fontWeight: 500,
                }}
                primary={el.label}
                secondary={el.skills ?? ""}
              />
            </ListItem>
          ))
        : null}
    </List>
  );

  const skillsGeneral = (
    <Grid container spacing={1}>
      {data?.skillsGeneral
        ? data?.skillsGeneral.map((el) => (
            <Grid item key={el.label} xs={6}>
              <Typography
                sx={{ fontStyle: "italic", fontWeight: 500, fontSize: 14 }}
              >
                {el.label}
              </Typography>
            </Grid>
          ))
        : null}
    </Grid>
  );

  const courseList = (
    <List disablePadding>
      {data?.courses
        ? data.courses
            .filter((el) => (isGeneral ? el.general : el))
            .map((el) => (
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
              <Typography color="textSecondary" sx={{ fontSize: 14 }}>
                {el.location}
              </Typography>
            ) : null}
            <Typography variant="body2">
              {isGeneral && el.descriptionGeneral
                ? el.descriptionGeneral
                : el.description}
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

  const projects = timeline(data?.projects);

  const interests = (
    <Typography>
      {data?.interests ? data.interests.join(", ") : null}
    </Typography>
  );

  const interestsGeneral = (
    <Grid container spacing={1}>
      {data?.interests
        ? data?.interests.map((el) => (
            <Grid item key={el} xs={6}>
              <Typography
                sx={{ fontStyle: "italic", fontWeight: 500, fontSize: 14 }}
              >
                {el}
              </Typography>
            </Grid>
          ))
        : null}
    </Grid>
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
        {summary(
          isGeneral && data ? data.aboutGeneral : data ? data.about : ""
        )}
        <Section title="Skills">
          {isGeneral ? skillsGeneral : skillList}
        </Section>
        {isGeneral ? <Section title="Experience">{employment}</Section> : null}
      </div>
      <div id="cv2">
        {!isGeneral ? <Section title="Experience">{employment}</Section> : null}
        {isGeneral ? <Section title="Projects">{projects}</Section> : null}
        <Section title="Education">{educationData}</Section>
        <Section title="Courses">{courseList}</Section>
        <Section title="Interests">
          {isGeneral ? interestsGeneral : interests}
        </Section>
        <Section title="References">{references}</Section>
      </div>
    </Box>
  );
};
