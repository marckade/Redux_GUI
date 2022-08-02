import { useEffect, useState } from "react";
import TextField from '@mui/material/TextField';
import { Autocomplete } from "@mui/material";



export default function TestAuto(props) {

  // const [problemName, setProblemName] = useState('');
  var defaultProblem = 'SAT3';
  var problemList = ['ST', 'DT', 'FT'];
  // const list =  []
  const [noReductions, setReductions] = useState(true);
  const [problem, setTestName] = useState(defaultProblem);

  // setReductions(true)


  return (

    <Autocomplete
      selectOnFocus
      value={problem}

      onChange={(event, newValue) => {
        if (typeof newValue === 'string') {
          setProblemName(
            newValue
          );
          //setDefaultProblemName(newValue)
          props.setTestName(newValue);
        } 

        console.log("new problem chosen test: "+problem)
      }}


      options={problemList}
      getOptionLabel={(option) => {
        // Value selected with enter, right from the input
        if (typeof option === 'string') {
          return option;
        }
       
        // Regular option
        return option;
      }}
      

      


      renderInput={(params) => (
        <TextField 
        {...params} 
        InputProps={ noReductions ? { ...params.InputProps, style: { fontSize: 40 } } : {...params.InputProps}}
        />
      )}


    />
  )

}
