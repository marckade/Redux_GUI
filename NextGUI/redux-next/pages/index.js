//redux.com
import TextBox from '../components/TextBox'

const DEFAULTTEXTBOX = { name: "Get Instance (ie. ARCSETGeneric, VERTEXCOVERGeneric)", submitMsg: "Get Instance" }
const ALTTEXTBOX = {name: "Second Box (Does Nothing)",submitMsg: "Reduce"}

function HomePage() {
  return(
    <div class="TextBox">
      <div class = "TextBoxInner">
        <TextBox textbox={DEFAULTTEXTBOX} />
        </div>
      <div class = "TextBoxInner">
        <TextBox textbox={ALTTEXTBOX} />
        </div>
    </div>
  )
}
export default HomePage;