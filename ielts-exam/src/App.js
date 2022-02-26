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
import { ethers } from 'ethers';

class App extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         isLoginVisible: false,
         isSignUpVisible: false,
         isQuestionsVisible: false,
         isAlertVisible: false,
         userDetails: [
            {
               "id": 1001,
               "firstName": "Manpreet",
               "lastName": "Singh",
               "email": "manpreet@mymail.com",
               "password": "1234",
               "type": "admin"
            },
            {
               "id": 2001,
               "firstName": "Harpreet",
               "lastName": "Singh",
               "email": "harpreet@mymail.com",
               "password": "1234",
               "type": "user"
            },
            {
               "id": 2002,
               "firstName": "Gurpreet",
               "lastName": "Singh",
               "email": "gurpreet@mymail.com",
               "password": "1234",
               "type": "user"
            },
            {
               "id": 2003,
               "firstName": "Rajwinder",
               "lastName": "Kaur",
               "email": "rajwinder@mymail.com",
               "password": "1234",
               "type": "user"
            },
         ],
         currentUser: {
            "id": 0,
            "firstName": "",
            "lastName": "",
            "email": "",
            "password": "",
            "type": ""
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
         selectedAns: "",
         loggedInAsDisabled: true,
         currentAcc: "",
         contracts: "",
         contractResult: [],
         navLinksHide: false,
         noteHide: true,
         getResultHidden: false,
         inputHidden: true,
         inputId: { "id": 0 },
         resultById: {},
         allResultBtnHidden: true,
         resultByIdModalShow: false,
         allResultModalShow: false,
         allResult: [],
         resultNoteHide: true,
         signer: ""
      }
   }

   componentDidMount = () => {
      this.load();
   }

   load = async () => {
      //const web3 = new Web3('http://localhost:7545');
      const provider = new ethers.providers.Web3Provider(window.ethereum);
     // await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      const account = await signer.getAddress();
      const contract = new ethers.Contract(Cont_Addr, Cont_ABI, signer);
      this.setState({ currentAcc: account, signer: signer, contracts: contract  })
      //const contract = new web3.eth.Contract(Cont_ABI, Cont_Addr);
      this.getAllResults();
   }


   getStudentMarks = async (id) => {
      const {signer, contracts, contractResult} = this.state;
      let answers = "";
      let studentName = "";
      const res = await contracts.getStudentMarks(id);
      console.log(res);
      studentName = res.Name;
      answers = res.Answers
      let newArray = [];
      newArray = Array.from(answers.split(", "));
      contractResult.push({ "Name": studentName, "Answers": newArray });
      this.setState({ contractResult });
   }


   getAllResults = async () => {
      const { allResult, contracts } = this.state
      const res = await contracts.getAllStudentsMarks();
      console.log(res);

      allResult.push({ "ids": res.ids, "names": res.names, "ans": res.answers })

      let newArray = [];
      for (let i = 0; i < allResult[0].names.length; i++) {
         newArray.push({ "id": allResult[0].ids[i], "name": allResult[0].names[i], "ans": allResult[0].ans[i] })
      }
      console.log(newArray)
      if (this.state.quesBtnDisabled !== false) {
         this.setState({ noteHide: false })
      }
      this.setState({ allResult: newArray })
   }

   showCompletResult = () => {
      this.setState({ allResultModalShow: true })
   }

   showLoginModal = () => {
      this.setState({ isLoginVisible: true, inputHidden: true, getResultHidden: false })
   }

   showSignUpModal = () => {
      this.setState({ isSignUpVisible: true })
   }

   handleShow = () => this.setState({ showModal: true })

   handleClose = () => {
      this.setState({ showModal: false, isAlertVisible: false, isLoginVisible: false, isSignUpVisible: false, isQuestionsVisible: false, resultModalShow: false, resultByIdModalShow: false, allResultModalShow: false })
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
      this.concatAnswers();
      this.handleClose();
   }

   concatAnswers = () => {
      let { selectedAns } = this.state;
      this.state.selectedQues.map((ans) => {
         selectedAns = selectedAns.concat(ans.ques + " - " + ans.op + ", ");
      })

      this.setState({ selectedAns })
   }

   optionSelect = (qId, opId) => {
      let { questions } = this.state;
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
      const { currentUser, allResult } = this.state;
      const loggedInUser = this.state.userDetails.find(({ email }) => email === currentUser.email);
      this.setState({
         currentUser: loggedInUser
      });

      allResult.map(item => {
         if (loggedInUser.id === item.id) {
            this.setState({ noteHide: false, quesBtnDisabled: true })
         } else {
            this.setState({ noteHide: true, quesBtnDisabled: false })
         }
      });
     
      this.setState({ quesBtnHide: false },
         () => { this.setState({ isLoginVisible: false }) });
      this.setState({ loggedInAsDisabled: false, logOutHidden: false, allResultBtnHidden: false, navLinksHide: true, getResultHidden: true })
   }


   showQuestions = () => {
      console.log(this.state.currentUser)
      this.setState({ isQuestionsVisible: true })
   }

   resultHandle = () => {
      this.setState({ resultModalShow: true })
   }

   callContract = async () => {
      const {contracts} = this.state;
      const finalId = this.state.currentUser.id;
      const name = this.state.currentUser.firstName + " " + this.state.currentUser.lastName;
      const finalAns = this.state.selectedAns.slice(0, -2);    
      const receipt = await contracts.addMarks(finalId, name, finalAns);
      console.log(receipt)
      setTimeout(() => {
         this.getStudentMarks(finalId)
      }, 20000);
      this.setState({ uploadDisabled: true, quesBtnDisabled: true, resultBtnHide: false })
   }

   showInput = () => {
      this.setState({ inputHidden: false, getResultHidden: true })
   }

   goBack = () => {
      this.setState({ inputHidden: true, getResultHidden: false, resultNoteHide: true })
   }

   getresult = () => {
      this.getStudentMarks();
   }

   handleInput = (event) => {
      const { id, value } = event.target;
      const copy = this.state.inputId;
      copy[id] = value;
      this.setState({ inputId: copy })
   }

   showResultOfId = async () => {
      const inputId = parseInt(this.state.inputId.id);
      const { allResult, contracts } = this.state;
      await contracts.getStudentMarks(inputId)
         .then(res => {
            this.setState({ resultById: { "Name": res.Name, "Answers": res.Answers } })
         })
      let newId = allResult.find(item => inputId === item.id);
      if (newId) {
         this.setState({ resultByIdModalShow: true, resultNoteHide: true })
      } else {
         this.setState({ resultByIdModalShow: false, resultNoteHide: false })
      }
   }

   logOut = () => {
      window.location.reload();
   }


   render() {
      const { currentUser } = this.state;
      return (
         <div className='appMainDiv'>
            <Navbar bg="warning" variant="light">
               <img src={logo} alt="logo" height='50px' />
               <Navbar.Brand >IELTS Online Examination</Navbar.Brand>
               <Nav hidden={this.state.navLinksHide} className="me-auto">
                  <Nav.Link onClick={this.showLoginModal}>Login</Nav.Link>
                  {/* <Nav.Link onClick={this.showSignUpModal}>Sign Up</Nav.Link> */}
               </Nav>
               <Navbar.Toggle />
               <Navbar.Collapse className="justify-content-end">
                  <Navbar.Text hidden={this.state.loggedInAsDisabled}>
                     Logged In as:  <b>{currentUser.firstName + " " + currentUser.lastName}</b>
                  </Navbar.Text>
               </Navbar.Collapse>
               <div className='uploadBtn'>
                  <Button disabled={this.state.uploadDisabled} hidden={this.state.uploadHidden} onClick={this.callContract}>Upload</Button>
                  <Button variant='danger' hidden={this.state.logOutHidden} onClick={this.logOut}>Logout</Button>
               </div>
            </Navbar>
            <div className='d-flex align-items-center justify-content-around' style={{ height: "90vh" }}>
               <div><img src={img} alt="bodyImage" style={{ borderRadius: "50px", boxShadow: "0px 0px 20px 0px white" }} />
               </div>
               <div>
                  <div style={{ color: "white", width: "100%", fontSize: "60px", textAlign: "center", fontWeight: "bold" }}>
                     IELTS Online Exam
                  </div>
                  <div className='d-flex justify-content-center'>
                     <input className='me-2' id='id' type='text' placeholder='Your Registration ID' onChange={this.handleInput} hidden={this.state.inputHidden} />
                     <Button className='me-2' onClick={this.showResultOfId} hidden={this.state.inputHidden} variant='warning'>Show Result</Button>
                     <Button onClick={this.goBack} hidden={this.state.inputHidden} variant='secondary'>Go Back</Button>
                     <Button onClick={this.showInput} hidden={this.state.getResultHidden} variant='secondary'>Get Result by ID</Button>
                     {this.state.currentUser.type !== "admin" ?
                        <div>
                           <Button onClick={this.showQuestions} disabled={this.state.quesBtnDisabled} hidden={this.state.quesBtnHide} className='me-2' variant='secondary'>Questionnaire</Button>
                           <Button onClick={this.resultHandle} hidden={this.state.resultBtnHide} variant='secondary'>Your submission</Button>
                        </div>
                        :
                        <Button onClick={this.showCompletResult} hidden={this.state.allResultBtnHidden} className='bodyBtn me-2' variant='secondary'>All Result</Button>
                     }
                  </div>
                  <div className='d-flex justify-content-center' style={{ color: 'white', marginTop: '10px' }}>
                     <p hidden={this.state.resultNoteHide}><i>Kindly enter the correct Registration ID!</i></p>
                  </div>
                  <div className='d-flex justify-content-center' style={{ color: 'white', marginTop: '10px' }}>
                     <p hidden={this.state.noteHide}><i>*Questionnaire has already been submitted for this user!</i></p>
                  </div>
               </div>
            </div>
            {/* <<<<<<<<<<<< Login Modal >>>>>>>>>>>>>> */}
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
            {/* <<<<<<<<<< Sign Up Modal >>>>>>>>>> */}
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
            {/* <<<<<<<<< Questionnaire Modal >>>>>>>>>> */}
            {this.state.isQuestionsVisible !== false ?
               <>
                  {this.state.currentUser.type !== "admin" ?
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
                                          {ques.optn.map((option, ind) => {
                                             return (
                                                <Col key={ind} className='d-inline align-items-md-center op'>
                                                   <input checked={option.selected} type="radio" onChange={() => this.optionSelect(ques.id, option.seq)}></input>
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
            {/* <<<<<<<< Your submission Modal >>>>>>>>> */}
            {this.state.resultModalShow !== false ?
               <Modal size='sm' centered show={this.handleShow} onHide={() => { this.setState({ resultModalShow: false }) }}>
                  <ModalHeader className='modalHeader' closeButton>
                     <ModalTitle>
                        Your submission
                     </ModalTitle>
                  </ModalHeader>
                  <ModalBody>
                     {this.state.contractResult.map((result, index) => {
                        return (
                           <div>
                              <div key={index}>
                                 <div><b>Name: </b><span>{result.Name}</span></div>
                                 <div><b>Answers: </b></div>
                              </div>
                              <ul>
                                 {result.Answers.map((ans, idx) => {
                                    return (
                                       <div key={idx} className='resultsDiv'>
                                          <li>{ans}</li>
                                       </div>
                                    )
                                 })}
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
            {/* <<<<<<<<<<<< Get result by Id Modal >>>>>>>>>>> */}
            {this.state.resultByIdModalShow !== false ?
               <Modal size='sm' centered show={this.handleShow} onHide={() => { this.setState({ resultByIdModalShow: false }) }}>
                  <ModalHeader className='modalHeader' closeButton>
                     <ModalTitle>
                        Result of Id: {this.state.inputId.id}
                     </ModalTitle>
                  </ModalHeader>
                  <ModalBody>
                     <div>
                        <div className='resultsDiv'><b>Name: </b><span>{this.state.resultById.Name}</span></div>
                        <div className='resultsDiv'><b>Ans: </b><span>{this.state.resultById.Answers}</span></div>
                     </div>
                  </ModalBody>
                  <ModalFooter>
                     <Button className='btn btn-secondary' onClick={this.handleClose}>Close</Button>
                  </ModalFooter>
               </Modal> : null
            }
            {/* <<<<<<<<<< All results Modal >>>>>>>>>> */}
            {this.state.allResultModalShow !== false ?
               <Modal size='lg' centered show={this.handleShow} onHide={() => { this.setState({ allResultModalShow: false }) }}>
                  <ModalHeader className='modalHeader' closeButton>
                     <ModalTitle>
                        Complete Result
                     </ModalTitle>
                  </ModalHeader>
                  <ModalBody>
                     <table>
                        <thead>
                           <tr>
                              <th>Id</th>
                              <th>Student Name</th>
                              <th>Result</th>
                           </tr>
                        </thead>
                        <tbody>
                           {this.state.allResult.map((item, idx) => {
                              return (
                                 <tr key={idx}>
                                    <td>{item.id}</td>
                                    <td>{item.name}</td>
                                    <td>{item.ans}</td>
                                 </tr>
                              )
                           })}
                        </tbody>
                     </table>
                  </ModalBody>
                  <ModalFooter>
                     <Button className='btn btn-secondary' onClick={this.handleClose}>Close</Button>
                  </ModalFooter>
               </Modal> : null
            }
         </div>
      )
   }
}



export default App;