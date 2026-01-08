import { Routes, Route } from "react-router-dom";
import LoginForm from "./components/LoginForm";
import RegisForm from "./components/RegisForm";
import AdminDashboard from "./components/AdminDashboard";
import AddBlogs from "./components/AddBlog";
import AllBlogs from "./components/AllBlogs";
import EditBlog from "./components/EditBlog";
import BlogDetails from "./components/BlogDetails";


function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/register" element={<RegisForm />} />
        <Route path="/admin" element={<AdminDashboard />}>
          <Route path="all-blogs" element={<AllBlogs />} />
          <Route path="add" element={<AddBlogs />} />
          <Route path="edit/:_id" element={<EditBlog />} />
          <Route path="blog/:_id" element={<BlogDetails />} />
        </Route>
        <Route path="/all-blogs" element={<AllBlogs />} />
        <Route path="/blog/:_id" element={<BlogDetails />} />
        
        
      </Routes>
    </>
  );
}

export default App;
