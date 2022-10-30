import NavGraph, { nodesList, edgeList } from '../../components/widgets/SearchBars/testAutoProb';
import ResponsiveAppBar from "../../components/widgets/ResponsiveAppBar";
import { useEffect, useState, useRef } from "react";
import PopoverTooltipClick from '../../components/widgets/PopoverTooltipClick';
import { Overlay, Popover } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Box, createTheme, ThemeProvider } from '@mui/material';


/**
 * 
 * @param {*} url the base url of the application 
 * @param {*} name The name of the selected problem
 * @returns A promise from the passed in url. 
 */
async function requestProblemData(url, name) {
    console.log(name)
    return await fetch(url + name + "Generic").then(resp => {
        if (resp.ok) {
            return resp.json()
        }
    });

}


export default function Test(props) {


    const [tool, setToolTip] = useState({});
    const [nodeTarget, setTarget] = useState();
    const [show, setShow] = useState(false);
    const ref = useRef(null);
    // let popoverList = {}
    const popoverList = new Map();

    const theme = createTheme({
        palette: {
            mode: "light",
            primary: {
                main: "#424242",
            },
            secondary: {
                main: "#f47920"
            }
        }
    });

    useEffect(() => {

        setTimeout(() => {
            for (let elem of nodesList) {
                // console.log(elem)
                let node = document.getElementById(elem)
                const ellipseArray = node.getElementsByTagName('ellipse');
                node.addEventListener('mouseover', function () {
                    ellipseArray[0].setAttribute("fill", "#f69240")
                })

                node.addEventListener('mouseout', function () {
                    ellipseArray[0].setAttribute("fill", "none")
                })

                // node.addEventListener('click', function (e) {
                //   console.log("This is node = ")
                //   console.log(node)
                //   let nodeId = node.id;
                //   let target = (e.target);
                //   console.log("Target name :: "+target.tagName);
                //   console.log("Node name :: "+ nodeId)
                //   setToolTip(popoverList.get(nodeId))
                //   // if (target.tagName === 'ellipse') {
                //   requestProblemData('http://localhost:27000/', nodeId).then(data => {
                //     if (!(typeof data === "undefined")) {
                //       //console.log(data);
                //       setToolTip({ header: nodeId, formalDef: data.formalDefinition, info: data.problemDefinition + data.source })
                //     }
                //   }).catch(console.log("Problem not defined"));

                //   setTarget(node);
                //   // setToolTip(toolTip);
                //   setShow(true);

                //   // }else{
                //   //   setShow(false);
                //   // }
                // })

                requestProblemData('http://localhost:27000/', elem).then(data => {
                    if (!(typeof data === "undefined")) {
                        //console.log(data);
                        popoverList.set(elem, setToolTip({ header: elem, formalDef: data.formalDefinition, info: data.problemDefinition + data.source }))
                    }
                }).catch(console.log("Problem not defined"));


            }
        }, 2000);

    }, [])



    return (



            <ThemeProvider theme={theme}>
                <ResponsiveAppBar></ResponsiveAppBar>

                
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight="10vh">


                <div ref={ref}>
                    <NavGraph />
                    {/* <Button onClick={handleClick}>Holy guacamole!</Button> */}

                    <Overlay
                        rootClose={true}
                        show={show}
                        target={nodeTarget}
                        placement="bottom"
                        container={ref}
                        containerPadding={20}
                    >
                        <Popover id="popover-basic" className="tooltip">

                            <Popover.Header as="h3">
                                {tool.header}
                            </Popover.Header>

                            <Popover.Body>
                                {tool.formalDef}
                                <br></br>
                                <br></br>
                                {tool.info}
                                <br></br>
                                <br></br>
                                {tool.source}
                                <br></br><br></br>
                                {tool.credit}
                            </Popover.Body>

                        </Popover>
                    </Overlay>
                </div>
                </Box>
            </ThemeProvider>
     

    );




}