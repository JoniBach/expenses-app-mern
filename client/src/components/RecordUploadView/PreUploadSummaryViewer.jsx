import { UploadContext } from "../../contexts/UploadContext";
import React, { useContext } from "react";
import { Typography, Box, Grid } from "@material-ui/core";

export default function PreUploadSummaryViewer() {
  const [uploadData] = useContext(UploadContext);
  return (
    <div>
      <Grid item>
        <Box fontWeight="fontWeightBold" fontSize={30}>
          {uploadData.storeName}
        </Box>
      </Grid>
      <Grid item xs={12} sm container>
        <Grid item xs container direction="column" spacing={2}>
          <Grid item xs>
            <Box fontWeight="fontWeightBold" fontSize={20}>
              <Typography color="primary">£{uploadData.totalAmount}</Typography>
            </Box>
            <Typography variant="body2" color="textSecondary">
              <Box>{uploadData.processedText}</Box>
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}
