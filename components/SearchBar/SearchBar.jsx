import * as React from "react";
import SearchTwoToneIcon from "@mui/icons-material/SearchTwoTone";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import styles from "./searchbar.module.css";
import { SearchOptions } from "./SearchOptions";
import Popper from "@mui/material/Popper";
import { createStyles, makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      "& .MuiAutocomplete-listbox": {
        fontSize: "8.5rem",
        minHeight: "35rem",
        zIndex: 3,
        overflowX: "auto",
      },
      "& .MuiAutocomplete-groupLabel": {
        fontSize: "1.7rem",
      },
    },
  })
);

const useStylesNoOptions = makeStyles({
  noOptions: {
    height: "10rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "1.3rem !important",
  },
});

const CustomPopper = function (props) {
  const classes = useStyles();
  return <Popper {...props} className={classes.root} />;
};

export default function SearchBar({ data, placeholder, noSearch }) {
  const noOptionsStyles = useStylesNoOptions();
  let eventsArray = [];
  if (!noSearch) {
    eventsArray = data.flatMap((item) => item.events);
  }
  return (
    <Autocomplete
      className={styles.SearchBarContainer}
      classes={{ noOptions: noOptionsStyles.noOptions }}
      id="custom-input-demo"
      options={eventsArray}
      renderInput={(params) => (
        <div
          ref={params.InputProps.ref}
          className={styles.SearchInputContainer}
        >
          <span className={styles.SearchIcon}>
            <SearchTwoToneIcon style={{ fontSize: "2.5rem" }} />
          </span>
          <input
            type="text"
            placeholder={placeholder}
            {...params.inputProps}
            className={styles.SearchInput}
          />
        </div>
      )}
      getOptionLabel={(option) => (option.title ? option.title : "")}
      renderOption={(props, option, { selected }) => (
        <SearchOptions option={option} key={option.id} />
      )}
      PopperComponent={CustomPopper}
    />
  );
}
