import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const Graphviz = dynamic(() => import("graphviz-react"), { ssr: false });


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

  const [visualization, setVisualization]= useState('')

  // const [data, setData] = useState("");

  useEffect(() => {
    console.log(`${props.visualization}\n`)
    // getData();
    draw();
   console.log(visualization)
  }, [props]);

  
  //problemName
  function draw() {
    //console.log("Draw \n")
    viz = graphTest
    setVisualization(graphTest)

    return
  }



  return (
  
    <Graphviz dot={graphTest} width={200} height={200} />

  );
}

export default Page;
