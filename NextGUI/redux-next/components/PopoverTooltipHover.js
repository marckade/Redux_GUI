


import { OverlayTrigger, Tooltip,Popover,Button} from 'react-bootstrap';



const popover = (
    <Popover id="popover-basic">
      <Popover.Header as="h3">Popover right</Popover.Header>
      <Popover.Body>
        And here's some <strong>amazing</strong> content. It's very engaging.
        right?
      </Popover.Body>
    </Popover>
  );
  
function PopoverTooltipHover() {
  return(
  <OverlayTrigger trigger="click" placement="right" overlay={popover}>
    <Button variant="success">Click me to see</Button>
    </OverlayTrigger>
  )
}
  
export default PopoverTooltipHover;
  
