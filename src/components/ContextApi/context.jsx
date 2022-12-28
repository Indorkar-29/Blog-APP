import axios from 'axios';
import { createContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const context=createContext();

export const ContextProvider=(props)=>{
    const [email,setEmail]=useState('');
    const nav=useNavigate();

    const userSignIn=(loginData)=>{
        axios.post('https://blog-app-server-oheb.onrender.com/login',loginData)
        .then((res)=>{
            console.log(res);
            const token=res.data.token;
            localStorage.setItem('token',token);
            localStorage.setItem('email',loginData.email);
            nav('/blogs');
            window.alert("Login Successful");
            document.location.reload();
            setEmail(loginData.email);
        }).catch((err)=>{
            window.alert(err.response.data.error);
            console.log(err);
        });
    }

    const userSignUp=(userData)=>{
        try{
            axios.post('https://blog-app-server-oheb.onrender.com/register',userData)
            .then((res)=>{
                nav('/');
                window.alert("Registration Successful");
            }).catch((err)=>window.alert(err.response.data.error));
        }catch(e){
            window.alert(e.message);
        }
    }

    return (
        <context.Provider value={
            {
                userSignIn,
                userSignUp,
            }
        }>
            {props.children}
            </context.Provider>
    )
}