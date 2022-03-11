import { useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import {useNavigate} from 'react-router-dom'
// import { useRecoilState } from 'recoil';
import api from '../api';


export function SignupForm() {
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  function handleSignup(e) {
    e.preventDefault();
    const signupRequest = { username: username, password: password };
    api.signup.post(signupRequest).then((res) => {
      console.log(res)
    });
    navigate('/login')
  }

  return (
    <>
   <div className = "backGround">

  <Row> 
    <Col/>
      <Col >
      
        <Form className="Form form-group">
          <h3 className = "h3Div">Sign Up Here</h3>
          <br/>

          <Form.Group controlId="formBasicEmail">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder=" Enter Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Button
            className="btn btn-primary btn-block"
            variant="primary"
            type="submit"
            onClick={handleSignup}
          >
            Submit
          </Button>
     </Form>
     
    </Col>
      
      <Col/>
    </Row>

  </div>
    
      
    </>
  );
}