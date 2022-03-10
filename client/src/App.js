import React from "react"
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import LoginPage from './pages/login'
import ShowBoards from './pages/boards'
import GeneralBoard from './pages/general'
import SergeantBoard from "./pages/sergeant"
import SignupPage from "./pages/signup"
import './App.css';

function App() {

  

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/general" element={<GeneralBoard />} />
        <Route path="/sergeant" element={<SergeantBoard />} />
        <Route path="/boards" element={<ShowBoards />} />
        <Route path="/" element={<ShowBoards />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
