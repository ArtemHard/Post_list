import { Grid } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useThrottle } from "../../hooks/useThrottle";
// import { useDebounce } from "../hooks/useDebounce";
import PostsItem from "../PostsItem/PostsItem";
import { loadAllPosts } from "../../redux/actions/postsAC";
import Loader from "../Loader/Loader";
// import {useThrottle} from '@react-hook/throttle'

const PostsList = () => {
  const dispatch = useDispatch();

  const posts = useSelector((store) => store.posts);
  const personId = useSelector((store) => store.person._id);

  const search = useSelector((store) => store.search);

  const reqStatus = useSelector((store) => store.requestStatus);

  // const debouncedSearch = useDebounce(search, 500)
  const debouncedSearch = useThrottle(search, 500);

  useEffect(() => {
    dispatch(loadAllPosts(debouncedSearch));
  }, [debouncedSearch, dispatch]);

  return (
    <Grid container spacing={4} justifyContent='center'>
      {reqStatus === "pending" && <Loader />}
      {/* {reqStatus !== "pending" && reqStatus !== "fulfilled" && (
        <b className={{ top: "300px" }}>{reqStatus}</b>
      )} */}
      {reqStatus !== "pending" &&
        posts
          .map((post) => {
            return <PostsItem key={post._id} personId={personId} {...post} />;
          })
          .reverse()}
    </Grid>
  );
};

export default PostsList;
