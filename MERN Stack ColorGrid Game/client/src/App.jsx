import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import './App.css';
import { io } from "socket.io-client";
const socket = io("http://localhost:8000"); 


import Welcome from './components/Welcome/Welcome';
import Login from './components/Login/Login';
import SignUp from './components/SignUp/SignUp';
import Home from './components/Home/Home';
import WaitingRoom from './components/WaitingRoom/WaitingRoom';
import GamePlay from './components/GamePlay/GamePlay';
import History from './components/History/History';
import HistoryDetail from './components/HistoryDetail/HistoryDetail';
import UpdateProfile from './components/UpdateProfile/UpdateProfile';
import Leaderboards from './components/Leaderboards/Leaderboards';
import MatchFound from './components/MatchFound/MatchFound';



function App() {
  return (
   
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/home" element={<Home />} />
          <Route path="/newgame/waiting" element={<WaitingRoom />} />
          <Route path='/matchfound' element={<MatchFound/>}/>
          <Route path="/newgame/:gameid" element={<GamePlay />} />
          <Route path="/history" element={<History />} />
          <Route path="/history-detail/:gameId" element={<HistoryDetail />} />
          <Route path="/update-profile" element={<UpdateProfile />} />
          <Route path="/leaderboard" element={<Leaderboards />} />
        </Routes>
      </BrowserRouter>
      

  );
}

export default App;
