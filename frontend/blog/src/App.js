import React from 'react';
import Header from './components/header/Header';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Home from './pages/home/Home.jsx';
import Login from './pages/forms/Login.jsx';
import Register from './pages/forms/Register.jsx';
import PostsPage from './pages/posts-page/PostsPage.jsx';
import CreatePost from './pages/create-post/CreatePost.jsx';
import AdminDashbord from './pages/admin/AdminDashbord.jsx';

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Header/>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/login' element={<Login/>} />
          <Route path='/register' element={<Register/>} />
          <Route path='/posts' element={<PostsPage/>} />
          <Route path='/posts/create-post' element={<CreatePost/>} />
          <Route path='/admin-dashboard' element={<AdminDashbord/>} />


        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App