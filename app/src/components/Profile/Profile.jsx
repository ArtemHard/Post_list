import { Outlet } from "react-router-dom";
import ProfileProvider from "../contexts/profileContext";
import ButtonEdit from "./ButtonEdit/ButtonEdit";
import styles from "./profile.module.css";
import { ProfileData } from "./ProfileData/ProfileData";

const Profile = () => {
  return (
    <ProfileProvider>
      <h1 className={styles.title}>Профиль</h1>
      <ProfileData />
      <ButtonEdit />
      <Outlet />
    </ProfileProvider>
  );
};

export default Profile;
