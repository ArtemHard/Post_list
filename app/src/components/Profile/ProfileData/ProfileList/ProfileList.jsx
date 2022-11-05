import LoadingButton from "@mui/lab/LoadingButton";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { loadPersonPosts } from "../../../../redux/actions/personAC.ts";
import styles from "../../profile.module.css";

export const ProfileList = ({person}) => {
  const dispatch = useDispatch();
  const location = useLocation();

  const [loading, setLoading] = React.useState(true);

  let nextUrl;
  let textBtn;

  const AuthPerson = useSelector((store) => store.person);
  const status = useSelector((store) => store.requestStatus);

  useEffect(() => {
    if (person._id === AuthPerson._id) {
    dispatch(loadPersonPosts(person._id));
    
    }
  }, [person._id, AuthPerson._id, dispatch]);

  location.pathname === `/profile/${person._id}`
    ? (nextUrl = `/profile/${person._id}/posts`) &&
      (textBtn = `Количество постов: ${person.posts.length}`)
    : (nextUrl = `/profile/${person._id}`) &&
      (textBtn = `Скрыть посты (${person.posts.length})`);
  

  useEffect(() => {
    status === "pending" ? setLoading(true) : setLoading(false);
  }, [status]);

  return (
    <Link to={nextUrl} className={styles.inactive}>
      <LoadingButton
        // onClick={handleClick}
        loading={loading}
        loadingIndicator='Загрузка…'
        variant='outlined'
      >
        {textBtn}
      </LoadingButton>
    </Link>
  );
};
