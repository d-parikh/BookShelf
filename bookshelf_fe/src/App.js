import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import Register from './components/Register';
import BooksList from './components/BooksList';

// import { addNumbers } from './components/Login';

function App() {
//   const result = addNumbers(3, 7);
// console.log(result); // Output: 10
  return (
    <div className="App">

      <BrowserRouter>
        <Routes>
          <Route exact path="/login" element={<Login/>} />
          <Route exact path="/register" element={<Register/>} />
          <Route exact path="/list-books" element={<BooksList/>} />
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
