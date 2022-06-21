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
import { Button, createTheme, ThemeProvider, Typograph } from "@mui/material"
import { orange } from "@mui/material/colors"
import { useState, useEffect } from 'react';


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


  
  const [seconds, setSeconds] = useState(0);
  const [isActive, setActive] = useState(false);
  const [button2Count, setButton2Count] = useState(0);

  
  useEffect(() => {
    let timer = null;
    if (isActive) {
      timer = setInterval(() => {
        setSeconds(seconds + 1);
        console.log("TIMER")
        console.log(seconds);
        //console.log(state)
        if (seconds % 5 === 0) {
          console.log("Fifth")
          //console.log(button2Count);
          
        }
        if (seconds % 10 === 0) {
          console.log("TEN HIT")
          console.log("Button 2 count: "+button2Count)
          setActive(false);
        }
      }, 1000);
    }
    else {
      clearInterval(timer)
    }
    // clearing interval
    return () => clearInterval(timer);
  });

    
  const handleButtonClick = () => {
    setActive(!isActive)
  }
  const handleButtonClick2 = () => {
    if (isActive === false) {
      setActive(true);
    }
    setButton2Count((button2Count) => button2Count + 1)
    //setSeconds(0)
  }

  return (
    
    <>
    <ThemeProvider theme = {theme}>
        <ResponsiveAppBar></ResponsiveAppBar>
        <Button onClick={handleButtonClick} variant="outlined" color="error">
        {seconds}
        </Button>
        
        <Button onClick={handleButtonClick2} variant="outlined" color="warning">
        {button2Count}
      </Button>
    </ThemeProvider>
    </>

    
    // <div className="TextBox">
    //   <div className = "TextBoxInner">
    //     <TextBoxInstance textbox={DEFAULTTEXTBOX} />
    //     </div>
    //   <div className = "TextBoxInner">
    //     <TextBoxInstance textbox={ALTTEXTBOX} />
    //   </div>
    //   <div className="TextBoxInner">
    //     {/* <SearchBar placeholder={searchbarPlaceHolder} data={NPC_Problems}/> */}
    //     {/* <AutoComplete url = {baseUrl+"navigation/NPC_Problems/"}></AutoComplete> */}
    //   </div>
    //   <div className="TextBoxInner">
    //     </div>
    // </div>


    
  )
}



export default HomePage;