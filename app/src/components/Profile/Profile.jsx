import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useParams } from "react-router-dom";
import { getUserInfoQuery } from "../../redux/actions/userAC.ts";
import ProfileProvider from "../contexts/profileContext";
import ButtonEdit from "./ButtonEdit/ButtonEdit";
import styles from "./profile.module.css";
import { ProfileData } from "./ProfileData/ProfileData";

const Profile = () => {
  const dispatch = useDispatch()
  const { id: userId } = useParams();
  const [userOrGuest, setUserOrGuest] = useState(false);
  const person = useSelector((store) => store.person);
  useEffect(() => {
    if (userId === person._id) {
      setUserOrGuest(true)
    } else {
      setUserOrGuest(false)
      dispatch(getUserInfoQuery(userId))
    }
  }, [userOrGuest, userId, person._id, dispatch]);

  return (
    <ProfileProvider userId={userId}>
      <h1 className={styles.title}>Профиль</h1>
      <ProfileData />
      {userOrGuest && <ButtonEdit />}
      <Outlet />
    </ProfileProvider>
  );
};

export default Profile;
