import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const Graphviz = dynamic(() => import("graphviz-react"), { ssr: false });




function Page(props) {
  let viz = "";
  //console.log(props.DOT);
  const graphTest = props.DOT;
  //const [visualization, setVisualization]= useState('')

  // const [data, setData] = useState("");

  // useEffect(() => {
  //  // console.log(`${props.visualization}\n`)
  //   // getData();
  //   //draw();
  //  //console.log(visualization)
  // }, [props]);

  
  // //problemName
  // function draw() {
  //   //console.log("Draw \n")
  //   viz = graphTest
  //   setVisualization(graphTest)

  //   return
  // }



  return (
    <Graphviz dot={graphTest} width={200} height={200} />

  );
}

export default Page;
