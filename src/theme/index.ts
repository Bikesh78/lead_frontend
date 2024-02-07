import { createTheme, lighten } from "@mui/material/styles";
const mainColor = localStorage.getItem("themeColor") || "#4559BD";

export const theme: any = createTheme({
  palette: {
    primary: {
      main: mainColor,
      light: lighten(mainColor, 0.925),
      contrastText: "#fff",
    },
    secondary: {
      main: "#4559BD",
    },
    // text: {
    //   main: "#121127",
    //   light: "#b1b1b1",
    //   medium: "#4C4B63",
    //   hover: "#007a6f",
    //   active: "#25d5e4",
    // },
    // dark: {
    //   200: "#E5E5EB",
    //   400: "#bdbdc7",
    //   700: "#383751",
    // },
    // primaryBtn: {
    //   main: "#017054",
    //   contrastText: "#fff",
    // },
    // grayBackground: {
    //   default: "#F7F8FA",
    // },
    background: {
      default: "#FFF",
    },
    // blue: {
    //   50: "#E1F5FF",
    //   800: "#4559BD",
    // },
    // cyan: {
    //   600: "#3EC4D5",
    //   900: "#2A7576",
    // },
    common: {
      black: "#232323",
      white: "#fff",
    },
    // input: {
    //   main: "#f6f6f6",
    // },
    error: { main: "#FF3B3B" },
    info: { main: "#0063F7" },
    success: { main: "#06C270" },
    warning: { main: "#FC7125" },
  },
  typography: {
    fontSize: 12,
  },

  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "capitalize",
          // color: "#fff",
          fontWeight: "500",
          fontSize: "12px",
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          fontSize: "12px",
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          fontSize: "14px",
          "& a": {
            textDecoration: "none",
          },
        },
      },
    },
    MuiList: {
      styleOverrides: {
        root: {
          "& a": {
            textDecoration: "none",
          },
          "& .MuiButtonBase-root": {
            // background: "#25d5e4",
            color: "#383751",
            // "&:hover": {
            //   background: "#4559BD",
            //   color: "white",
            //   "& .MuiListItemIcon-root": {
            //     color: "white",
            //   },
            //   "& .MuiListItemText-root": {
            //     color: "white",
            //   },
            //   "& .MuiSvgIcon-root": {
            //     color: "white",
            //   },
            // },
          },
        },
      },
    },
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          // color: "white",
          color: "#383751",
          minWidth: "40px",
          "& svg": {
            fontSize: "18px",
          },
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          color: "#383751",
          fontSize: "14px",
        },
      },
    },
    MuiListItemText: {
      styleOverrides: {
        root: {
          color: "#383751",
        },
      },
    },
    // MuiDataGrid: {
    //   styleOverrides: {
    //     root: {
    //       border: "none !important",
    //       background: "#fcfcfc ",
    //
    //       "& .MuiDataGrid-cell, & .MuiDataGrid-footerContainer, & .MuiButtonBase-root ":
    //         {
    //           fontSize: "12px",
    //           "&:focus, &:focus-within": {
    //             outline: "none",
    //           },
    //         },
    //     },
    //     columnHeaders: {
    //       borderBlock: "1px solid #9D9CAF !important",
    //       borderRadius: "0px",
    //       outline: "none !important",
    //       // background: mainColor,
    //       // color: "white",
    //       // fontSize: "16px",
    //     },
    //     columnHeaderTitleContainer: {
    //       textTransform: "uppercase",
    //       fontSize: "12px",
    //       paddingBlock: "0px !important",
    //     },
    //     columnHeaderTitle: {
    //       fontWeight: "600",
    //     },
    //     menuIcon: {
    //       // "& .MuiButtonBase-root": {
    //       //   color: "white",
    //       // },
    //     },
    //     iconButtonContainer: {
    //       "& .MuiButtonBase-root": {
    //         color: "white",
    //       },
    //     },
    //     columnSeparator: {
    //       display: "none",
    //     },
    //     toolbarContainer: {
    //       marginBlock: "10px",
    //       "& .MuiInputBase-root": {
    //         border: "1px solid rgba(0,0,0,0.23)",
    //         borderRadius: "4px",
    //         padding: "4px",
    //         "&:before": {
    //           borderBottom: "none !important",
    //         },
    //         "&:after": {
    //           display: "none !important",
    //         },
    //         // "& button": {
    //         //   display: "none",
    //         // },
    //         "&:hover": {
    //           "&:before": {
    //             borderBottom: "none !important",
    //           },
    //         },
    //       },
    //     },
    //   },
    // },
    MuiIconButton: {
      styleOverrides: {
        root: {
          fontSize: "20px",
        },
      },
    },
    MuiSvgIcon: {
      styleOverrides: {
        root: {
          fontSize: "20px",
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          backgroundColor: "#f6f6f6 !important",
          outline: "none",
          // border: "none",
          borderRadius: "3px",
          fontSize: "12px",
          "& input": {
            padding: "0px",
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          padding: "10px",
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "rgba(0,0,0,0.87)",
            borderWidth: "1px",
          },
          "&.Mui-error": {
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "rgba(0,0,0,0.23)",
            },
          },
        },
        notchedOutline: {
          outline: "none",
          // border: "none",
          borderRadius: "3px",
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          fontSize: "12px",
        },
      },
    },
    MuiSwitch: {
      styleOverrides: {
        switchBase: ({ theme }) => ({
          "&.Mui-checked": {
            color: theme.palette.success.main,
          },
        }),
      },
    },
    MuiSelect: {
      styleOverrides: {
        select: {
          "&.MuiOutlinedInput-input": {
            padding: "0",
          },
        },
      },
    },
  },
});
