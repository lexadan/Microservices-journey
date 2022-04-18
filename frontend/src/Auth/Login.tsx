import { useState, useEffect } from 'react';
import Cookies from 'universal-cookie';
import '../App.css'
import axios from '../axios/axios';
const LOGIN_URL = '/v1/auth/login';

export default function Login() {


    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);


    useEffect(() => {
        setErrMsg('');
    }, [user, pwd])

    const handleSubmit = async (e : any) => {
        e.preventDefault();
        let email = user
        let password = pwd
        try {
            const response = await axios.post(LOGIN_URL,
                JSON.stringify({ email, password }),
                {
                    headers: { 'Content-Type': 'application/json' },
                }
            );
            setUser('');
            setPwd('');

            const cookies = new Cookies();
            cookies.set('token', response.data.token, { path: '/' });
            console.log( response.data.token)

            
            setSuccess(true);
        } catch (err : any) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 400) {
                setErrMsg('Missing Username or Password');
            } else if (err.response?.status === 401) {
                setErrMsg('Unauthorized');
            } else {
                setErrMsg('Login Failed');
            }
        }
    }
    return(
            <div>

            <h2>Login Form</h2>

            <form onSubmit={handleSubmit}>
              <div className="container">
                <label htmlFor="email"><b>email</b></label>
                <input type="text" placeholder="Enter email" name="email" value={user} onChange={(e) => setUser(e.target.value)} required/>

                <label htmlFor="psw"><b>Password</b></label>
                <input type="password" placeholder="Enter Password" name="psw" value={pwd}  onChange={(e) => setPwd(e.target.value)} required/>

                <button type="submit">Login</button>
              </div>

              <div className="container" style={{backgroundColor : "#f1f1f1"}}>
                <span className="psw">Forgot <a href="/register">Don't have an account?</a></span>
              </div>
            </form>

        </div>
    )
}