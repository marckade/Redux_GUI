import React from 'react'
import { useContext, useState, createContext, Component } from 'react'
import { Modal, Button } from "react-bootstrap";
import { ModalDataParser } from '../Modals/modalData';

export const TutorialContext = createContext();

// const reduxBaseUrl = 'http://localhost:27000/'

const modalDataParser = new ModalDataParser();

class Tutorial extends Component {
    state = { // this holds the states of the modal which determines how it renders and behaves
        isOpen: true, //default when open homepage
        modalInstances: [], //all of the different modals
        currentModal: 0,
        lButtonText: "Continue to our main page", //default
        rButtonText: "Check out our tutorial", //default 
    };
    
    //setters

    openModal = () => this.setState({ isOpen: true });

    closeModal = () => this.setState({ isOpen: false });
    
    // nextModal = () => this.setState({ currentModal: this.state.currentModal + 1 });
    nextModal = () => {
        this.setState({ lButtonText: "Previous" })
        // if (this.state.currentModal == modalDataParser.getModalDataLength()) {
        //     this.setState({ isOpen: false });
        // }
        // else 
        if (this.state.currentModal == modalDataParser.getModalDataLength() - 1) {
            console.log("in if currentModal == modalDataLength - 1")
            console.log("length: " + modalDataParser.getModalDataLength())
            this.setState({ rButtonText: "End of the line. Go to main page." })
        }
        else {
            this.setState({ rButtonText: "Next" })
            this.setState({ currentModal: this.state.currentModal + 1 })
        }
    }

    // prevModal = () => this.setState({ currentModal: currentModal - 1 }); 
    prevModal = () => {
        if (this.state.currentModal == 0) {
            //You are on Modal 0, you hit cont to main pg, modal should close.
            // this.closeModal
            this.setState({ isOpen: false });
            console.log("in if currentModal == 0")
            
            // this.setState({ lButtonAction: this.closeModal })
            // this.setState({ lButtonText: "Continue to our main page" })
        }
        else if (this.state.currentModal == 1) {
            //You are on Modal 1, hit prev button so text should change to below and you go to Modal 0.
            this.setState({ currentModal: this.state.currentModal - 1 })
            this.setState({ lButtonText: "Continue to our main page" })
        }
        else {
            //You are on Modal 2 or higher, hit prev button, should take you back and keep text as prev.
            this.setState({ currentModal: this.state.currentModal - 1 })
            this.setState({ lButtonText: "Previous" })
        }
    }

    render() {
        return (
            <>
            <Modal show={this.state.isOpen} onHide={this.closeModal}>
                <Modal.Header closeButton>
                <Modal.Title>WELCOME TO REDUX!</Modal.Title>
                </Modal.Header>
                <Modal.Body>{modalDataParser.getModalData(this.state.currentModal)}</Modal.Body>
                
                <h2>ID of this modal is {this.state.currentModal}</h2>
                
                <Modal.Footer>
               
               {/* Left Button */}
                <Button variant="secondary" onClick={this.prevModal}>
                    {/* Continue to our main page */}
                    {this.state.lButtonText}
                </Button>
                
                {/* Right Button */}
                <Button variant="secondary" onClick={this.nextModal}>
                    {/* Check out our tutorial */}
                    {this.state.rButtonText}
                </Button>
                
                </Modal.Footer>
            </Modal>
            </>
        );
    }
}
    
export default Tutorial;