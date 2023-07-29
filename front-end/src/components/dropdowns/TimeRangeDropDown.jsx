import React from 'react';
import { styled } from "@mui/system";
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const FormSelect = styled(FormControl)(({ theme }) => ({
  margin: theme.spacing(1),
  minWidth: 120,
}));

export default function TimeRangeDropDown({ timeRange, handleTimeRangeChange, timeRanges }) {
  const menuItems = Object.keys(timeRanges).map(key =>
    <MenuItem key={key} value={timeRanges[key]}>{key}</MenuItem>
  );

  return (
    <FormSelect>
      <Select
        labelId="time-range-select-label"
        id="time-range-select"
        value={timeRange}
        onChange={handleTimeRangeChange}
      >
        {menuItems}
      </Select>
    </FormSelect>
  );
}
