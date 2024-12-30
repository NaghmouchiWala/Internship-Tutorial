import './App.css';
import { Navigate, Route, Routes } from 'react-router-dom';
import Signup from './pages/signup/Signup';
import Login from './pages/login/Login';
import Dashboard from './pages/dashboard/dashboard';
import { useAuth } from './hooks/useAuth';
import PostUser from './pages/post-user/PostUser';
import UpdateUser from './pages/update-user/UpdateUser';
import HomePage from './pages/homepage/HomePage';

function App() {

const PrivateRoute = ({element}) => {
  const {currentUser} = useAuth();
  return currentUser ? element : <Navigate to="/login" />
}

  return (
   <>
   <Routes>
   <Route path="/" element={<HomePage />} />
    <Route path='/register' element={<Signup/>}></Route>
    <Route path='/login' element={<Login/>}></Route>
    <Route path='/dashboard' element={<PrivateRoute element={<Dashboard/>} />}></Route>
    <Route path='/user' element={<PrivateRoute element={<PostUser/>} />}></Route>
    <Route path='/user/:id/edit' element={<PrivateRoute element={<UpdateUser/>} />}></Route>


   </Routes>
   </>
  );
}

export default App;
