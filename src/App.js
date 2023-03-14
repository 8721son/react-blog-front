import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Join from "./pages/Join";
import Login from "./pages/Login";
import Posts from "./pages/Posts";
import InsertPost from "./pages/InsertPost";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Posts />} />
          <Route path='/join' element={<Join />} />
          <Route path='/login' element={<Login />} />
          <Route path='/insert-post' element={<InsertPost />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
