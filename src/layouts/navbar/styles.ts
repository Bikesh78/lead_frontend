import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    // background: "#191e3a",
    marginInline: "-24px",
    padding: "10px 24px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    columnGap: "2rem",
    "& .MuiButton-root": {
      // color: theme.palette.text.main,
      color: "#4559BD",
    },
    "& .avatar": {
      marginLeft: "auto",
    },
  },
  companyInfo: {
    "& img": {
      width: "100px",
      height: "48px",
    },
  },

  navLinkWrapper: {
    display: "flex",
    height: "100%",
    gap: "30px",
    alignItems: "center",
    flexWrap: "wrap",
    padding: "10px 0px",
    fontSize: "14px",
    "& a": {
      textDecoration: "none",
      padding: "0px 10px",
    },
    "& p": {
      fontWeight: "800",
      color: "#fff",
    },
  },

  active: {
    "& p": {
      color: `#25d5e4 !important`,
    },
  },
}));

export default useStyles;
