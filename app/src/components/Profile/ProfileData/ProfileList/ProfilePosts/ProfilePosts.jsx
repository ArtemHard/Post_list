import { Grid } from "@mui/material";
import React, { useContext } from "react";
import { ProfileContext } from "../../../../contexts/profileContext";
import { ButtonUp } from "../../../../generic/ButtonUp/ButtonUp";
import PostsItem from "../../../../PostsItem/PostsItem";

export const ProfilePosts = () => {
  const {
    person,
  } = useContext(ProfileContext);
  const post = person?.posts // Такого НЕТУ!
  console.log(person.posts);
  const personId = person._id
  return (
    <Grid container spacing={4} justifyContent='center'>
      {!post.length && <span style={{marginTop: '100px'}}>Нет постов</span>}
      {post
        .map((post) => {
          return <PostsItem key={post._id} personId={personId} {...post} />;
        })
        .reverse()}
      {<ButtonUp />}
    </Grid>
  );
};
