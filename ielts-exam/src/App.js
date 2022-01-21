import React from 'react';
import { Button } from 'react-bootstrap';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

    return (
        <div className='container'>
            <div className='row'>
                <div className='col-md-6'>
                    <div className='topLabel'>Examination Login</div>
                    <div className='inputs'>
                        <input type="text"></input>
                        <br/>
                        <input type="text"></input>
                    </div>
                    <div className='fPass'>
                        <label>Forgot password</label>
                    </div>
                    <Button className='btn btn-warning'>Sign In</Button>
                </div>
            </div>
        </div>
    )
}

export default App;