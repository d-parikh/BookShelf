import React, { createContext, ReactNode, useContext, useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import Register from './pages/Register';
import BooksList from './pages/BooksList';
import Home from './pages/Home/Home';

interface UserTokenContextValue {
  userToken: string | null;
  setToken: (token: string | null) => void;
}

// Create the UserTokenContext
export const UserTokenContext = createContext<UserTokenContextValue | undefined>(undefined);

// Create the UserTokenProvider component
export const UserTokenProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [userToken, setUserToken] = useState<string | null>(null);

  const setToken = (token: string | null) => {
    setUserToken(token);
  };

  const contextValue: UserTokenContextValue = {
    userToken,
    setToken,
  };

  return (
    <UserTokenContext.Provider value={contextValue}>
      {children}
    </UserTokenContext.Provider>
  );
};

const App: React.FC = () => {
    return (
      <div className="App">
        <UserTokenProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/" element={<Home/>} />
              <Route path="/list-books" element={<BooksList />} />
            </Routes>
          </BrowserRouter>
        </UserTokenProvider>
      </div>
    )
}

export default App;
