import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './Redux/store';
import Home from './Routes/Home';
import langFile from './assets/en_US.lang'
import { initFilters, LangValue, setDefaultValues } from './Redux/slices/valueSlice';
import Regex from './Routes/Regex';

fetch(langFile).then(res => res.text()).then(
  (res) => {
    let langDictionary: { [key: string]: string } = {};
    let filters = new Set<string>()

    res.split('\n').forEach(line => {
      const [key, value] = line.split('=');
      if(key && value) {
        filters.add(key.split(".")[0]);
        langDictionary[key] = value;
      }
    });

    store.dispatch(setDefaultValues(langDictionary));
    store.dispatch(initFilters(Array.from(filters)));
  }
)


ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <React.StrictMode>
        <Routes>
          <Route path='/' element={<App />}>
            <Route path='regex' element={<Regex />} />
            <Route index element={ <Home /> } />
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
