import { useRef, useState, useEffect, useContext } from 'react';
import '../App.css'
import axios from '../axios/axios';
const Register_URL = '/v1/auth/register';

export default function Login() {

    const userRef = useRef();

    const [email, setEmail] = useState('');
    const [pwd, setPwd] = useState('');
    const [username, setUsername] = useState(''); 
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);


    useEffect(() => {
        setErrMsg('');
    }, [email, pwd])

    const handleSubmit = async (e : any) => {
        e.preventDefault();
        let password = pwd
        console.log(                
            JSON.stringify({username, email, password })
        )
        try {
            const response = await axios.post(Register_URL,
              JSON.stringify({username, email, password }),
                {
                    headers: { 'Content-Type': 'application/json' },
                }
            );
            console.log(JSON.stringify(response?.data));
            setEmail('');
            setPwd('');
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

            <h2>Registration Form</h2>

            <form onSubmit={handleSubmit}>
              <div className="container">
                <label htmlFor="email"><b>email</b></label>
                <input type="text" placeholder="Enter email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} required/>
                <label htmlFor="username"><b>username</b></label>
                <input type="text" placeholder="Enter username" name="username" value={username} onChange={(e) => setUsername(e.target.value)} required/>
                <label htmlFor="psw"><b>Password</b></label>
                <input type="password" placeholder="Enter Password" name="psw" value={pwd}  onChange={(e) => setPwd(e.target.value)} required/>

                <button type="submit">Login</button>
                <label>
                  <input type="checkbox" checked={true} name="remember"/> Remember me
                </label>
              </div>

              <div className="container" style={{backgroundColor : "#f1f1f1"}}>
                <button type="button" className="cancelbtn">Cancel</button>
                <span className="psw">Forgot <a href="#">password?</a></span>
              </div>
            </form>

        </div>
    )
} 