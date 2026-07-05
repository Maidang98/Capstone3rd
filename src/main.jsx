import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

// Import Bootstrap và Font Awesome
import 'bootstrap/dist/css/bootstrap.min.css'
import '@fortawesome/fontawesome-free/css/all.min.css'

// Import CSS custom
import './index.css'

// Import App và Redux store
import App from './App.jsx'
import store from "./store"
import { Provider } from 'react-redux'

// Import Ant Design reset
import 'antd/dist/reset.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
)
