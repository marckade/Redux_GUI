//redux.com
import Example from '../components/ContextAwareToggle'
import TextBox from '../components/TextBox'
import TextBoxInstance from '../components/TextBoxInstance';
import 'bootstrap/dist/css/bootstrap.min.css'


const baseUrl = 'http://redux.aws.cose.isu.edu:27000/';

const DEFAULTTEXTBOX = { name: "Get Instance (ie. ARCSETGeneric, VERTEXCOVERGeneric)", submitMsg: "Get Instance" ,reqUrl: baseUrl}
const ALTTEXTBOX = { name: "Instance", submitMsg: "Validate",reqUrl: baseUrl}
const FINDREDUCTIONS = {name: "Choose What You want to reduce to",submitMsg: "Reduce",reqUrl: baseUrl}

function HomePage() {
  return(
    <div className="TextBox">
      <div className = "TextBoxInner">
        <TextBoxInstance textbox={DEFAULTTEXTBOX} />
        </div>
      <div className = "TextBoxInner">
        <TextBoxInstance textbox={ALTTEXTBOX} />
      </div>
      <div className = "TextBoxInner">
        <TextBoxInstance textbox={FINDREDUCTIONS} />
      </div>
      <div className="TextBoxInner">
        <Example text1 = "Dummy Data 1" text2 = "Dummy Data 2"></Example>
        </div>
    </div>
  )
}
export default HomePage;