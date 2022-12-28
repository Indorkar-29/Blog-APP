import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import {context} from '../ContextApi/context';

const SignIn = () => {
    const navigate=useNavigate();
    const {userSignIn}=useContext(context);
    const [userDetail,setUserDetail]=useState({email:"",password:""});
    const [error,setError]=useState({});
    const [submit,setSubmit]=useState(false);

    const handleChange=(e)=>{
        setUserDetail({...userDetail,[e.target.name]:e.target.value});
    }

    const handleSubmit=(e)=>{
        e.preventDefault();
        setError(validate(userDetail));
        setSubmit(true);
    }

    useEffect(()=>{
        if(Object.keys(error).length === 0 && submit){
            userSignIn(userDetail);
        }
    },[error]);

    const validate=(values)=>{
        const err={};
        const emailRegex=/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/i
        if(!values.email){
            err.email="*email is required";
        }else if(!emailRegex.test(values.email)){
            err.email="*email is invalid";
        }
        if(!values.password){
            err.password="*password is required";
        }
        return err;
    }

  return (
    <div>
        <div>
            <form method='POST' onSubmit={handleSubmit}>
                <div>
                    <input type="text" name="email" placeholder='User ID' onChange={handleChange} />
                </div>
                <p style={{color:"red"}}>{error.email}</p>
                <div>
                    <input type="password" name="password" placeholder="Password" onChange={handleChange} />
                </div>
                <p style={{color:"red"}}>{error.password}</p>
                <button>LOGIN</button>
            </form>
            <button onClick={()=>navigate('/register')}>SIGNUP</button>
        </div>
    </div>
  )
}

export default SignIn;