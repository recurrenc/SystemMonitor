import React from 'react'
import ReactDOM from 'react-dom'

import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'

// import App from './App'
import SystemInfo from './SystemInfo'

ReactDOM.render(
  <React.StrictMode>
    {/* <App /> */}
    <SystemInfo />
  </React.StrictMode>,
  document.getElementById('root')
)
