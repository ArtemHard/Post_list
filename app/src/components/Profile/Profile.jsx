import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Outlet, useParams } from "react-router-dom";
import ProfileProvider from "../contexts/profileContext";
import ButtonEdit from "./ButtonEdit/ButtonEdit";
import styles from "./profile.module.css";
import { ProfileData } from "./ProfileData/ProfileData";

const Profile = () => {
  const { id: userId } = useParams();
  const [userOrGuest, setUserOrGuest] = useState(false);
  const person = useSelector((store) => store.person);
  useEffect(() => {
    userId === person._id ? setUserOrGuest(true) : setUserOrGuest(false);
  }, [userOrGuest, userId, person._id]);
  return (
    <ProfileProvider>
      <h1 className={styles.title}>Профиль</h1>
      <ProfileData />
      {userOrGuest && <ButtonEdit />}
      <Outlet />
    </ProfileProvider>
  );
};

export default Profile;
