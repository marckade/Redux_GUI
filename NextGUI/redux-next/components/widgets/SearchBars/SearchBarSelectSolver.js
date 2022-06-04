import TextField from '@mui/material/TextField';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import { ProblemContext } from '../../contexts/ProblemProvider'
import React,{useContext} from 'react'
const filter = createFilterOptions();

export default function SearchBarSelectSolver(props) {
    const {solverOptions,problem,setChosenSolver} = useContext(ProblemContext) //this takes an input of 
    //console.log(reductionTypeOptions)
    //var optionsArr = [{ problemName: "DEFAULT CHOICE" }];
    var optionsArr = [];

    try {
        
        solverOptions.map(function (element, index, array) {
       
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
      value={problem}
      onChange={(event, newValue) => {
        if (typeof newValue === 'string') {
          setChosenSolver(
            newValue
          );
        } else if (newValue && newValue.inputValue) {
          // Create a new value from the user input
          setChosenSolver(
            newValue.inputValue,
          );
        } else {
          setChosenSolver(newValue);
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


