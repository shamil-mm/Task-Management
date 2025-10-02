import { BrowserRouter as  Router,Routes,Route } from "react-router-dom"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Dashboard from "./pages/Dashboard"
import PrivateRoute from "./components/PrivateRoute"

 
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/dashboard" element={<PrivateRoute><Dashboard /></ PrivateRoute>}/>
      </Routes>
    </Router>
  )
}

export default App
