import React, { useContext, useState } from "react";
import { makeStyles, useTheme, withStyles } from "@material-ui/core/styles";
import {
  Card,
  Paper,
  CardContent,
  Typography,
  CardActions,
  Button,
  Divider,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  CardActionArea,
  Box,
  TextField,
  Input,
  IconButton,
  InputAdornment,
  FormControl,
  InputLabel,
  Tooltip,
} from "@material-ui/core";
import clsx from "clsx";
import { ExpandMore } from "@material-ui/icons";
import { config } from "../../config";
import { Visibility, VisibilityOff } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingBottom: theme.spacing(2),
  },
  paper: {
    padding: theme.spacing(3),
    // minWidth: "500px",
    width: "100%",
  },
  card: {
    paddingBottom: theme.spacing(3),
  },
}));
export default function SecurityView() {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);
  const [isEditCatagory, setIsEditCatagory] = useState(false);
  const [values, setValues] = React.useState({
    email: "",
    password: "",
    showPassword: false,
  });
  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };
  const handleAccordion = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  const handleSubmit = (prop) => (event) => {
    setIsEditCatagory(false);
    // setUserDetails({ ...userDetails, [prop]: event.target.value });
  };
  return (
    <div>
      <form className={classes.root} noValidate autoComplete="on">
        <Paper className={classes.paper}>
          {config.securitySettings.catagories.map((d, i) => (
            <div className={classes.card}>
              <Card variant="outlined">
                <CardContent>
                  <Typography variant="h5" component="h2">
                    {d.title}
                  </Typography>
                  <Typography color="textSecondary">{d.subTitle}</Typography>
                  <Typography variant="body2" component="p">
                    {d.description}
                  </Typography>
                </CardContent>
                {d.subCatagories.map((sc, isc) => (
                  <Accordion
                    expanded={expanded === `panel${i}-${isc}`}
                    onChange={handleAccordion(`panel${i}-${isc}`)}
                  >
                    <Tooltip title={sc.description} arrow>
                      <AccordionSummary
                        expandIcon={<ExpandMore />}
                        aria-controls="panel1bh-content"
                        id="panel1bh-header"
                      >
                        <Typography className={classes.heading}>
                          {sc.title}
                        </Typography>
                      </AccordionSummary>
                    </Tooltip>
                    <AccordionDetails>
                      <Box>
                        {sc.fields.map((f, d) =>
                        <div>
                          {!f.isPassword ? (
                            <TextField
                              id={f.id}
                              label={f.label}
                              className={clsx(
                                classes.margin,
                                classes.textField
                              )}
                              value={values[d.key]}
                              onChange={handleChange(f.label)}
                              fullWidth
                            />
                          ) : (
                            <FormControl
                              fullWidth
                              className={clsx(
                                classes.margin,
                                classes.textField
                              )}
                            >
                              <InputLabel htmlFor="standard-adornment-password">
                                {f.label}
                              </InputLabel>
                              <Input
                                id={f.id}
                                type={values.showPassword ? f.type : f.id}
                                value={values.password}
                                onChange={handleChange(f.id)}
                                endAdornment={
                                  <InputAdornment position="end">
                                    <IconButton
                                      aria-label="toggle password visibility"
                                      onClick={handleClickShowPassword}
                                      onMouseDown={handleMouseDownPassword}
                                    >
                                      {values.showPassword ? (
                                        <Visibility />
                                      ) : (
                                        <VisibilityOff />
                                      )}
                                    </IconButton>
                                  </InputAdornment>
                                }
                              />
                            </FormControl>
                          )}
                        </div>
                        )}
                      </Box>
                      <CardActions>
                        <Box flexDirection="column">
                          {sc.actions.map((a, ia) => (
                            <Button
                              onClick={handleSubmit()}
                              variant="contained"
                              color="primary"
                            >
                              {" "}
                              {a.title}
                            </Button>
                          ))}
                        </Box>
                      </CardActions>
                    </AccordionDetails>
                  </Accordion>
                ))}
              </Card>
            </div>
          ))}
        </Paper>
      </form>
    </div>
  );
}
