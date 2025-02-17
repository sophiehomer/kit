import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../../utils/mutations';
import { Link } from 'react-router-dom';
import Auth from '../../utils/auth';
import './signup.css';
import Header from "../Header/header.js";

// import{useState} from 'react';

function Signup() {
    // set up state variables
    const [formState, setFormState] = useState({
        username: '',
        email: '',
        password: '',
      });
      const [addUser, { error }] = useMutation(ADD_USER);

      // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };
  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await addUser({
        variables: { ...formState },
    });
    Auth.login(data.addUser.token);

    } catch (e) {
      console.error(e);
    }
     // clear form values
     setFormState({
        email: '',
        password: '',
    });
  };

    return (
        
        <>
        <Header />
      <main className="signupPage"> 
        <section id="sign-up-section">
            <form id="signup-form" onSubmit={handleFormSubmit}>
                <div className="signup">
                    <input
                        placeholder="Username"
                        className="signupUsername"
                        name="username"
                        type="username"
                        id="username"
                        value={formState.username}
                        onChange={handleChange}
                    />
                    <input
                        placeholder="Email"
                        className="signupEmail"
                        name="email"
                        type="email"
                        id="email"
                        value={formState.email}
                        onChange={handleChange}
                    />
                    <input
                        placeholder="Password"
                        className="signupPassword"
                        name="password"
                        type="password"
                        id="password"
                        value={formState.password}
                        onChange={handleChange}
                    />
                     {error && <div className="error">Sign up failed</div>}
                    <button id="signup-button" type="submit" value="signup">Sign up</button>
                    <p className="loginLinkText">Have an account?<Link to="/" className="link"> <br></br>Login here.</Link></p>
                </div>
            </form>
        </section>
        </main>
        </>
    );
};

export default Signup;