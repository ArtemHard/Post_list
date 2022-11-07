import { Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { queryGetSinglePost } from "../../../redux/actions/postsAC.ts";
import Comment from "../../Comment/Comment";
import { ButtonUp } from "../../generic/ButtonUp/ButtonUp";
import Loader from "../../Loader/Loader";
import { ButtonComments } from "./components/ButtonComments";
import PostDetailCard from "./PostDetailCard/PostDetailCard";

export const PostDetail = () => {
  const { postId } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(queryGetSinglePost(postId));
  }, [postId, dispatch]);

  const reqStatus = useSelector((store) => store.requestStatus);
  const post = useSelector((store) => store.posts[0]);
  const commentsLength = post.comments.length;
  const pendingStatus = "getSinglePost-pending";

  console.log(post);

  const [showCommentBtn, setShowCommentBtn] = useState(false);
  const [showComments, setShowComments] = useState(false);

  useEffect(() => {
    if (reqStatus !== pendingStatus && commentsLength) {
      setShowCommentBtn(true);
    }
    return () => setShowCommentBtn(false);
  }, [showCommentBtn, commentsLength, reqStatus]);

  return (
    <Grid
      container
      justifyContent="center"
      direction="column"
      alignItems="center"
      gap="10px"
    >
      {reqStatus === pendingStatus && <Loader />}
      {reqStatus !== pendingStatus && <PostDetailCard {...post} />}
      {showCommentBtn && (
        <ButtonComments
          reqStatus={reqStatus}
          setShowComments={setShowComments}
          showComments={showComments}
          {...post}
        />
      )}
      {showComments &&
        post.comments
          .map((comment) => <Comment key={comment._id} {...comment} />)
          .reverse()}
      <ButtonUp />
    </Grid>
  );
};

export default PostDetail;
