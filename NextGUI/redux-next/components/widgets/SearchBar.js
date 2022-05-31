import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import { areArraysEqual } from '@mui/base';

const filter = createFilterOptions();
var counter = 0;

export default function SearchBar(props) {

  if (counter < 1) {
    const req = getRequest(props.url);
    req.then(result => {
      return result.json();
    }).then(data => {
      initializeProblemJson(data)
      console.log(problemJson)
    })
      .catch((error) => console.log("GET REQUEST FAILED"));
    counter++;
  }
   const [value, setValue] = React.useState(null);
  return (
    <Autocomplete
      value={value}
      onChange={(event, newValue) => {
        if (typeof newValue === 'string') {
          setValue({
            problemName: newValue,
          });
        } else if (newValue && newValue.inputValue) {
          // Create a new value from the user input
          setValue({
            problemName: newValue.inputValue,
          });
        } else {
          setValue(newValue);
        }
      }}
      filterOptions={(options, params) => {
        const filtered = filter(options, params);

        const { inputValue } = params;
        // Suggest the creation of a new value
        const isExisting = options.some((option) => inputValue === option.title);
        // if (inputValue !== '' && !isExisting) {
        //   filtered.push({
        //     inputValue,
        //     problemName: `Add "${inputValue}"`,
        //   });
        // }

        return filtered;
      }}
      selectOnFocus
      clearOnBlur
      handleHomeEndKeys
      id="search-bar"
      options={problemJson}
      getOptionLabel={(option) => {
        // Value selected with enter, right from the input
        if (typeof option === 'string') {
          return option;
        }
        // Add "xxx" option created dynamically
        if (option.inputValue) {
          return option.inputValue;
        }
        // Regular option
        return option.problemName;
      }}
      renderOption={(props, option) => <li {...props}>{option.problemName}</li>}
      sx={{ width: 300 }}
      freeSolo
      onSubmit={console.log("SUBMITTED")}
      renderInput={(params) => (
        <TextField {...params} label={props.placeholder} />
      )}
    />
  );
}

//our problems to be shown
var problemJson = [
 
];

function initializeProblemJson(arr) {
  
  arr.map(function (element, index, array) {
    if (!problemJson.includes(element)) {
      problemJson.push({ problemName: element })
    }
  }, 80);
  console.log(problemJson);
}
async function getRequest(url) {
    const promise = await fetch(url);
    return promise;
}

