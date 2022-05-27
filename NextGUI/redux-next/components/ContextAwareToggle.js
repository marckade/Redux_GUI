import { useState, useContext } from 'react'
import { AccordionContext, AccordionButton, AccordionCollapseProps, Accordion, useAccordionButton, Card } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'


  
  function Example(prop) {
    return (
      <Accordion defaultActiveKey="0">
      <Accordion.Item eventKey="0">
        <Accordion.Header>Accordion Item #1</Accordion.Header>
          <Accordion.Body>
            {prop.text1}
         
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="1">
        <Accordion.Header>Accordion Item #2</Accordion.Header>
          <Accordion.Body>
            {prop.text2}
        
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
    );
  }
  
 export default Example