import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
<<<<<<< HEAD

// Import Bootstrap và Font Awesome
import 'bootstrap/dist/css/bootstrap.min.css'
import '@fortawesome/fontawesome-free/css/all.min.css'

// Import CSS custom của bạn
import './index.css'

import App from './App.jsx'
import store from "./store";
import { Provider } from 'react-redux';
import 'antd/dist/reset.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
=======
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
>>>>>>> 89e95904d8eb143b02064eacb90c609f999686ae
)
