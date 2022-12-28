import React, { useEffect, useState } from 'react'
import Header from '../Header/Header';

const Blogs = () => {
    const [data,setData]=useState([]);

    useEffect(()=>{
        fetch("https://blog-app-server-oheb.onrender.com/allBlogs",{
            headers:{
                token:localStorage.getItem("token")
            }
        })
        .then(res=>res.json())
        .then(result=>{
           setData(result.users[0].blogs);
        }).catch(err=>console.log(err));
    },[]);

  return (
    <div>
        <Header/>
        {
            data.map(item=>{
                return (<div key={item._id}>
                            <div><h3>{item.Title}</h3></div>
                            <div><img src={item.Image} alt="img" /></div>
                            <div><p>{item.Description}</p></div>
                        </div>
                )
            }).reverse()
        }
    </div>
  )
}

export default Blogs;