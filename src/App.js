import './App.css';
import Home from './components/pages/Home/Home';
import { Routes ,Route } from 'react-router-dom';
import User from "./components/pages/User/User";




function App () {
  
  return (
    
     <Routes>
       <Route path='/' element={<Home />}/>
       <Route path="/user/:login" element={<User />}/>
     </Routes>
    
  );
}

export default App;
