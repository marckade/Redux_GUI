//redux.aws.cose.isu.edu/testpage
//testpage.js
/**
 * This is the main page for the Redux Application. All active components are children (in the heirarchy) of this parent react component.
 * 
 * 
 */




import React from 'react' //React is implicitly imported
import ProblemRow from '../components/pageblocks/ProblemRow'
import ProblemRowReact from '../components/pageblocks/ProblemRowReact'
import ReduceToRow from '../components/pageblocks/ReduceToRow'
import ReduceToRowReact from '../components/pageblocks/ReduceToRowReact'
import VisualizeRow from '../components/pageblocks/VisualizeRow'
import VisualizeRowReact from '../components/pageblocks/VisualizeRowReact'
import SolveRow from '../components/pageblocks/SolveRow'
import SolveRowReact from '../components/pageblocks/SolveRowReact'
import VerifyRow from '../components/pageblocks/VerifyRow'
import VerifyRowReact from '../components/pageblocks/VerifyRowReact'
import Button from 'react-bootstrap/Button'
import 'bootstrap/dist/css/bootstrap.min.css'
import Image from 'next/image'
import isulogo from '../components/images/ISULogo.png'
import SearchBarProblemType from '../components/widgets/SearchBars/SearchBarProblemType'
import ProblemProvider from '../components/contexts/ProblemProvider'
import ResponsiveAppBar from '../components/widgets/ResponsiveAppBar'


const reduxBaseUrl = 'http://localhost:27000/'; //redux url. Note the trailing slash

/**
 * Generates the actual page contents
 * 
 * @returns The contents of the page (jsx)
 */
function TestPageContent() {

  const imgStyle = { textAlign: "center" }


  return (
    <>

      <ResponsiveAppBar></ResponsiveAppBar>

      <div className="container my-5 ">{ /** This is an artifact from the old bootstrap code, may be deprecated */}
        
      
      <ProblemProvider>
        
        <ProblemRowReact reduxBaseUrl={reduxBaseUrl}></ProblemRowReact>
    
        <ReduceToRowReact reduxBaseUrl={reduxBaseUrl}></ReduceToRowReact>

        <SolveRowReact reduxBaseUrl={reduxBaseUrl}></SolveRowReact>

        <VerifyRowReact reduxBaseUrl={reduxBaseUrl}></VerifyRowReact>

        <VisualizeRowReact reduxBaseUrl={reduxBaseUrl}></VisualizeRowReact> 

      </ProblemProvider>

        {/*<!-- /Container-->*/}

       <footer className='fixed-bottom'>
        <Image src={isulogo} width={300} height={150} style = {imgStyle}></Image>     
        </footer>
    </div> 
    </>
                    
    )
}

/**
 * Renders the actual page contents (this is the default export and is seen by next.js due to folder structure and broadcasted)
 * @returns A rendered page
 */
export default function TestPage() {
  return (
    <>
      <TestPageContent></TestPageContent> {/** Renders the actual contents of the page */}
    </>
  )
}

