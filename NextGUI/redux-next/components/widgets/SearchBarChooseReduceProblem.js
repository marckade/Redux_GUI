import TextField from '@mui/material/TextField';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import { ProblemContext } from '../contexts/ProblemProvider'
import React,{useContext} from 'react'
const filter = createFilterOptions();
var initialized = false
export default function SearchBarChooseReduceProblem(props) {
    const {reduceToOptions,problem,setProblemChosenReduceTo} = useContext(ProblemContext) //This search bar should take in an input of options and give an output of the chosen option.
    //var optionsArr = [{ problemName: "DEFAULT CHOICE" }];
    var optionsArr = [];

    try {
        //console.log(reduceToOptions)
        reduceToOptions.map(function (element, index, array) {
            
            optionsArr.push({ problemName: element })
            //console.log(optionsArr)
          
        }, 80);
        //console.log(problemJson);
    }
    catch (error) {
        console.log(error)
    }
   
    
  
  return (
      <Autocomplete 
      style={{ width: "100%" }}
      value={problem} //leaving this blank for some reason overwrites input
      onChange={(event, newValue) => {
        if (typeof newValue === 'string') {
          setProblemChosenReduceTo(
            newValue
          );
        } else if (newValue && newValue.inputValue) {
          // Create a new value from the user input
          setProblemChosenReduceTo(
            newValue.inputValue,
          );
        } else {
          setProblemChosenReduceTo(newValue);
          }
      }}
      filterOptions={(options, params) => {
        const filtered = filter(options, params);

        const { inputValue } = params;
        const isExisting = options.some((option) => inputValue === option.title);
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



