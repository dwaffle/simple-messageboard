import { useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
// import { useRecoilState } from 'recoil';
import { useHistory } from 'react-router';
import api from '../../api';
import './login.scss';

function LoginForm() {
  const history = useHistory();
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  function handleLogin(e) {
    e.preventDefault();
    const loginRequest = { user_userName: username, user_password: password };
    api.tokens.post(loginRequest);
    api.login.post({ user_userName: username });
    history.push('/articles');
  }

  return (
    <>
   <div className = "bacGround">

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

          <div className="form-group">
                    <div className="custom-control custom-checkbox">
                        <input type="checkbox" className="custom-control-input" id="vehicle1" />
                        <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                    </div>
          </div>
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

export default LoginForm;