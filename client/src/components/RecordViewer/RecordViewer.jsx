import React, { useState, useEffect } from "react";
import {
  Typography,
  Card,
  Box,
  LinearProgress,
  Grid,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  card: {
    padding: theme.spacing(2),
  },
  media: {
    height: 140,
  },
  grid: {
    flexGrow: 1,
  },
}));

export default function ReceiptView() {
  const classes = useStyles();
  const useFetch = (url) => {
    const [data, setData] = useState([]);
    const [loaded, setLoaded] = useState(false);
    async function fetchURL() {
      const response = await fetch(url).then(function (response) {
        return response.json();
      });
      setData(response);
      setLoaded(true);
    }
    useEffect(() => {
      fetchURL();
    }, []);
    return [data];
  };
  const fetchRecieptData = useFetch("http://localhost:4000/api");
  const receiptData = fetchRecieptData[0].users;
  return (
      <Box my={3} mx={1}>
        {receiptData === undefined ? (
          <Card>
            <Typography>Loading Receipts</Typography>
            <LinearProgress />
          </Card>
        ) : (
          <Grid container spacing={2} className={classes.grid}>
            {receiptData.map((d, i) => (
              <Grid item xs={4}>
                <Card className={classes.card}>
                  <Typography gutterBottom variant="h5" component="h2">
                    Record {i}
                  </Typography>
                  <Typography gutterBottom variant="body1" component="h2">
                  Argos
                  </Typography>
                  <Typography gutterBottom variant="body2" component="h2">
                  £50
                  </Typography>
                </Card>
                <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="shopping-list-drop-down"
                    id="shopping-list-drop-down"
                  >
                    <Typography className={classes.heading}>List</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>{d.receiptTxt}</Typography>
                  </AccordionDetails>
                </Accordion>
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
  );
}
