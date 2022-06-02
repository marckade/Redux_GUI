import TextField from '@mui/material/TextField';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import { ProblemContext } from '../contexts/ProblemProvider'
import React,{useContext} from 'react'
const filter = createFilterOptions();
var initialized = false;

export default function SearchBar(props) {
  
  if (!initialized) {
    const req = getRequest(props.url);
    req.then(result => {
      return result.json();
    }).then(data => {
      initializeProblemJson(data)
      //console.log(problemJson)
    })
      .catch((error) => console.log("GET REQUEST FAILED"));
    initialized = true;
  }
  //const [value, setValue] = React.useState(null); //state manager.
  const {problem,setProblemName, setProblemInstance,makeApiCall} = useContext(ProblemContext)
  return (
    <Autocomplete
      value={problem}
      onChange={(event, newValue) => {
        if (typeof newValue === 'string') {
          setProblemName(
            newValue
          );
        } else if (newValue && newValue.inputValue) {
          // Create a new value from the user input
          setProblemName(
            newValue.inputValue,
          );
        } else {
          setProblemName(newValue);
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
      renderInput={(params) => (
        <TextField {...params} label={props.placeholder} />
      )}
    />
  );
}

//our problems to be shown
var problemJson = [
 
];

function initializeProblemJson(arr) { //converts asynchronous fetch request into synchronous call that sets the dropdown labels
  
  arr.map(function (element, index, array) {
    if (!problemJson.includes(element)) {
      problemJson.push({ problemName: element })
    }
  }, 80);
  //console.log(problemJson);
}
async function getRequest(url) {
    const promise = await fetch(url);
    return promise;
}

