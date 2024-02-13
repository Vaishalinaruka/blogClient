
import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import Header from "../../components/header/Header"
import Sidebar from "../../components/sidebar/Sidebar"
import Posts from "../../components/posts/Posts"
import "./home.css"
import axios from "axios"

export default function Home() {
  const [posts, setPosts] = useState([]);

  //const location = useLocation();  //Instead of writing like this we can just take the search property
  const {search} = useLocation();

  useEffect(() => {
  const fetchPosts = async () => {
   const res = await axios.get("http://localhost:5000/api/posts" + search)
   setPosts(res.data)
  }
  fetchPosts()
  },[search])

  return (
    <>
    <Header />
    
    <div className="home">
        <Posts posts={posts}/>
        <Sidebar />

    </div>
    </>
  )
}
