import TopBar from "./components/topbar/TopBar";
import Home from "./pages/home/Home";
import Single from "./pages/single/Single";
import Write from "./pages/write/Write";
import Settings from "./pages/settings/Settings";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import { Routes, Route } from "react-router-dom";
import { useContext } from "react";
import { Context } from "./context/Context";

function App() {
  const { user } = useContext(Context);

  return (
    <>
      <TopBar />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/posts" element={<Home />}></Route>
        <Route path="/post/:postId" element={<Single />}></Route>\{" "}
        <Route path="/write">
          {user ? (
            <Route path="/write" element={<Write />} />
          ) : (
            <Route path="/write" element={<Login />} />
          )}
        </Route>
        <Route path="/settings">
          {user ? (
            <Route path="/settings" element={<Settings />} />
          ) : (
            <Route path="/settings" element={<Login />} />
          )}
        </Route>
        <Route path="/login">
          {user ? (
            <Route path="/login" element={<Home />} />
          ) : (
            <Route path="/login" element={<Login />} />
          )}
        </Route>
        <Route path="/register">
          {user ? (
            <Route path="/register" element={<Home />} />
          ) : (
            <Route path="/register" element={<Register />} />
          )}
        </Route>
      </Routes>
    </>
  );
}

export default App;
