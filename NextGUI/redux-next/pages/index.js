//redux.com

import TextBox from '../components/TextBox'
import TextBoxInstance from '../components/TextBoxInstance';

const baseUrl = 'http://redux.aws.cose.isu.edu:27000/';

const DEFAULTTEXTBOX = { name: "Get Instance (ie. ARCSETGeneric, VERTEXCOVERGeneric)", submitMsg: "Get Instance" ,reqUrl: baseUrl}
const ALTTEXTBOX = { name: "Instance", submitMsg: "Validate",reqUrl: baseUrl}
const FINDREDUCTIONS = {name: "Choose What You want to reduce to",submitMsg: "Reduce",reqUrl: baseUrl}

function HomePage() {
  return(
    <div class="TextBox">
      <div class = "TextBoxInner">
        <TextBoxInstance textbox={DEFAULTTEXTBOX} />
        </div>
      <div class = "TextBoxInner">
        <TextBoxInstance textbox={ALTTEXTBOX} />
      </div>
      <div class = "TextBoxInner">
        <TextBoxInstance textbox={FINDREDUCTIONS} />
      </div>
      
    </div>
  )
}
export default HomePage;