

function VisualizeRow() {
    return (
        <>
            {/**<!-- Visualize Row --> */}
            <div className="row align-items-start" id="visualizeRow" >
                <div className="card mb-2 shadow-sm">
                    <div className="card-body row">
                        {/**<!-- Label --> */}
                        <div className="col-2 col-sm-3 col-md-2">
                            <h6 className="card-title mt-2">Visualize</h6>
                        </div>
                        {/**            <!-- Middle --> */}
                        <div className="col">
                            <div className="row mt-1">
                                <div className="col-12 col-lg-4">
                                    <div className="col form-check form-switch">
                                        <label className="form-check-label" htmlFor="switchHighlightSolution">Highlight solution</label>
                                        <input className="form-check-input" type="checkbox" role="switch" id="switchHighlightSolution" />
                                    </div>
                                </div>

                                <div className="col-12 col-lg-4">
                                    <div className="col form-check form-switch">
                                        <label className="form-check-label" htmlFor="switchHighlightGadgets">Highlight gadgets</label>
                                        <input className="form-check-input" type="checkbox" role="switch" id="switchHighlightGadgets" />
                                    </div>
                                </div>

                                <div className="col-12 col-lg-4">
                                    <div className="col form-check form-switch">
                                        <label className="form-check-label" htmlFor="switchShowReduction">Show reduction</label>
                                        <input className="form-check-input" type="checkbox" role="switch" id="switchShowReduction" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/*<!-- Chevron -->*/}
                        <div className="col-1">
            
                            <div className="accordion-button collapsed" data-bs-toggle="collapse" href="#collapseArea3" role="button" aria-expanded="false" aria-controls="collapseArea3"></div>
                        </div>

                        {/*<!-- Collapse -->*/}
                        <div className="collapse" id="collapseArea3">
                            <div className="row mt-3">
                                <div className="col-2 col-sm-3 col-md-2">
                                </div>
                                <div className="col">

                                    {/*<!-- <svg id="reduceInstanceSvg" width="1000" height="1000"></svg> -->*/}
                                    <svg id="reduceInstanceSvg" width="1000" height="1000"></svg>

                                </div>
                                <div className="col-1">
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
    
}
export default VisualizeRow