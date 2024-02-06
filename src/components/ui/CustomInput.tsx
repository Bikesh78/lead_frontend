import { Box, InputLabel, TextField } from "@mui/material";
import React from "react";
import { Controller } from "react-hook-form";

interface InputProps {
  name: string;
  control: any;
  type?: "number" | "string" | "password";
  error: any;
  placeholder?: string;
  label?: string;
  title?: string;
  disabled?: boolean;
  required?: boolean;
  min?: number;
  max?: number;
  rows?: number;
}

export const CustomInput: React.FC<InputProps> = ({
  name,
  control,
  type,
  error,
  placeholder = "",
  label = "",
  title = "",
  disabled = false,
  required,
  min,
  max,
  rows,
  ...props
}) => {
  return (
    <>
      <div className="custom-input">
        {title && (
          <Box sx={{ display: "flex", columnGap: "0.1rem", mb: "3px" }}>
            <InputLabel className="title">{title} </InputLabel>
            <InputLabel style={{ color: "red" }}>{required && " *"}</InputLabel>
          </Box>
        )}
        <Controller
          name={name}
          control={control}
          render={({ field: { onChange, value } }) => (
            <TextField
              id={name}
              type={type}
              onChange={onChange}
              value={value}
              fullWidth
              placeholder={placeholder}
              label={label}
              variant="outlined"
              title={title}
              disabled={disabled}
              onWheel={(e: any) => e.target.blur()}
              InputProps={{
                inputProps: { min: min || 0, max: max, step: "any" },
              }}
              multiline={Boolean(rows)}
              rows={rows}
              sx={{ "& input": { padding: "7px 10px" } }}
              {...props}
            />
          )}
        />
        {error && (
          <Box sx={{ color: "red", fontSize: "10px", marginTop: "5px" }}>
            {error}
          </Box>
        )}
      </div>
    </>
  );
};
