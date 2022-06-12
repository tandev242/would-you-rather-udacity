import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import './App.css';
import { useAppDispatch } from './app/hooks';
import Home from './components/Home';
import NavBar from './components/NavBar';
import Login from './components/Login';
import { handleInitialData } from './slices/sharedSlice';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { RootState } from './app/store';
import NewPoll from './components/NewPoll';
import LeaderBoard from './components/LeaderBoard';
import PollQuestion from './components/PollQuestion';

function App() {
  const dispatch = useAppDispatch();
  const { isAuthed, userId } = useSelector((state: RootState) => state.auth);
  const { users } = useSelector((state: RootState) => state.user);

  const getUserById = () => {
    return Object.values(users).find(user => user.id === userId);
  }

  useEffect(() => {
    dispatch(handleInitialData())
  }, [])

  return (
    <Router>
      <div className="App">
        {
          isAuthed ? (
            <>
              <NavBar user={getUserById()} />
              <Routes>
                <Route path="/" element={<Home user={getUserById()} />} />
                <Route path="/add" element={<NewPoll user={getUserById()} />} />
                <Route path="/leader-board" element={<LeaderBoard />} />
                <Route path="/questions/:id" element={<PollQuestion user={getUserById()} />} />
              </Routes>
            </>
          ) : <Login />
        }
      </div>
    </Router>
  );
}

export default App;
