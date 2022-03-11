import { useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import {useNavigate} from 'react-router-dom'
// import { useRecoilState } from 'recoil';
import api from '../api';


export function LoginForm() {
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  function handleLogin(e) {
    e.preventDefault();
    const loginRequest = { username: username, password: password };
    api.login.post(loginRequest).then((res) => {
      console.log(res)
    });
    navigate('/boards')
  }

  return (
    <>
   <div className = "backGround">

  <Row> 
    <Col/>
      <Col >
      
        <Form className="Form form-group">
          <h3 className = "h3Div">User Login</h3>
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
            onClick={handleLogin}
          >
            Submit
          </Button>

          <p className="forgot-password text-right">
              <a href = '/signup' >Sign up?</a>
          </p> 
     </Form>
     
    </Col>
      
      <Col/>
    </Row>

  </div>
    
      
    </>
  );
}