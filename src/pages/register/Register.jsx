import "./register.css"
import { Link } from "react-router-dom"
import { useState } from "react"
import axios from "axios"

export default function Register() {
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setError(false)
      const res= await axios.post("http://localhost:5000/api/auth/register", {
        username,         //It means username: username
        email,
        password
      });
      res.data && window.location.replace("/login");
    } catch(err) {
      setError(true);
    }
  };

    return (
    <div className="register">
      <span className="registerTitle">Register</span>
      <form className="registerForm" onSubmit={handleSubmit}>
        <label>Username</label>
        <input
         className="registerInput"
         type="text"
         placeholder="Enter your username..." 
         onChange={e=>setUserName(e.target.value)}
         />
        <label>Email</label>
        <input 
        className="registerInput"
         type="text" 
         placeholder="Enter your email..."
         onChange={e=>setEmail(e.target.value)}

          />
        <label>Password</label>
        <input 
        className="registerInput" 
        type="password"
         placeholder="Enter your password..." 
         onChange={e=>setPassword(e.target.value)}

         />
        <button className="registerButton" type="submit">Register</button>
      </form>
        <button className="registerLoginButton">
        <Link to="/login" className="link">Login</Link>
        </button>
         {error && <span style={{color:"red", marginTop:"10px"}}>Something went wrong</span>}
   </div>
  )
}
