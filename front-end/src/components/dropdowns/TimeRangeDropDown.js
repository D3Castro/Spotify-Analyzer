import React from 'react';
import { styled } from "@mui/system";
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const styles = styled(({ theme }) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  }
}));

export default function TimeRangeDropDown(props) {
  const timeRange = props.timeRange;
  const handleTimeRangeChange = props.handleTimeRangeChange;
  const menuItems = Object.keys(props.timeRanges).map(key =>
    <MenuItem key={key} value={props.timeRanges[key]}>{key}</MenuItem>
  );

  return (
      <FormControl sx={styles.formControl}>
        <Select
          labelId="time-range-select-label"
          id="time-range-select"
          value={timeRange}
          onChange={handleTimeRangeChange}
        >
          {menuItems}
        </Select>
      </FormControl>
  );
}