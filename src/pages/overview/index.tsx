import { Box, CircularProgress, Grid, Paper } from "@mui/material";
import { useGetLeadPerSourceQuery } from "../../redux/api/leadApi";
import { makeStyles } from "@mui/styles";
import CustomBarCharts from "../../components/CustomBarChart";

export default function Overview() {
  const styles = useStyles();

  const {
    data: leadsPerSource,
    isLoading: queryLoading,
    isFetching: queryFetching,
  } = useGetLeadPerSourceQuery("");
  console.log("leadsPerSource", leadsPerSource);

  return (
    <>
      {queryLoading ? (
        <Box
          sx={{
            display: "flex",
            height: "85vh",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <Grid
          container
          spacing={2}
          rowSpacing={3}
          sx={{ paddingBlock: "10px" }}
        >
          <Grid item xs={6}>
            <Paper variant="outlined" sx={{ padding: "15px" }}>
              <Box sx={{ width: "100%", height: "400px" }}>
                <CustomBarCharts
                  title={"Lead per source"}
                  data={leadsPerSource?.data || []}
                />
              </Box>
            </Paper>
          </Grid>
        </Grid>
      )}
    </>
  );
}

const useStyles = makeStyles((theme) => ({
  formContainer: {
    padding: "10px 20px",
    display: "flex",
    columnGap: "10px",
    alignItems: "flex-start",
    "& form": {
      width: "100%",
    },
    "& .custom-input, & .custom-select": {
      marginBlock: "15px",
    },
    "& button": {
      width: "100%",
      padding: "10px",
      fontSize: "12px",
    },
  },
}));
