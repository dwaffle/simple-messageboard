import React, {useEffect, useState} from "react"
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import ShowBoards from './pages/boards'
import GeneralBoard from './pages/general'
import SergeantBoard from "./pages/sergeant"
import logo from './logo.svg';
import './App.css';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/general" element={<GeneralBoard />} />
        <Route path="/sergeant" element={<SergeantBoard />} />
        <Route path="/boards" element={<ShowBoards />} />
        <Route path="/" element={<ShowBoards />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
