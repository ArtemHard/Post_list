import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { loadPersonPosts } from "../../../../redux/actions/personAC";
import styles from "../../profile.module.css";

export const ProfileList = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  let nextUrl;
  let textBtn;

  const person = useSelector((store) => store.person);
  useEffect(() => {
    dispatch(loadPersonPosts(person._id));
  }, []);

  location.pathname === "/profile"
    ? (nextUrl = "/profile/myposts") &&
      (textBtn = `Количество постов: ${person.posts.length}`)
    : (nextUrl = "/profile") &&
      (textBtn = `Скрыть посты (${person.posts.length})`);
  console.log(location.pathname);

  return (
    <div className={styles.profile__count_box}>
      <Link to={nextUrl} className={styles.inactive}>
        <span className={styles.profile__count_box__span}>{textBtn}</span>
      </Link>
    </div>
  );
};
