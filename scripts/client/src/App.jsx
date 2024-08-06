import Navbar from './components/Navbar'
import Details from './components/Details'
import List from './components/List'
import { BrowserRouter, Route, Routes } from "react-router-dom";


function App() {
  

  return (
    <div>
      <BrowserRouter>
      <Navbar/>
            <Routes>               
                <Route path="/" element={  <List /> } />
                <Route path="/user" element={<Details />} /> 
                <Route path="/user/:id" element={<Details />} />
            </Routes>
            </BrowserRouter> 
    </div>
  )
}

export default App
