import React, {useEffect,useState} from "react";
import UserCard from "./Component/Usercard"
function UserPage(){
  const [user,setUsers]= useState([]);

  useEffect(()=>{
fetch("https://randomuser.me/api/?results=12")
.then(( res)=>res.json())
.then((data)=> setUsers(data.results))
.catch((err)=>console.error("Error:",err));
  },[]);


  return (
  <div className="user-container">
<h2 className="title">List of users</h2>
<div clasasName="user-grid">{
  user.map((user,index)=>(
    <UserCard key={index} user={user}/>
  ))
  }</div>

  </div>
);
}
export default UserPage;