import React, { useEffect } from 'react';
import './App.css';
import { useAppDispatch } from './app/hooks';
import NavBar from './components/NavBar';
import { incrementAsync } from './slices/authSlice';

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(incrementAsync(1))
  }, [])

  return (
    <div className="App">
      <NavBar />
    </div>
  );
}

export default App;
