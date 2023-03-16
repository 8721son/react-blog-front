import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Join from "./pages/Join";
import Login from "./pages/Login";
import Posts from "./pages/Posts";
import InsertPost from "./pages/InsertPost";
import Post from "./pages/Post";
import UpdatePost from "./pages/UpdatePost";
import My from "./pages/My";
import ChangeInfo from "./pages/ChangeInfo";
import Error404 from "./pages/Error404";

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
          <Route path='/update-post/:idx' element={<UpdatePost />} />
          <Route path='/my' element={<My />} />
          <Route path='/change-info' element={<ChangeInfo />} />
          <Route path='*' element={<Error404 />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
