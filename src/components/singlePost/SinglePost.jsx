import { useState, useEffect, useContext } from "react"
import "./singlepost.css"
import { useLocation, Link } from "react-router-dom"
import axios from "axios"
import { Context } from "../../context/Context"



//On line 38- user?.username means if there is no user it will not look at that username. So there will be no error.


export default function SinglePost() {

const location = useLocation();
const path = location.pathname.split("/")[2]
const [post, setPost] = useState({});
const PF ="http://localhost:5000/images/"; //5000 port is for backend
const { user } = useContext(Context);
const [title, setTitle] = useState("");
const [desc, setDesc] = useState("");
const [updateMode, setUpdateMode] = useState(false);





useEffect(()=> {
const getPost =  async ()=> {
  const res = await axios.get("http://localhost:5000/api/posts/" + path)
  setPost(res.data);
  setTitle(res.data.title);
  setDesc(res.data.desc);
}
getPost()
  }, [path]);


  const requestData = {username: user.username}
  const handleDelete = async() => {
    try{
       await axios.delete(`http://localhost:5000/api/posts/${post._id}`, { data: requestData })
      // .then(response=>console.log("Hi deleted" + response.data))
      // .catch(error => {
      //   console.error('Error deleting resource:', error);})
      window.location.replace("http://localhost:3000")
    } catch(err) {
       
    }
  

  }

  const handleUpdate = async () => {
    try {
    await axios.put(`http://localhost:5000/api/posts/${post._id}`, {
      username: user.username,
       title,
        desc},
   );

     //Because of ES6 we don't have to write title:title , desc:desc. Name is same so just writing single title, desc will also work.
    setUpdateMode(false);
  } catch (err) {
     
  }
  }

  return (
    <div className="singlePost">
        <div className="singlePostWrapper">
          {post.photo && (
           <img
           className="singlePostImg"
           src={PF + post.photo}
           alt=""
  />
          )}
          {
            updateMode ? <input type="text" value={title} className="singlePostTitleInput" 
            onChange={(e) => setTitle(e.target.value)}
            autoFocus /> : (
              
        <h1 className="singlePostTitle">
        {title}
        {post.username === user?.username && (
        <div className="singlePostEdit">
        <i className="singlePostIcon far fa-edit" onClick={()=>setUpdateMode(true)}></i>
        <i className="singlePostIcon far fa-trash-alt" onClick={handleDelete}></i>
      </div>
   )}  

      </h1>
            )
          }
    

          <div className="singlePostInfo">
            <span className="singlePostAuthor">Author:
            <Link to={`/?user=${post.username}`} className="link">
             <b>{post.username}</b>
             </Link>
             </span>

            <span className="singlePostDate">{new Date(post.createdAt).toDateString()}</span>

          </div>
          {
            updateMode ? <textarea className="singlePostDescInput" value={desc} 
            onChange={(e) => setDesc(e.target.value)}
            /> : (
            <p className="singlePostDesc">{desc}</p>
            )}
            {updateMode && (
               <button className="singlePostButton" onClick={handleUpdate}>
                Update
               </button>
            )}
           
        </div>
    </div>
  )
}
