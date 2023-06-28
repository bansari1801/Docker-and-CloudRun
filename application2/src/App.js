
import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import {Login} from './components/login';
import {Profile} from './components/profile';

function App() {
  return (
    //https://www.geeksforgeeks.org/reactjs-router/ [10]
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login/>} />
          <Route path='/profile' element={<Profile/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
