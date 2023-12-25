import React, { createContext, ReactNode, useContext, useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import Register from './components/Register';
import BooksList from './components/BooksList';

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
              <Route path="/list-books" element={<BooksList />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Routes>
          </BrowserRouter>
        </UserTokenProvider>
      </div>
    )
}

export default App;
