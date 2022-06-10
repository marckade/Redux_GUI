import TextField from '@mui/material/TextField';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import { ProblemContext } from '../../contexts/ProblemProvider'
import React,{useContext,useEffect} from 'react'
const filter = createFilterOptions();


export default function SearchBarSelectSolverV2(props) {
  //props.setData and props.data should be passed down.

  let stateVal = undefined;

  const fullUrl = props.url;
    initializeList(fullUrl) 
  
  //const [value, setValue] = React.useState(null); //state manager.
  return (
    <Autocomplete
    style={{ width: "100%" }}
      value={stateVal}
      onChange={(event, newValue) => {
        if (typeof newValue === 'string') {
          // setChosenReduceTo(
          //   newValue
          // );
          props.setData(newValue);
          stateVal = newValue
        } else {
          //setChosenReduceTo(newValue);
          props.setData(newValue);
          stateVal = newValue;
        }
      }}
      filterOptions={(options, params) => {
        const filtered = filter(options, params);

        const { inputValue } = params;
        // Suggest the creation of a new value
        const isExisting = options.some((option) => inputValue === option.title);
      

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
       
        // Regular option
        return option;
      }}
      renderOption={(props, option) => <li {...props}>{option}</li>}
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
    while (problemJson.length) { 
      problemJson.pop(); 
  }
  arr.map(function (element, index, array) {
    
    if (!problemJson.includes(element)) {
      problemJson.push(element)
    }
  }, 80);
  //console.log(problemJson);
}
async function getRequest(url) {
    const promise = await fetch(url).then(result => {
      return result.json()
  })
  return promise;
  
}

function initializeList(url) {

  const req = getRequest(url);
  req.then(data => {
   
    initializeProblemJson(data)
    //console.log(problemJson)
  })
    .catch((error) => console.log("GET REQUEST FAILED SEARCHBAR SOLVER"));
}


