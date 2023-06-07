import React, { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { useNavigate } from "react-router-dom";
export const Register = () => {
    const navigate = useNavigate();
    const [passLabel,setPassLabel] = useState("")
    const [verified, setVerified] = useState(false)

    const [input,setInput]= useState({
        name:"",
        email:"",
        password:""
    })

     function passStrenth(inp){
        if(inp.password.length === 0){
            setPassLabel("")
        }
        else if(inp.password.length >=1 && inp.password.length <=5){
             setPassLabel("Weak Password")
        }
        else if(inp.password.length >5 && input.password.length <=8){
            setPassLabel("Medium Password")
        }
        else if(inp.password.length >8 && input.password.length <=15){
            setPassLabel("Strong Password")
        }
        else{
            setPassLabel("Too Long")
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        localStorage.setItem("user",JSON.stringify(input))
        alert("Successfully Register") 
        navigate("/");
    }

    const navigateLogin = () =>{
        navigate("/")
    }
    function onChangeCap(value) {
        console.log("Captcha value:", value);
        setVerified(true)
      }

    return (
        <div className="auth-form-container">
            <h2 className="font-bold text-4xl">Register</h2>
        <form className="register-form" onSubmit={handleSubmit}>
            
            <label htmlFor="name">Full name</label>
            <input 
            value={input.name} 
            className='text-black'
            name="name" 
            required
            onChange={(e) => setInput({...input,[e.target.name]: e.target.value,
            })} 
            id="name" 
            placeholder="full Name" />
            
            <label htmlFor="email">Email</label>
            <input 
            name="email"
            className='text-black'
            value={input.email} 
            required
            onChange={(e) => setInput({...input,[e.target.name]: e.target.value,
            })}
            type="email" 
            placeholder="youremail@gmail.com" 
            id="email"  />
            
            <label htmlFor="password">Password</label>
            <input 
            className="mb-4 text-black"
            name="password"
            
            value={input.password} 
            required
            onChange={
                
                (e) => {setInput({...input,[e.target.name]: e.target.value,}) 
                    passStrenth(input);
                    console.log(input)
            
            
                }}
            type="password" 
            placeholder="********" 
            id="password"  />
        
                <p>{passLabel}</p>
            
                <ReCAPTCHA
    sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
    onChange={onChangeCap}
  />
            <button className="bg-slate-50 font-bold text-1xl mt-4" type="submit" disabled={!verified}>Register </button>
        </form>
        <button className="link-btn" onClick={navigateLogin} >Already have an account? Login here.</button>
    </div>
    )
}
