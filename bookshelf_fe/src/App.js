import './App.css';
import Login from './components/Login';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
// import { addNumbers } from './components/Login';

function App() {
//   const result = addNumbers(3, 7);
// console.log(result); // Output: 10
  return (
    <div className="App">

      <BrowserRouter>
        <Routes>
          <Route exact path="/login" element={<Login/>} />
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
