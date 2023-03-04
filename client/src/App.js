import Header from "./components/Header"
import Login from "./components/Login"
import Register from "./components/Register"
import Home from "./components/Home"


import  {BrowserRouter as Router, Routes, Route} from "react-router-dom"

function App() {

//Page navigation
  return (
    <Router>
      <div className="App">
        
        <Routes>
          <Route path="/" element={<><Header/><Home/>  </>}></Route>
          <Route path='/login' element={<><Header/><Login /> </>} />
          <Route path='/register' element={<><Header/><Register/> </>} />
        </Routes>
        
      </div>
    </Router>

  );
}

export default App;

