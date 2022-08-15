import "./App.css";
import Container from "@mui/material/Container";
import NavBar from "./components/NavBar/NavBar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./components/Main/Main";

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Container maxWidth='md' className='container'>
        <Routes>
          <Route path='/' element={<Main />} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
}

export default App;
