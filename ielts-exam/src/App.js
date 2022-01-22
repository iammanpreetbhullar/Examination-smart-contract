import React, { useState } from 'react';
import { Modal, ModalBody, ModalTitle, Button, Row, Col, Navbar, Nav, Container } from 'react-bootstrap';
import ModalHeader from 'react-bootstrap/esm/ModalHeader';
import Form from 'react-bootstrap/Form';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoginVisible: false,
            isSignUpVisible: false,
            isQuestionsVisible: false,
            userDetails: {
                "firstName": "Manpreet",
                "lastName": "Singh",
                "email": "manpreet@mymail.com",
                "password": "1234"
            },
            currentUser: {
                "email": "",
                "password": ""
            },
            validated: false,
            showModal: false
        }
    }


    showLoginModal = () => {
        this.setState({ isLoginVisible: true })
    }
    showSignUpModal = () => {
        this.setState({ isSignUpVisible: true })
    }

    handleShow = () => this.setState({ showModal: true })
    handleClose = () => this.setState({ showModal: false })

    handlechange = (event) => {
        const option = event.target.id;
        const value = event.target.value;
        const copy = this.state.userDetails;
        copy[option] = value;
        this.setState({ userDetails: copy })
    }

    handleLoginChange = (event) => {
        const option = event.target.id;
        const value = event.target.value;
        const copy = this.state.currentUser;
        copy[option] = value;
        this.setState({ currentUser: copy })

    }

    signUp = () => {
        this.setState({ isSignUpVisible: false })
    }

    handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }

        this.setState.validated(true);
    };

    submitQues = () => {
        this.setState({ isQuestionsVisible: false })

    }

    // openQues = () => this.setState({ isQuestionsVisible: true })

    login = () => {
        this.setState({ isQuestionsVisible: true },
            () => { this.setState({ isLoginVisible: false }) })
    }
    render() {
        return (
            <div className='appMainDiv'>
                <Navbar bg="warning" variant="light">
                    <Container>
                        <Navbar.Brand >IELTS Online Examination</Navbar.Brand>
                        <Nav className="me-auto">
                            <Nav.Link onClick={this.showLoginModal}>Login</Nav.Link>
                            <Nav.Link onClick={this.showSignUpModal}>Sign Up</Nav.Link>
                        </Nav>
                        <Navbar.Toggle />
                        <Navbar.Collapse className="justify-content-end">
                            <Navbar.Text>
                                <a href="#login"></a>
                            </Navbar.Text>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
                {this.state.isLoginVisible !== false ?
                    <div>
                        <Modal size='md' aria-labelledby="contained-modal-title-vcenter"
                            centered show={this.handleShow} onHide={() => { this.setState({ isLoginVisible: false }) }} >
                            <ModalHeader closeButton>
                                <ModalTitle id="contained-modal-title-vcenter">
                                    Examination Login
                                </ModalTitle>
                            </ModalHeader>
                            <ModalBody >
                                <Form onSubmit={this.handleSubmit}>
                                    <Row className="mb-3">
                                        <Form.Group as={Col} >
                                            <Form.Control
                                                type="email"
                                                id="email"
                                                placeholder="E-mail"
                                                value={this.state.currentUser.email}
                                                onChange={this.handleLoginChange}
                                            />
                                        </Form.Group>
                                    </Row>
                                    <Row className="mb-3">
                                        <Form.Group as={Col} >
                                            <Form.Control
                                                type="password"
                                                id="password"
                                                placeholder="Password"
                                                value={this.state.currentUser.password}
                                                onChange={this.handleLoginChange}
                                            />
                                        </Form.Group>
                                    </Row>
                                    <div className="d-flex flex-row-reverse align-content-end">
                                        <Button type="close" className='btn btn-secondary' onClick={this.handleClose}>Cancel</Button>
                                        <Button className='btn btn-warning mx-2' onClick={this.login}>Login</Button>
                                    </div>
                                </Form>
                            </ModalBody>
                        </Modal>
                    </div>
                    : null}
                {this.state.isSignUpVisible !== false ?
                    <Modal size='md' aria-labelledby="contained-modal-title-vcenter"
                        centered show={this.handleShow} onHide={() => { this.setState({ isSignUpVisible: false }) }} >
                        <ModalHeader closeButton>
                            <ModalTitle id="contained-modal-title-vcenter">
                                Examination Sign Up
                            </ModalTitle>
                        </ModalHeader>
                        <ModalBody >
                            <Form onSubmit={this.handleSubmit}>
                                <Row className="mb-3">
                                    <Form.Group as={Col} >
                                        <Form.Control
                                            type="text"
                                            id="firstName"
                                            placeholder="First Name"
                                            value={this.state.userDetails.firstName}
                                            onChange={this.handlechange}
                                        />
                                    </Form.Group>
                                </Row>
                                <Row className="mb-3">
                                    <Form.Group as={Col} >
                                        <Form.Control
                                            type="text"
                                            id="lastName"
                                            placeholder="Last Name"
                                            value={this.state.userDetails.lastName}
                                            onChange={this.handlechange}
                                        />
                                    </Form.Group>
                                </Row>
                                <Row className="mb-3">
                                    <Form.Group as={Col} >
                                        <Form.Control
                                            type="email"
                                            id="email"
                                            placeholder="E-mail"
                                            value={this.state.userDetails.email}
                                            onChange={this.handlechange}
                                        />
                                    </Form.Group>
                                </Row>
                                <Row className="mb-3">
                                    <Form.Group as={Col} >
                                        <Form.Control
                                            type="password"
                                            id="password"
                                            placeholder="Password"
                                            value={this.state.userDetails.password}
                                            onChange={this.handlechange}
                                        />
                                    </Form.Group>
                                </Row>
                                <div className="d-flex flex-row-reverse align-content-end">
                                    <Button type="close" className='btn btn-secondary' onClick={this.handleClose}>Cancel</Button>
                                    <Button className='btn btn-warning mx-2' onClick={this.signUp}>Sign Up</Button>
                                </div>
                            </Form>
                        </ModalBody>
                    </Modal>
                    : null}
                {this.state.isQuestionsVisible !== false ?
                    <>
                        {this.state.currentUser.email === this.state.userDetails.email && this.state.currentUser.password === this.state.userDetails.password ?
                            <Modal size='lg' aria-labelledby="contained-modal-title-vcenter"
                                centered show={this.handleShow} onHide={() => { this.setState({ isQuestionsVisible: false }) }} >
                                <ModalHeader closeButton>
                                    <ModalTitle id="contained-modal-title-vcenter">
                                        Questionnaire
                                    </ModalTitle>
                                </ModalHeader>
                                <ModalBody>

                                </ModalBody>
                                <div className="d-flex flex-row-reverse align-content-end">
                                    <Button type="close" className='btn btn-secondary' onClick={this.submitQues}>Cancel</Button>
                                    <Button type='submit' className='btn btn-warning mx-2' onClick={this.submitQues}>Submit</Button>
                                </div>
                            </Modal>
                            : alert("Retry with correct credentials")}
                    </>
                    : null}
            </div>
        )
    }
}



export default App;