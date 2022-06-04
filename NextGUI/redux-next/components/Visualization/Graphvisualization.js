import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const Graphviz = dynamic(() => import("graphviz-react"), { ssr: false });
const imgStyle = { textAlign: "center" }

const graphTest = `graph GRAPHCOLORING {  
    node [style="filled"];  
    a--b; 
    b--c; 
    c--a; 
    d--a; 
    d--e; 
    e--a; 
    f--a; 
    f--g; 
    a--g; 
    h--a; 
    h--i; 
    a--i; 
    a[fillcolor = White] 
    b[fillcolor = White] 
    c[fillcolor = White] 
    d[fillcolor = White] 
    e[fillcolor = White] 
    f[fillcolor = White] 
    g[fillcolor = White] 
    h[fillcolor = White] 
    i[fillcolor = White] 
     }`;

function Page(props) {
  let viz = "";

  // const [data, setData] = useState("");

  useEffect(() => {
    // getData();
    draw();
  }, [props]);


  // async function getData() {
  //   console.log(props.name);
  //   //props.name+Generic/ props.instance
  //   // fetch(`http://redux.aws.cose.isu.edu:27000/${props.name}Generic/instance?problemInstance=${props.instance}`)
  //   fetch("http://redux.aws.cose.isu.edu:27000/GRAPHCOLORINGGeneric")
  //     .then((res) => res.json())
  //     .then((data) => {
  //       console.log(data);
  //     });
  // }

  
  //problemName
  function draw() {
    console.log("Draw \n")
    console.log(props.problem)
    viz = graphTest;

  }

  return (
    <div id="problemVisualization" style={imgStyle}>
      <Graphviz dot={viz} width={200} height={200} />;
    </div>
  );
}

export default Page;
