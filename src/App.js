import { BrowserRouter, Routes,Route, Navigate } from "react-router-dom";
import SignIn from "./components/SignIn/SignIn";
import { ContextProvider } from "./components/ContextApi/context";
import SignUp from "./components/SignUp/SignUp";
import Blogs from "./components/Blogs/Blogs";
import CreateBlog from "./components/CreateBlog/CreateBlog";

function App() {
  const token=localStorage.getItem('token');
  return (
    <BrowserRouter>
      <ContextProvider>
        <Routes>
          <Route path='/' element={<SignIn/>} />
          <Route path="/register" element={<SignUp/>} />
          <Route path="/blogs" element={
            token ? (<Blogs/>):(<Navigate replace to={'/'} />)
          }/>
          <Route path="/createBlog" element={
            token ? (<CreateBlog/>):(<Navigate replace to={'/'} />)
          }/>
        </Routes>
      </ContextProvider>
    </BrowserRouter>
  );
}

export default App;
