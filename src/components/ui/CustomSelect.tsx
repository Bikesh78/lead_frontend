import { FormControl, InputLabel, MenuItem, Select, Box } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";
import { Controller } from "react-hook-form";

interface Props {
  name: string;
  control: any;
  error: any;
  data: any[];
  defaultValue?: string | number;
  hideLegend?: boolean;
  required?: boolean;
  placeholder?: string;
  title: string;
  disabled?: boolean;
}

export const CustomSelect: React.FC<Props> = ({
  name,
  control,
  error,
  data = [],
  defaultValue,
  title = "",
  disabled = false,
  hideLegend,
  required,
  placeholder,
}) => {
  const classes = useStyles();

  return (
    <>
      <Box
        className={`${classes.root} custom-select`}
        sx={{
          "& legend": {
            display: hideLegend ? "none" : "initial",
          },
          "& .MuiOutlinedInput-notchedOutline": {
            top: hideLegend ? 0 : "-5px",
          },
        }}
      >
        {title && (
          <Box sx={{ display: "flex", columnGap: "0.1rem", mb: "3px" }}>
            <InputLabel className="title">{title} </InputLabel>
            {required && (
              <InputLabel style={{ color: "red" }}>{" *"}</InputLabel>
            )}
          </Box>
        )}

        <FormControl variant="outlined">
          <Controller
            name={name}
            control={control}
            render={({ field: { onChange, value } }) => {
              return (
                <Select
                  placeholder={placeholder}
                  label={name}
                  onChange={onChange}
                  value={value}
                  disabled={disabled}
                  fullWidth
                  defaultValue={defaultValue || ""}
                >
                  {data?.length ? (
                    data?.map((item, index) => {
                      const value = item?.value;
                      const label = item?.label;
                      return (
                        <MenuItem
                          key={index}
                          value={value}
                          disabled={item?.disabled}
                        >
                          {label}
                        </MenuItem>
                      );
                    })
                  ) : (
                    <MenuItem value={""} disabled>
                      No options
                    </MenuItem>
                  )}
                </Select>
              );
            }}
          />
        </FormControl>
        {error && (
          <Box sx={{ color: "red", fontSize: "10px", marginTop: "5px" }}>
            {error}
          </Box>
        )}
      </Box>
    </>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiFormControl-root": {
      width: "100%",
    },
  },
}));
