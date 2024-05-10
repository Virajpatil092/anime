import './App.css';
import { Routes, Route } from 'react-router-dom';
import Anime from './components/Anime';
import Register from './components/Register';
import Login from './components/Login';
import Update from './components/Update';
import Add from './components/Add';

function App() {
  return (
    <Routes>
      <Route path="/anime" element={<Anime />} />
      <Route path="/register" element={<Register />} />
      <Route path="/Login" element={<Login />} /> 
      <Route path="/update/:id" element={<Update />} />
      <Route path='add' element={<Add />} />
    </Routes>
  );
}

export default App;
