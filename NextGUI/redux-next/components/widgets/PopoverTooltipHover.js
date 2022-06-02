


import { OverlayTrigger, Tooltip,Popover,Button} from 'react-bootstrap';
import { SvgIcon } from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

function popOver(props) {
  
  return(
  <Popover id="popover-basic" className="tooltip">
    <Popover.Header as="h3">
    </Popover.Header>
    <Popover.Body>
      {props.popupText}
    </Popover.Body>
  </Popover>
  );

}
  
function PopoverTooltipHover(props) {
 
  return(
    <OverlayTrigger trigger={["hover","focus"]} placement="top" overlay={popOver(props)}>
      
      <InfoOutlinedIcon>
        <Button variant="success">
        </Button>
        </InfoOutlinedIcon>
     
      
    </OverlayTrigger>
  )
}
  
export default PopoverTooltipHover;
  
