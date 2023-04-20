import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { legacy_createStore as createStore ,combineReducers} from 'redux'; 
import App from './App';
import { Provider } from 'react-redux';
import reportWebVitals from './reportWebVitals';
//import { store } from './App/store'
import todoReducer from './store/reducer' 



const store = createStore(todoReducer);



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store} >
      <App />
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
