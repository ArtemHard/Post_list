import "./App.css";
import Container from "@mui/material/Container";
import NavBar from "./components/NavBar/NavBar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./components/Main/Main";
import PostForm from "./components/PostForm/PostForm";

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Container maxWidth='md' className='container'>
        <Routes>
          <Route path='/' element={<Main />} />
          <Route path='/postform' element={<PostForm />} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
}

export default App;
