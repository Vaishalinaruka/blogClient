import "./settings.css"
import Sidebar from "../../components/sidebar/Sidebar"
import { useState, useContext } from "react"
import { Context } from "../../context/Context"
import axios from "axios"

export default function Settings() {
  const {user, dispatch} = useContext(Context);
  const [file, setFile] = useState(null);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(false);

  const PF ="http://localhost:5000/images/"; //5000 port is for backend and 3000 is for frontend.


  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({type:"UPDATE_START"})
    const updatedUser = {
      userId: user._id,
      username,                     //It means username: username
      email,                         //It means email: email
      password                      //It means password: password
    }

    if(file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);  
      updatedUser.profilePic = filename; 

      try {
        await axios.post("http://localhost:5000/api/upload", data);
      } catch(err) { // We can show a error to user
      }
    }

      try {
        const res = await axios.put("http://localhost:5000/api/users/"+user._id, updatedUser);
        setSuccess(true);
        dispatch({type:"UPDATE_SUCCESS", payload:res.data})


     } catch(err) {
      dispatch({type:"UPDATE_FAILURE "})
      }
  }



  return (
    <div className="settings">
      <div className="settingsWrapper">
        <div className="settingsTitle">
          <span className="settingsUpdateTitle">Update Your Account</span>
          <span className="settingsDeleteTitle">Delete Account</span>

        </div>
        <form className="settingsForm" onSubmit={handleSubmit}>
          <label>Profile Picture</label>
          <div className="settingsPP">
          <img
              src={file ? URL.createObjectURL(file) : PF+user.profilePic}
              alt=""
            />
            <label htmlFor="fileInput">
            <i className="settingsPPIcon far fa-user-circle"></i>
            </label> 
            <input type="file" id="fileInput" style={{display: "none"}}
            onChange = {(e) => {setFile(e.target.files[0])}}
            />
          </div>
          <label>Username</label>
          <input type="text" placeholder={user.username} 
            onChange = {(e) => {setUsername(e.target.value)}}
          />
          <label>Email</label>
          <input type="email" placeholder={user.email} 
           onChange = {(e) => {setEmail(e.target.value)}}

          />
          <label>Password</label>
          <input type="password"
          onChange = {(e) => {setPassword(e.target.value)}}
 />
          <button className="settingsSubmitButton" type="submit">Update</button>
          {success && <span style={{color: "green", textAlign: "center", marginTop: "20px"}}>Profile has been updated...</span>}
        </form>
      </div>
      <Sidebar />
    </div>
  )
  }