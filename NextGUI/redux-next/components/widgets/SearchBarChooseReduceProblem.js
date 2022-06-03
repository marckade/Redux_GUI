import TextField from '@mui/material/TextField';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import { ProblemContext } from '../contexts/ProblemProvider'
import React,{useContext} from 'react'
const filter = createFilterOptions();
var initialized = false
export default function SearchBarChooseReduceProblem(props) {
    const {reduceToOptions,problem,setProblemReduceTo} = useContext(ProblemContext)
    console.log(reduceToOptions)
    //var optionsArr = [{ problemName: "DEFAULT CHOICE" }];
    var optionsArr = [];

    try {
        
        reduceToOptions.map(function (element, index, array) {
       
            optionsArr.push({ problemName: element })
            console.log(optionsArr)
          
        }, 80);
        //console.log(problemJson);
    }
    catch (error) {
        console.log(error)
    }
   
    
  
  return (
    <Autocomplete
      value={problem}
      onChange={(event, newValue) => {
        if (typeof newValue === 'string') {
          setProblemReduceTo(
            newValue
          );
        } else if (newValue && newValue.inputValue) {
          // Create a new value from the user input
          setProblemReduceTo(
            newValue.inputValue,
          );
        } else {
          setProblemReduceTo(newValue);
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
      options={optionsArr} //This displays the passed in choices
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



