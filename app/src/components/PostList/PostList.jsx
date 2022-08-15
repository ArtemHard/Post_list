import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { loadAllPosts } from "../redux/actions/postsAC";

const PostsList = () => {
    const dispatch = useDispatch()

    const posts = useSelector((store) => store.posts )
    
    useEffect(() => {
        dispatch(loadAllPosts())
    }, []) 

    console.log(posts)
    
  return <div>List</div>;
};

export default PostsList;
