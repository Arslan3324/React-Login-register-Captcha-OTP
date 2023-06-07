
import {auth} from './firebase'
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import { Button, Form } from 'react-bootstrap';
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';

export const Login = () => {
    const navigate = useNavigate();
    const [input,setInput]= useState({
        email:"",
        password:""
    })

    const [number,setNumber] = useState("")
    const [error,setError] = useState("")

    function setUpRecaptcha(num){
        const recaptchaVerifier = new RecaptchaVerifier(
            "recaptcha-container",
            {},
            auth
        );
        recaptchaVerifier.render();
        return signInWithPhoneNumber(auth,num,recaptchaVerifier)
    }
    const getOtp = async(e)=>{
        setError("")
        e.preventDefault();
        if(number==="" || number === undefined) return setError("please enter correct number");
        try{
            const response = await setUpRecaptcha(number);
            console.log(response);
        }catch(err){
            setError(err.message)
        }
        console.log(number);
    }

    const otpAlert = ()=>{

        let foo = prompt('Enter OTP');
        
        console.log(foo);
    }


    const handleLogin = (e) => {
        e.preventDefault();
        const loggeduser = JSON.parse(localStorage.getItem("user"));
        if(input.email === loggeduser.email && input.password === loggeduser.password){
            localStorage.setItem("loggedin",true)
            navigate("/home")
        }
        else{
            alert("Wrong Email or Password")
        }

    }

    const navigateRegister = ()=>{
        navigate('/register')
    }

    return (
        <div className="auth-form-container">
            <h2 className="font-bold text-4xl ">Login</h2>
            <form className="login-form" onSubmit={handleLogin}>

                <label htmlFor="email">Email</label>
                <input 
                className='text-black'
                value={input.email} 
                required
                onChange={(e) => setInput({...input,[e.target.name]: e.target.value,
                })} 
                type="email" 
                placeholder="youremail@gmail.com" 
                id="email" 
                name="email" />
                
                <label htmlFor="password">Password</label>
                <input 
                required
                value={input.password} 
                 onChange={(e) => setInput({...input,[e.target.name]: e.target.value,
                 })} 
                 className='text-black'
                type="password" 
                placeholder="********"
                 id="password" 
                 name="password" />

                 <div className='p-4 box'>
                    <Form onSubmit={getOtp}>
                        <PhoneInput
                        defaultCountry='USA'
                        value={number}
                        className='text-black'
                        onChange={setNumber}
                        placeholder="Enter Phone Number"
                        
                        />
                        <div id="recaptcha-container"></div>
                        <div >
                            <Link to="/">
                                <Button >Cancel</Button>

                            </Link>
                            <Button type="submit" onClick={otpAlert}>Send OTP</Button>
                        </div>
                    </Form>

                 </div>
                <button className="bg-slate-50 font-bold text-1xl mt-2" type="submit">Log In</button>
            </form>
            <button className="link-btn" onClick={navigateRegister}>Don't have an account? Register here.</button>
        </div>
    )
}