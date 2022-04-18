import { useState} from 'react';
import '../App.css'
import axios from '../axios/axios';
const Register_URL = '/v1/auth/register';

export default function Login() {


    const [email, setEmail] = useState('');
    const [pwd, setPwd] = useState('');
    const [username, setUsername] = useState(''); 



    const handleSubmit = async (e : any) => {
        e.preventDefault();
        let password = pwd
        try {
            await axios.post(Register_URL,
              JSON.stringify({username, email, password }),
                {
                    headers: { 'Content-Type': 'application/json' },
                }
            );
            setEmail('');
            setPwd('');
        } catch (err : any) {
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

                <button type="submit">Register</button>
              </div>

              <div className="container" style={{backgroundColor : "#f1f1f1"}}>
                <span className="psw"><a href="/login">Have already an account?</a></span>
              </div>
            </form>

        </div>
    )
} 