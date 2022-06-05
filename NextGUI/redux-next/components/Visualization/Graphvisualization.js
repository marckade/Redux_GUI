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
    //console.log(viz)
  }, [props]);

  
  //problemName
  function draw() {
    //console.log("Draw \n")
    viz = graphTest
    // console.log(props.problem)
  

    return

  }

  return (
    <div id="problemVisualization" style={imgStyle}>
      {/**console.log("Viz \n"+viz)*/}
      <Graphviz dot={graphTest} width={200} height={200} />;
    </div>
  );
}

export default Page;
