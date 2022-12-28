import React from 'react'
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate=useNavigate();

  return (
    <div>
      <button onClick={()=>navigate('/createBlog')}>CREATE BLOG</button>
      <button onClick={()=>{
                    localStorage.removeItem("token");
                    navigate('/');
                    window.alert("Logged Out Successfully");
                    document.location.reload();}}>Log Out</button>
    </div>
  )
}

export default Header;