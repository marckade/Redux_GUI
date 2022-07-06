import { useEffect, useState } from "react";
import TextField from '@mui/material/TextField';
import { Autocomplete } from "@mui/material";



export default function TestAuto(props) {

  // const [problemName, setProblemName] = useState('');
  var defaultProblem = 'SAT3';
  var problemList = ['ST', 'DT', 'FT'];
  const [noReductions, setReductions] = useState(true);

  // setReductions(true)


  return (

    <Autocomplete
      selectOnFocus
      // value={defaultProblem}
      options={problemList}
      // disabled={noReductions ? true : false}
      // {noReductions ? disabled : null}

      


      renderInput={(params) => (
        <TextField 
        {...params} 
        InputProps={ noReductions ? { ...params.InputProps, style: { fontSize: 40 } } : {...params.InputProps}}
        />
      )}


    />
  )

}
