import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './Redux/store';
import Home from './Routes/Home';
import langFile from './assets/lang/1.8/en_US.lang';
import { initFilters, LangValue, setDefaultValues } from './Redux/slices/valueSlice';
import Regex from './Routes/Regex';
import { importString } from './Redux/subscribers/versionChange';

let filters: string[] = [];

fetch(langFile).then(res => res.text()).then(
  (res) => {
    importString(res);
  }
)


ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <React.StrictMode>
        <Routes>
          <Route path='/' element={<App />}>
            <Route path='regex' element={<Regex />} />
            <Route index element={<Home />} />
          </Route>
        </Routes>
      </React.StrictMode>
    </Provider>
  </BrowserRouter>
  ,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
