import React, { useState } from 'react';
import { TextInput, Button, InlineNotification } from 'carbon-components-react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [passError, setPassError] = useState(false);
  const [loginError, setLoginError] = useState(false);

  const navigate = useNavigate();  

  const expectedUsername = 'admin';
  const expectedPassword = 'password';

  const handleSubmit = (e) => {
    e.preventDefault();

    // Perform validation
    if (!email) {
      setEmailError(true);
    } else {
      setEmailError(false);
    }

    if (!password) {
      setPassError(true);
    } else {
      setPassError(false);
    }

    if (email === expectedUsername && password === expectedPassword) {
       navigate('/home');
    } else {
      setLoginError(true);  
    }
  };

  return (
    <div className="login_wrap">
      <div className="container">
        <h1 className="label">User Login</h1>
        <form className="login_form" onSubmit={handleSubmit}>
          <TextInput
            labelText="Username"
            id="email"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            invalid={emailError}
            invalidText="Please fill in your username"
          />
          <TextInput
            labelText="Password"
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            invalid={passError}
            invalidText="Please fill in your password"
          />
          {loginError && (
            <InlineNotification
              kind="error"
              title="Incorrect username or password"
            />
          )}
          <Button type="submit">Login</Button>
        </form>
      </div>
    </div>
  );
}

export default Login;


