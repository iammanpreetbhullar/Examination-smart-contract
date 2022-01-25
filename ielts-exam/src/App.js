import React from 'react';
import { Modal, ModalBody, ModalTitle, Button, Row, Col, Navbar, Nav, Container } from 'react-bootstrap';
import ModalHeader from 'react-bootstrap/esm/ModalHeader';
import ModalFooter from 'react-bootstrap/esm/ModalFooter';
import Form from 'react-bootstrap/Form';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import img from './ieltsfinal.png';
import logo from './logo.png';
import { Cont_Addr, Cont_ABI } from './config';
import Web3 from 'web3';

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
                    "id": "Q1",
                    "text": "Q1. Select your age range.",
                    "answered": false,
                    optn: [
                        {
                            "op": "15-20",
                            "seq": "a",
                            "selected": false
                        },
                        {
                            "op": "21-30",
                            "seq": "b",
                            "selected": false
                        },
                        {
                            "op": "31-40",
                            "seq": "c",
                            "selected": false
                        },
                        {
                            "op": "40 above",
                            "seq": "d",
                            "selected": false
                        }
                    ]
                },
                {
                    "id": "Q2",
                    "text": "Q2. Select the capital of India.",
                    "answered": false,
                    optn: [
                        {
                            "op": "Mumbai",
                            "seq": "a",
                            "selected": false
                        },
                        {
                            "op": "New-Delhi",
                            "seq": "b",
                            "selected": false
                        },
                        {
                            "op": "Kolkata",
                            "seq": "c",
                            "selected": false
                        },
                        {
                            "op": "Gujrat",
                            "seq": "d",
                            "selected": false
                        }
                    ]
                },
                {
                    "id": "Q3",
                    "text": "Q3.Which is your favourit Car brand?",
                    "answered": false,
                    optn: [
                        {
                            "op": "Ferrari",
                            "seq": "a",
                            "selected": false
                        },
                        {
                            "op": "Ford",
                            "seq": "b",
                            "selected": false
                        },
                        {
                            "op": "Tesla",
                            "seq": "c",
                            "selected": false
                        },
                        {
                            "op": "Hyundai",
                            "seq": "d",
                            "selected": false
                        }
                    ]
                },
                {
                    "id": "Q4",
                    "text": "Q4. Which company introduced Windows operating system?",
                    "answered": false,
                    optn: [
                        {
                            "op": "Microsoft",
                            "seq": "a",
                            "selected": false
                        },
                        {
                            "op": "Amazon",
                            "seq": "b",
                            "selected": false
                        },
                        {
                            "op": "Meta",
                            "seq": "c",
                            "selected": false
                        },
                        {
                            "op": "TCS",
                            "seq": "d",
                            "selected": false
                        }
                    ]
                }
            ],
            validated: false,
            showModal: false,
            optionChecked: false,
            uploadDisabled: false,
            uploadHidden: true,
            logOutHidden: true,
            quesBtnHide: true,
            quesBtnDisabled: false,
            resultBtnHide: true,
            resultModalShow: false,
            selectedQues: [],
            loggedInAsDisabled: true,
            currentAcc: "",
            contracts: "",
            contractResult: [],
            navLinksHide: false,
            noteHide: true
        }
    }

    componentDidMount = () => {
        this.load();
    }

    load = async () => {
        const web3 = new Web3('http://localhost:7545');
        const account = await web3.eth.getAccounts();
        this.setState({ currentAcc: account[0] })

        const contract = new web3.eth.Contract(Cont_ABI, Cont_Addr);
        this.setState({ contracts: contract })

        this.getArrayValues();
    }

    getArrayValues = async () => {
        const contract = this.state.contracts;
        const getValues = await contract.methods.getArray().call();
        this.setState({ contractResult: getValues })
        console.log(getValues)
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
        this.setState({ resultModalShow: false })
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
        this.setState({ uploadHidden: false })
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

    login = () => {
        const values = this.state.contractResult;
        values.map(value => {
            if (value !== "" && value !== null) {
                this.setState({ quesBtnDisabled: true })
            }
            else {
                this.setState({ quesBtnDisabled: false })
            }
        })
        this.setState({ quesBtnHide: false },
            () => { this.setState({ isLoginVisible: false }) });
        this.setState({ loggedInAsDisabled: false });
        this.setState({ resultBtnHide: false })
        this.setState({ logOutHidden: false })
        this.setState({ navLinksHide: true })
        setTimeout(() => {
            if (this.state.quesBtnDisabled !== false) {
                this.setState({ noteHide: false })
            }
        }, 200);
    }

    showQuestions = () => {
        this.setState({ isQuestionsVisible: true })
    }

    resultHandle = () => {
        this.state.contractResult.map(result => {

            console.log(result)
        })
        this.setState({ resultModalShow: true })
    }

    callContract = () => {
        const contract = this.state.contracts;
        this.state.selectedQues.map(async (ans) => {
            let answer = ans.ques + " - " + ans.op;
            const updateArray = await contract.methods.push_array(answer).send({ from: this.state.currentAcc })
                .once('receipt', (receipt) => {
                    console.log(receipt)
                })
        })
        setTimeout(() => {
            this.getArrayValues();
        }, 1000);

        this.setState({ uploadDisabled: true })
    }

    logOut = () => {
        window.location.reload();
    }

    render() {
        return (
            <div className='appMainDiv'>
                <Navbar bg="warning" variant="light">
                    <img src={logo} height='50px' />
                    <Navbar.Brand >IELTS Online Examination</Navbar.Brand>
                    <Nav hidden={this.state.navLinksHide} className="me-auto">
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
                        <Button disabled={this.state.uploadDisabled} hidden={this.state.uploadHidden} onClick={this.callContract}>Upload</Button>
                        <Button variant='danger' hidden={this.state.logOutHidden} onClick={this.logOut}>Logout</Button>
                    </div>
                </Navbar>
                <div className='d-flex align-items-center justify-content-around' style={{ height: "90vh" }}>
                    <div><img src={img} style={{ border: "3px solid white", borderRadius: "50px", boxShadow: "0px 0px 20px 0px white" }} />
                    </div>
                    <div>
                        <div style={{ color: "white", width: "100%", fontSize: "60px", textAlign: "center", fontWeight: "bold" }}>
                            IELTS Online Exam
                        </div>
                        <div className='d-flex align-items justify-content-center'>
                            <Button onClick={this.showQuestions} disabled={this.state.quesBtnDisabled} hidden={this.state.quesBtnHide} className='bodyBtn' variant='secondary'>Questionnaire</Button>
                            <div style={{ padding: "10px" }}></div>
                            <Button onClick={this.resultHandle} hidden={this.state.resultBtnHide} className='bodyBtn' variant='secondary'>Result</Button>
                        </div>
                        <div className='d-flex justify-content-center' style={{ color: 'white', marginTop:'10px' }}>
                            <p hidden={this.state.noteHide}><i>*Questionnaire has already been submitted for this user!</i></p>
                        </div>
                    </div>
                </div>
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
                                <Form >
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
                            <Form>
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
                                <ModalHeader className='modalHeader' closeButton>
                                    <ModalTitle className='modalTitle'>
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
                                                            <label className='ques'><b>{ques.text}</b></label>
                                                        </Col>
                                                    </Row>
                                                    <br />
                                                    <Row key={idx} xs={2} md={4} className='justify-content-center'>
                                                        {ques.optn.map(option => {
                                                            return (
                                                                <Col className='d-inline align-items-md-center op'>
                                                                    <input checked={option.selected} type="radio" onClick={() => this.optionSelect(ques.id, option.seq)}></input>
                                                                    <label className='options' onClick={() => this.optionSelect(ques.id, option.seq)}>{option.op}</label>
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
                {this.state.resultModalShow !== false ?
                    <Modal size='sm' centered show={this.handleShow} onHide={() => { this.setState({ resultModalShow: false }) }}>
                        <ModalHeader className='modalHeader' closeButton>
                            <ModalTitle>
                                Result
                            </ModalTitle>
                        </ModalHeader>
                        <ModalBody>
                            {this.state.contractResult.map((ans, idx) => {
                                return (
                                    <div className='resultsDiv'>
                                        <ul>
                                            <li key={idx}>
                                                <b>{ans}</b>
                                            </li>
                                        </ul>
                                    </div>
                                )
                            })}
                        </ModalBody>
                        <ModalFooter>
                            <Button className='btn btn-secondary' onClick={this.handleClose}>Close</Button>
                        </ModalFooter>
                    </Modal>
                    : null}
            </div>
        )
    }
}



export default App;