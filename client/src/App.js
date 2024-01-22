import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Home from './Components/Home'
import Register from './Components/Register';
import Dashboard from './Components/Dashboard';
import Login from './Components/Login';
import UserContextProvider from './UserContextProvider';
import Header from './Header';


function App() {
  return (
    <>
      <UserContextProvider>
        <BrowserRouter>
          <Header></Header>
          <Routes>
            <Route path='/' element={<Home></Home>}></Route>
            <Route path='/register' element={<Register></Register>}></Route>
            <Route path='/login' element={<Login></Login>}></Route>
            <Route path='/dashboard' element={<Dashboard></Dashboard>}></Route>
          </Routes>
        </BrowserRouter>
      </UserContextProvider>
    </>
  );
}

export default App;
