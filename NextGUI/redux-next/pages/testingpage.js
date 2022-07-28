//redux.aws.cose.isu.edu (this page will be replaced by testpage )
import TextBox from '../components/widgets/TextBox'
import TextBoxInstance from '../components/widgets/TextBoxInstance';
import 'bootstrap/dist/css/bootstrap.min.css'
import AccordionNestedTextBox from '../components/widgets/AccordionNestedTextBox';
import PopoverTooltipHover from '../components/widgets/PopoverTooltipClick';
// import SearchBar from '../components/widgets/SearchBar';
import BookData from "./Data.json";
// import AutoComplete from '../components/widgets/SearchBar';

import ResponsiveAppBar from '../components/widgets/ResponsiveAppBar'
import { Button, createTheme, Input, ThemeProvider, Typograph } from "@mui/material"
import { orange } from "@mui/material/colors"
import { useState, useEffect } from 'react';
import TEST_SVG_REACT from '../components/Visualization/svgs/TEST_SVG_REACT';
import VertexCoverSvgReact from '../components/Visualization/svgs/VertexCover_SVG_React';
import VisualizationLogic from '../components/widgets/VisualizationLogic';


//const baseUrl = 'http://redux.aws.cose.isu.edu:27000/';
const reduxBaseUrl = 'http://localhost:27000/'; //redux url. Note the trailing slash
const searchbarPlaceHolder = "Enter a Problem Name..."

const DEFAULTTEXTBOX = { name: "Get Instance (ie. ARCSETGeneric, VERTEXCOVERGeneric)", submitMsg: "Get Instance" ,reqUrl: reduxBaseUrl}
const ALTTEXTBOX = { name: "Instance", submitMsg: "Validate",reqUrl: reduxBaseUrl}
const FINDREDUCTIONS = { name: "Choose What You want to reduce to", submitMsg: "Reduce", reqUrl: reduxBaseUrl }
const NESTEDACCORDION = { header: "TestHeader", text1: "Text1" }
const NESTEDFORMCONTROL = { placeHolder: "PlaceholderText" }
const ACCORDION_FORM_ONE = { placeHolder: "PlaceHolder Text One" }
const ACCORDION_FORM_TWO = { placeHolder: "PlaceHolder Text Two" }
const CARD = { cardBodyText: "CARD BODY", cardHeaderText: "Card Header" }
const TOOLTIP = {tooltipText: "HELLO I AM INFORMATION MAIN"}

const ACCORDION = {ACCORDION_FORM_ONE,ACCORDION_FORM_TWO,CARD,TOOLTIP}

function HomePage() {

  const theme = createTheme({
    palette: {
      mode: "light",
      primary: {
        main: "#424242",
      },
      secondary: {
        main:"#f47920"
      }
    }
  });
  
  const [text, setText] = useState("");
    
  const handleTextBox = (event) => {
    setText(event.target.value)
    console.log(event.target.value)
  }

  const logicProps = {
    solverOn: false,
    reductionOn: false,
    gadgetsOn: false,
    problemName: "VERTEXCOVER",
    problemInstance: "{{a,b},{{a,b}},1}"
  }

  return (
    
    <>
    <ThemeProvider theme = {theme}>
        <ResponsiveAppBar></ResponsiveAppBar>

        <div>
        {/* <TextField
  id="outlined-name"
  label="Name"
  value={""}
  onChange={handleTextBox}
        /> */}
        </div>
        
        <input onChange={handleTextBox}></input>
        {"HELLO"}
        <TEST_SVG_REACT></TEST_SVG_REACT>
        <VisualizationLogic props={ logicProps }></VisualizationLogic>

    </ThemeProvider>
    </>
  )
}



export default HomePage;