import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const Graphviz = dynamic(() => import("graphviz-react"), { ssr: false });

const graphTest = `graph G {  
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
  // const dot = "graph{a--b}";

  // const [data, setData] = useState("");

  useEffect(() => {
    getData();
  }, [props]);

  async function getData() {
    console.log(props.name);
    //props.name+Generic/ props.instance
    // fetch(`http://redux.aws.cose.isu.edu:27000/${props.name}Generic/instance?problemInstance=${props.instance}`)
    fetch("http://redux.aws.cose.isu.edu:27000/GRAPHCOLORINGGeneric")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
  }

  return (
    <div>
      <Graphviz dot={graphTest} options={[true, 50, 50, true]} />;
    </div>
  );
}

export default Page;
