import { Grid } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { queryGetSinglePost } from "../../../redux/actions/postsAC";
import Loader from "../../Loader/Loader";
import PostDetailCard from "./PostDetailCard/PostDetailCard";

export const PostDetail = () => {
  const { postId } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(queryGetSinglePost(postId));
  }, []);

  const reqStatus = useSelector((store) => store.requestStatus);
  return (
    <Grid container justifyContent='center'>
      {reqStatus === "getSinglePost-pending" && <Loader />}
      {reqStatus !== "getSinglePost-pending" && <PostDetailCard />}
    </Grid>
  );
};

export default PostDetail;
