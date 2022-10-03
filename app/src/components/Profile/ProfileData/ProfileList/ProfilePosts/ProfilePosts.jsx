import { Grid } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import PostsItem from "../../../../PostsItem/PostsItem";

export const ProfilePosts = () => {
  const post = useSelector((store) => store.person.posts);
  return (
    <Grid container spacing={4} justifyContent='center'>
      {!post.length && <span>У вас нет постов</span>}
      {post
        .map((post) => {
          return <PostsItem key={post._id} {...post} />;
        })
        .reverse()}
    </Grid>
  );
};