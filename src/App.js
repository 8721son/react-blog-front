import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Join from "./pages/Join";
import Login from "./pages/Login";
import Posts from "./pages/Posts";
import InsertPost from "./pages/InsertPost";
import Post from "./pages/Post";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Posts />} />
          <Route path='/join' element={<Join />} />
          <Route path='/login' element={<Login />} />
          <Route path='/insert-post' element={<InsertPost />} />
          <Route path='/post/:idx' element={<Post />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
