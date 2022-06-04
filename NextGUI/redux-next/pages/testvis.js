
import GraphvizPage from "../components/Visualization/Graphvisualization";
import Graphvisualization from "../components/Visualization/Graphvisualization";


export default function Test(props){


    return(

        <div>
         {/* <Dot></Dot> */}
        <GraphvizPage name={"Daniel"} instance={"Test"}> </GraphvizPage>
        <Graphvisualization></Graphvisualization>
        
        </div>
    );
}