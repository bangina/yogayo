import React from "react";
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import Search from "@material-ui/icons/Search";

const SearchBar = () => {
  return (
    <Input
      size="small"
      id="standard-adornment-password"
      endAdornment={
        <InputAdornment position="end">
          <IconButton>
            <Search />
          </IconButton>
        </InputAdornment>
      }
    />
  );
};

export default SearchBar;
