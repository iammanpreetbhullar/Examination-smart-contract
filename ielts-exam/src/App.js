import React from 'react';
import { Modal, ModalBody, ModalTitle, Button, Row, Col, Navbar, Nav, Container } from 'react-bootstrap';
import ModalHeader from 'react-bootstrap/esm/ModalHeader';
import ModalFooter from 'react-bootstrap/esm/ModalFooter';
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
            isAlertVisible: false,
            userDetails:
            {
                "firstName": "Manpreet",
                "lastName": "Singh",
                "email": "manpreet@mymail.com",
                "password": "1234"
            },
            currentUser: {
                "email": "",
                "password": ""
            },
            questions: [
                {
                    "id": 1,
                    "text": "Q1. Select your age range.",
                    "answered": false,
                    optn: [
                        {
                            "op": "15-20",
                            "seq": 1,
                            "selected": false
                        },
                        {
                            "op": "21-30",
                            "seq": 2,
                            "selected": false
                        },
                        {
                            "op": "31-40",
                            "seq": 3,
                            "selected": false
                        },
                        {
                            "op": "40 above",
                            "seq": 4,
                            "selected": false
                        }
                    ]
                },
                {
                    "id": 2,
                    "text": "Q2. Select the capital of India.",
                    "answered": false,
                    optn: [
                        {
                            "op": "Mumbai",
                            "seq": 1,
                            "selected": false
                        },
                        {
                            "op": "New-Delhi",
                            "seq": 2,
                            "selected": false
                        },
                        {
                            "op": "Kolkata",
                            "seq": 3,
                            "selected": false
                        },
                        {
                            "op": "Gujrat",
                            "seq": 4,
                            "selected": false
                        }
                    ]
                },
                {
                    "id": 3,
                    "text": "Q3.Which is your favourit Car brand?",
                    "answered": false,
                    optn: [
                        {
                            "op": "Ferrari",
                            "seq": 1,
                            "selected": false
                        },
                        {
                            "op": "Ford",
                            "seq": 2,
                            "selected": false
                        },
                        {
                            "op": "Tesla",
                            "seq": 3,
                            "selected": false
                        },
                        {
                            "op": "Hyundai",
                            "seq": 4,
                            "selected": false
                        }
                    ]
                },
                {
                    "id": 4,
                    "text": "Q4. Which company introduced Windows operating system?",
                    "answered": false,
                    optn: [
                        {
                            "op": "Microsoft",
                            "seq": 1,
                            "selected": false
                        },
                        {
                            "op": "Amazon",
                            "seq": 2,
                            "selected": false
                        },
                        {
                            "op": "Meta",
                            "seq": 3,
                            "selected": false
                        },
                        {
                            "op": "TCS",
                            "seq": 4,
                            "selected": false
                        }
                    ]
                }
            ],
            validated: false,
            showModal: false,
            optionChecked: false,
            uploadDisabled: true,
            selectedQues: [],
            loggedInAsDisabled: true
        }
    }


    showLoginModal = () => {
        this.setState({ isLoginVisible: true })
    }
    showSignUpModal = () => {
        this.setState({ isSignUpVisible: true })
    }

    handleShow = () => this.setState({ showModal: true })

    handleClose = () => {
        this.setState({ showModal: false })
        this.setState({ isAlertVisible: false })
        this.setState({ isLoginVisible: false })
        this.setState({ isSignUpVisible: false })
        this.setState({ isQuestionsVisible: false })
    }

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

    questSubmit = () => {
        let questions = this.state.questions;

        questions.map(quest => {
            quest.answered = true;
            quest.optn.map(option => {
                if (option.selected === true) {
                    let obj = { "ques": quest.id, "op": option.seq };
                    this.state.selectedQues.push(obj);
                }
            })
        })

        this.setState({ uploadDisabled: false })
        this.handleClose();
    }

    optionSelect = (qId, opId) => {
        let questions = this.state.questions;
        questions.map(quest => {
            if (quest.id === qId) {
                quest.answered = true;
                quest.optn.map(option => {
                    if (option.seq === opId) {
                        option.selected = true;
                    }
                    else {
                        option.selected = false;
                    }
                })
            }
        })
        this.setState({
            questions
        })
    }

    handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        this.setState.validated(true);
    };

    login = () => {
        this.setState({ loggedInAsDisabled: false });
        this.setState({ isQuestionsVisible: true },
            () => { this.setState({ isLoginVisible: false }) });
    }

    
        
    

    callContract = () => {
        alert(JSON.stringify(this.state.selectedQues))
        window.location.reload();
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
                            <Navbar.Text hidden={this.state.loggedInAsDisabled}>
                                Logged In as:  <b>{this.state.currentUser.email}</b>
                            </Navbar.Text>
                        </Navbar.Collapse>
                        <div className='uploadBtn'>
                            <Button hidden={this.state.uploadDisabled} onClick={this.callContract}>Upload</Button>
                        </div>
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
                                        <Button className='btn btn-secondary' onClick={this.handleClose}>Cancel</Button>
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
                                    <Button className='btn btn-secondary' onClick={this.handleClose}>Cancel</Button>
                                    <Button className='btn btn-warning mx-2' onClick={this.handleClose}>Sign Up</Button>
                                </div>
                            </Form>
                        </ModalBody>
                    </Modal>
                    : null}
                {this.state.isQuestionsVisible !== false ?
                    <>
                        {this.state.currentUser.email === this.state.userDetails.email && this.state.currentUser.password === this.state.userDetails.password ?
                            <Modal size='xl' centered show={this.handleShow} onHide={() => { this.setState({ isQuestionsVisible: false }) }} >
                                <ModalHeader closeButton>
                                    <ModalTitle >
                                        Questionnaire
                                    </ModalTitle>
                                </ModalHeader>
                                <ModalBody>
                                    <Container fluid="md">
                                        {this.state.questions.map((ques, idx) => {
                                            return (
                                                <div key={idx}>
                                                    <Row>
                                                        <Col className='md-12 q'>
                                                            <label><b>{ques.text}</b></label>
                                                        </Col>
                                                    </Row>
                                                    <br />
                                                    <Row key={idx} xs={2} md={4} className='justify-content-center'>
                                                        {ques.optn.map(option => {
                                                            return (
                                                                <Col className='d-inline align-items-md-center op'>
                                                                    <input checked={option.selected} type="radio" onClick={() => this.optionSelect(ques.id, option.seq)}></input>
                                                                    <label onClick={() => this.optionSelect(ques.id, option.seq)}>{option.op}</label>
                                                                </Col>
                                                            )
                                                        })}
                                                    </Row>
                                                </div>
                                            )
                                        })}
                                    </Container>
                                </ModalBody>
                                <ModalFooter>
                                    <div className="d-flex flex-row-reverse align-content-end">
                                        <Button className='btn btn-secondary' onClick={this.handleClose}>Cancel</Button>
                                        <Button type='submit' className='btn btn-warning mx-2' onClick={this.questSubmit}>Submit</Button>
                                    </div>
                                </ModalFooter>
                            </Modal>
                            : null}
                    </>
                    : null}
            </div>
        )
    }
}



export default App;