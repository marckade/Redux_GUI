//redux.aws.cose.isu.edu (this page will be replaced by testpage )
import TextBox from '../components/widgets/TextBox'
import TextBoxInstance from '../components/widgets/TextBoxInstance';
import 'bootstrap/dist/css/bootstrap.min.css'
import AccordionNestedTextBox from '../components/widgets/AccordionNestedTextBox';
import PopoverTooltipHover from '../components/widgets/PopoverTooltipClick';
// import SearchBar from '../components/widgets/SearchBar';
import BookData from "./Data.json";
// import AutoComplete from '../components/widgets/SearchBar';



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
  
  return(
    <div className="TextBox">
      <div className = "TextBoxInner">
        <TextBoxInstance textbox={DEFAULTTEXTBOX} />
        </div>
      <div className = "TextBoxInner">
        <TextBoxInstance textbox={ALTTEXTBOX} />
      </div>
      <div className="TextBoxInner">
        {/* <SearchBar placeholder={searchbarPlaceHolder} data={NPC_Problems}/> */}
        {/* <AutoComplete url = {baseUrl+"navigation/NPC_Problems/"}></AutoComplete> */}
      </div>
      <div className="TextBoxInner">
        </div>
    </div>
  )
}





export default HomePage;