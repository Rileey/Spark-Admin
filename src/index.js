import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { AuthContextProvider } from './context/authContext/authContext'
import { ContentContextProvider } from './context/contentContext/contentContext';
import { ListContextProvider } from './context/listContext/listContext';
import { MovieContextProvider } from './context/movieContext/movieContext'
import { UserContextProvider } from './context/userContext/userContext';

ReactDOM.render(
  <React.StrictMode>
    <AuthContextProvider>
      <MovieContextProvider>
        <ListContextProvider>
          <UserContextProvider>
            <ContentContextProvider>
              <App />
            </ContentContextProvider>
          </UserContextProvider>
        </ListContextProvider>
      </ MovieContextProvider>
    </AuthContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
