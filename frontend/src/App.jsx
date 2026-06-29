import React, { useState } from "react";
import NavBar from "./components/navbar/BlogNavbar";
import Footer from "./components/footer/Footer";
import Home from "./views/home/Home";
import Blog from "./views/blog/Blog";
import NewBlogPost from "./views/new/New";
import Login from "./views/logIn/Login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignIn from "./views/signIn/SignIn";
import ProtectedRoute from "./components/protectedRoute/ProtectedRoute";
import OauthSuccess from "./views/oauth/success/OauthSuccess";


const App = () => {

  const [token, setToken] = useState(localStorage.getItem('token'))

  const updateToken = (newToken) => {
    if (newToken) {
      localStorage.setItem('token', newToken);
      setToken(newToken);
    } else {
      localStorage.removeItem('token');
      setToken(null);
    }
  }

  return (
    <Router>
      <NavBar token={token} setToken={updateToken}  />
      <Routes>
        {/* ROTTE PUBBLICHE */}
        <Route path="/" exact element={<Home token={token}/>} />
        <Route path="/blog/:id" element={<Blog />} />
        <Route path="/login" element={<Login onLoginSuccess={updateToken} />} />
        <Route path="/signIn" element={<SignIn />} />
        <Route path="/auth/success" element={<OauthSuccess onLoginSuccess={updateToken} />} />

        {/* ROTTE PROTETTE PER UTENTI LOGGATI */}
        <Route element={<ProtectedRoute />}>
          <Route path="/new" element={<NewBlogPost />} />
        </Route>
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
