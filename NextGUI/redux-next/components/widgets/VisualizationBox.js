
import SAT3_SVG_React from '../Visualization/svgs/SAT3_SVG_React';
import ReducedVisualizations from "../Visualization/ReducedVisualization";
import { getClique } from '../Visualization/svgs/Sat3ToCliqueReduction';
import { getSat3 } from '../Visualization/svgs/Sat3ToCliqueInstance'
import CLIQUE_SVG_REACT from '../Visualization/svgs/CLIQUE_SVG_REACT';
import Split from 'react-split';
import { Container } from '@mui/material';

export default function VisualizationBox({reduceToggled,loading,problemVisualizationData,reducedVisualizationData}) {
    console.log(reduceToggled,loading)
    if (reduceToggled && !loading) {

        return (
            <Container>
            <Split class="wrap" direction='horizontal'>
                    <SAT3_SVG_React data={problemVisualizationData}></SAT3_SVG_React>
                    <CLIQUE_SVG_REACT data={reducedVisualizationData}></CLIQUE_SVG_REACT>
            </Split>
            </Container>
        )
    }
    else if (!reduceToggled && !loading) {
        return (
            <>
                {""}
                <Container>
                    <SAT3_SVG_React data={problemVisualizationData}></SAT3_SVG_React>
                    </Container>
                </>)
    }
    return (<>
    {"LOADING"}
    </>
    )
}