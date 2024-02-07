import { Box, CircularProgress, Grid, Paper } from "@mui/material";
import {
  useGetLeadPerSourceQuery,
  useGetLeadPerStatusQuery,
} from "../../redux/api/leadApi";
import { makeStyles } from "@mui/styles";
import CustomBarCharts from "../../components/CustomBarChart";
import CustomPieCharts from "../../components/CustomPieChart";

export default function Overview() {
  const { data: leadsPerSource, isLoading } = useGetLeadPerSourceQuery("");
  const { data: leadsPerStatus, isLoading: queryLoading } =
    useGetLeadPerStatusQuery("");

  const pieCharData = leadsPerStatus?.data?.map((item: any) => {
    let newObject = { name: "", status_count: 0 };
    newObject.name = item.lead_status;
    newObject.status_count = Number(item.status_count);
    return newObject;
  });

  return (
    <>
      {isLoading || queryLoading ? (
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

          <Grid item xs={6}>
            <Paper variant="outlined" sx={{ padding: "15px" }}>
              <Box sx={{ width: "100%", height: "400px" }}>
                <CustomPieCharts
                  title={"Lead Per Status"}
                  data={pieCharData || []}
                />
              </Box>
            </Paper>
          </Grid>
        </Grid>
      )}
    </>
  );
}
