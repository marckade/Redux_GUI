import ResponsiveAppBar from "../../components/widgets/ResponsiveAppBar";
import { createTheme, List, ListItem, ListItemButton, ListItemText, ThemeProvider, Typograph } from "@mui/material"
import { margin, padding } from "@mui/system";
import {Container,Box} from '@mui/material'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Card } from "react-bootstrap";
import isulogo from "../../components/images/ISULogo.png"
import Image from "next/image";

export default function AboutUsPage() {
    
    const theme = createTheme({
        palette: {
          mode: "light",
          primary: {
            main: "#424242",
          },
          secondary: {
            main:"#f47920"
          }
        }
      });
    
    
    return (
        <>
        <ThemeProvider theme = {theme}>
                <ResponsiveAppBar></ResponsiveAppBar>
                <Container>
                    <br></br>
                <Card>
                    <Card.Header>
                        {"ABOUT US"}
                    </Card.Header>
                    {"Welcome To Redux! This application is a library of NP-Complete problems"}
                    <Card.Body>


                    </Card.Body>
                    </Card>  
                    <br></br>
                    <Card>
                    <Card.Header>
                        {"Contributers"}
                    </Card.Header>
                    {"This Project was created by Kaden, Caleb, Daniel, Alex, Janita, and various others. Paul Bodily is the ISU faculty sponsor."}
                    <Card.Body>


                    </Card.Body>
                    </Card>
                    <br></br>
                    <Card>
                    <Card.Header>
                        {"Learn More"}
                    </Card.Header>
                        {"Additional documentation can be found at the following links"}
                        <List>
                            
                            <ListItemButton href="https://github.com/marckade/Redux_GUI">
                                <ListItemText primary="Github">
                            </ListItemText>
                            </ListItemButton>
                            <ListItemButton href = "https://en.wikipedia.org/wiki/NP-completeness">
                                <ListItemText primary="Wikipedia What is NP-Complete?">
                            </ListItemText>
                            </ListItemButton>
                            <ListItemButton href= "https://docs.google.com/document/d/18IKOGImh5O7Z2elgc4WzhiYUV-VwdjNb7WJFEHIFL-E/edit?usp=sharing">
                                <ListItemText primary="Redux GUI Documentation">
                            </ListItemText>
                            </ListItemButton>
                        </List>
                    <Card.Body>


                    </Card.Body>
                    </Card>
                    </Container>
            </ThemeProvider>
                  <Box

    display="flex"
    justifyContent="center"
    alignItems="center"
    minHeight="10vh"
    // marginTop={'25%'}
    //Tried to push the logo down with the margin
  >
        <Image src={isulogo} height={125} width={500} ></Image>
    </Box>
        </>
    )
}