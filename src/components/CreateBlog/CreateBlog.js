import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const CreateBlog = () => {
    const history=useNavigate();
    const [image,setImage]=useState("");
    const [title,setTitle]=useState("");
    const [description,setDescription]=useState("");
    const [url,setUrl]=useState("");

    useEffect(()=>{
        if(url){
            fetch("https://blog-app-server-oheb.onrender.com/createBlog",{
                method:"post",
                headers:{
                    token:localStorage.getItem("token")
                },
                body:JSON.stringify({
                    Image:url,
                    Title:title,
                    Description:description
                })
            }).then((res)=>res.json())
            .then(data=>{
                if(data.error){
                    window.alert(data.error);
                }else{
                    window.alert("Created Post Successfully");
                    history('/blogs');
                }
            }).catch(err=>{
                console.log(err);
            });
        }
    },[url]);

    const postDetails=()=>{
        const data=new FormData();
        data.append("file",image);
        data.append("upload_preset","blog-app");
        data.append("cloud_name","dhauuuwoi");

        fetch("https://api.cloudinary.com/v1_1/dhauuuwoi/image/upload",{
            method:"post",
            body:data
        }).then(res=>res.json())
        .then(data=>{
            setUrl(data.url);
        }).catch(err=>{
            console.log(err);
        });
    }

  return (
    <div>
        <div>
            <input type="text" value={title} onChange={(e)=>setTitle(e.target.value)} placeholder="Title" />
        </div>
        <div>
            <input type="file" onChange={(e)=>setImage(e.target.files[0])}/>
        </div>
        <div>
            <input type="text" value={description} onChange={(e)=>setDescription(e.target.value)} placeholder="Description" />
        </div>
        <button onClick={()=>postDetails()}>SAVE POST</button>
    </div>
  )
}

export default CreateBlog;