import React from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Register from "./pages/Register";
import Login from "./pages/Login";
import Chat from "./pages/Chat";
import Avatar from "./pages/setAvatar";

function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route path='/' element={<Register />} />
        <Route path='/Register' element={<Register />} />
        <Route path='/Login' element={<Login />} />
        <Route path='/Chat' element={<Chat />} />
        <Route path = '/setAvatar' element  = {<Avatar/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
