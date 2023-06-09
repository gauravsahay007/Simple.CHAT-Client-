import React, { useState } from "react";
import { API } from "./backend";
function Cloudinary(){
const [file,setFile]=useState("");
const [image,setImage]=useState("");
//function for previewing files before uploading
//function used to enable it to show on frontend
function previewFiles(file){
    //fileReader is use to read a file to read and convert it to a url
    const reader=new FileReader()
    reader.readAsDataURL(file)
    
    reader.onloadend=()=>{
        setImage(reader.result);
        // console.log(image);
    }
    //image base 64 url
    console.log(image);
}
const handleChange=(event)=>{
    //consists of a filelist having a file on 0th index 
    const file=(event.target.files[0]);
    setFile(event.target.file);
    previewFiles(file);
    console.log(file);

}
const handleSubmit=(event)=>{
    event.preventDefault();
   const {data}=fetch(`${API}/cloudinary`,
   {
    mode: 'no-cors',
    method: "POST",
    headers: {
        "Content-Type": "application/json",
        
    },
    body:{
        image: JSON.stringify(image)
       }
    }
    )
   if(!data)
   {
    return;
   }
   try{
    console.log(data.data);
   }
   catch(err){
     console.log(err);
   }
}
    return (
        <>
        <div>
            <form onSubmit={event=>handleSubmit(event)}>
                <label htmlFor="fileInput">Upload Your image</label>
                <input type="file" id="fileInput" onChange={event=>handleChange(event)} required 
                accept="image.png,image.jpeg,image.peg,image.jfif"
                />
                <button className="btn btn-primary">Submit</button>
            </form>
        </div>
        {/* //making it able to see on our online interface */}
        <img src={image} alt="" />
        </>
    )
}
export default Cloudinary