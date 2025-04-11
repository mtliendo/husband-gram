import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import {Amplify} from 'aws-amplify'
import config from '../amplify_outputs.json'
Amplify.configure(config)



createRoot(document.getElementById('root')!).render(
  <StrictMode>
 
        <App />
    
  </StrictMode>
)
