import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  }
}));

export default function TimeRangeDropDown(props) {
  const classes = useStyles();
  const timeRange = props.timeRange;
  const handleTimeRangeChange = props.handleTimeRangeChange;
  const menuItems = Object.keys(props.timeRanges).map(key =>
    <MenuItem key={key} value={props.timeRanges[key]}>{key}</MenuItem>
  );

  return (
      <FormControl className={classes.formControl}>
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