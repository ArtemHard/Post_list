import "./App.css";
import Container from "@mui/material/Container";
import NavBar from "./components/NavBar/NavBar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./components/Main/Main";
import PostForm from "./components/PostForm/PostForm";
import PostsList from "./components/PostList/PostList";
import { RequireAuth } from "./components/Auth/RequireAuth/RequireAuth";
import SignIn from "./components/Auth/SignIn/SignIn";
import Profile from "./components/Profile/Profile";
import { ProfilePosts } from "./components/Profile/ProfileData/ProfileList/ProfilePosts/ProfilePosts";
import PostDetail from "./components/PostsItem/PostDetail/PostDetail";

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Container maxWidth='md' className='container'>
        <Routes>
          <Route path='/' element={<Main />} />
          <Route
            path='/posts'
            element={
              <RequireAuth>
                <PostsList />
              </RequireAuth>
            }
          />
          <Route path='/posts/:postId' element={<PostDetail />} />
          <Route
            path='/postform'
            element={
              <RequireAuth>
                <PostForm />
              </RequireAuth>
            }
          />
          <Route path='/signin' element={<SignIn />} />
          <Route
            path='/profile/:id'
            element={
              <RequireAuth>
                <Profile />
              </RequireAuth>
            }
          >
            <Route path='posts' element={<ProfilePosts />} />
          </Route>
          <Route path='/signin' element={<SignIn />} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
}

export default App;
