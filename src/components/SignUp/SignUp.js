import React, { useContext, useEffect, useState } from 'react'
import { context } from '../ContextApi/context'

const SignUp = () => {
    const {userSignUp}=useContext(context);
    const [isSubmit,setIsSubmit]=useState(false);
    const [formErr,setFormErr]=useState({});
    const [userData,setUserData]=useState({email:"",password:"",conformPass:""});

    const handleChange=(e)=>{
        const {name,value}=e.target;
        setUserData({...userData,[name]:value});
    }

    const handleSubmit=(e)=>{
        e.preventDefault();
        setFormErr(validate(userData));
        setIsSubmit(true);
    }

    useEffect(()=>{
        if(Object.keys(formErr).length === 0 && isSubmit){
            userSignUp(userData);
        }
    },[formErr]);

    const validate=(values)=>{
        const err={};
        const emailRegex=/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/i
        if(!values.email){
            err.email="*email is required";
        }else if(!emailRegex.test(values.email)){
            err.email="*email is invalid";
        }
        if(values.password.length < 8){
            err.password="* password must contain atleast 8 characters";
        }
        if(values.conformPass !== values.password){
            err.conformPass="* password does'nt matched !!! ";
        }
        return err;
    }

  return (
    <div>
        <div>
            <form method='POST' onSubmit={handleSubmit}>
                <div>
                    <input type="text" name="email" placeholder='Email ID' onChange={handleChange} />
                </div>
                <p style={{color:"red"}}>{formErr.email}</p>
                <div>
                    <input type="password" name="password" placeholder='Password' onChange={handleChange} />
                </div>
                <p style={{color:"red"}}>{formErr.password}</p>
                <div>
                    <input type="password" name="conformPass" placeholder='Confirm Password' onChange={handleChange} />
                </div>
                <p style={{color:"red"}}>{formErr.conformPass}</p>
                <button>SIGN UP</button>
            </form>
        </div>
    </div>
  )
}

export default SignUp