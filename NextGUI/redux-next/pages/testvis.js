
import GraphvizPage from "../components/widgets/Graphvisualization";
import Graphvisualization from "../components/widgets/Graphvisualization";


export default function Test(props){


    return(

        <div>
         {/* <Dot></Dot> */}
        <GraphvizPage name={"Daniel"} instance={"Test"}> </GraphvizPage>
        <Graphvisualization></Graphvisualization>
        
        </div>
    );
}