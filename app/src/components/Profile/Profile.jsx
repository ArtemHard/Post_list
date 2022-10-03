import { useState } from "react";
import { Outlet } from "react-router-dom";
import ButtonEdit from "./ButtonEdit/ButtonEdit";
import styles from "./profile.module.css";
import { ProfileData } from "./ProfileData/ProfileData";

const Profile = () => {
  const [btnActive, setBtnActive] = useState(true);
  return (
    <>
      <h1 className={styles.title}>Профиль</h1>
      <ProfileData btnActive={btnActive} />
      <ButtonEdit btnActive={btnActive} setBtnActive={setBtnActive} />
      <Outlet />
    </>
  );
};

export default Profile;
