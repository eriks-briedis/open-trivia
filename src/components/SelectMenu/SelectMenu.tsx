import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import type { SelectChangeEvent } from "@mui/material/Select";
import { PropsWithChildren } from "react";
import MenuItem from "@mui/material/MenuItem";

export interface SelectMenuProps<T> extends PropsWithChildren {
  label: string;
  value: T;
  onSelect: (value: T) => void;
}

export const SelectMenu = <T = string>({ label, onSelect, children, value }: SelectMenuProps<T>) => {
  return (
    <FormControl sx={{ marginBottom: '25px' }} fullWidth>
      <InputLabel>{label}</InputLabel>
      <Select
        label={label}
        onChange={(e: SelectChangeEvent<any>) => onSelect(e.target.value)}
        value={value}
        disabled={!children}
      >
        {children || <MenuItem />}
      </Select>
    </FormControl>
  )
}
