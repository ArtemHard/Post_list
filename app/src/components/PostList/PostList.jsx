import { Grid } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import PostsItem from "../PostsItem/PostsItem";
import { loadAllPosts } from "../redux/actions/postsAC";

const PostsList = () => {
    const dispatch = useDispatch()

    const posts = useSelector((store) => store.posts )
    
    useEffect(() => {
        dispatch(loadAllPosts())
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []) 
    console.log({posts});

  if (!posts.length) return <div> Posts list is empty</div>
    
  return (
    <Grid container spacing={4} justifyContent="center">
      {posts.map((post) => {
        return <PostsItem key={post._id} {...post}/>
      })}
    </Grid>
    
  )
};

export default PostsList;
