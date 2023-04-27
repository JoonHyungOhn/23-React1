import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import Library from './chapter_03/Library';
import Clock from './chapter04/clock';
import CommentList from './chapter_05/CommentList';
import Accommodate from './chapter_07/Accommodate';
import ConfirmButton from './chapter_08/ConfirmButton';
import LandingPage from './chapter_09/LandingPage';
import Toolbar from './chapter_09/Toolbar';

setInterval(() => {
  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(
    <React.StrictMode>
      {/* <Clock /> */}
      {/*<CommentList> */}
      {/* <Notification /> */}
      {/* <Accommodate /> */}
      {/* <ConfirmButton /> */}
      <Toolbar />
    </React.StrictMode>,
    document.getElementById('root')
  );
}, 1000);

/*const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Clock />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
*/