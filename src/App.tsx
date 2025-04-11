import { BrowserRouter as Router, Route, Routes } from 'react-router';
import  CreateHusbandGramPage  from "./create-husbandgram";
import Home from './Home'
import "./App.css"


 function App() {
  return (
    <Router>

      <Routes>
        <Route path='/husband-gram' element={<CreateHusbandGramPage/>} />
        <Route path='/' element={<Home/>} />
      </Routes>
       </Router>


  )
}

export default App

