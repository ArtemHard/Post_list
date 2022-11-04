import LoadingButton from "@mui/lab/LoadingButton";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { loadPersonPosts } from "../../../../redux/actions/personAC.ts";
import styles from "../../profile.module.css";

export const ProfileList = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  const [loading, setLoading] = React.useState(true);

  let nextUrl;
  let textBtn;

  const person = useSelector((store) => store.person);
  const status = useSelector((store) => store.requestStatus);

  useEffect(() => {
    dispatch(loadPersonPosts(person._id));
  }, []);

  location.pathname === "/profile/"
    ? (nextUrl = "/profile/myposts") &&
      (textBtn = `Количество постов: ${person.posts.length}`)
    : (nextUrl = "/profile") &&
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
