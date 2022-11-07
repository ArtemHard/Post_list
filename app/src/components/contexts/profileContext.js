import { createContext, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";

const ProfileContext = createContext();

const ProfileProvider = ({ children, userId }) => {
  const [btnActive, setBtnActive] = useState(true);
  const [btnNameAbout, setBtnNameAbout] = useState(true);
  const [modal, setModal] = useState(false);

  const personAuth = useSelector((store) => store.person);
  const userPerson = useSelector((store) => store.user);
  let person;

  userId === personAuth._id ? (person = personAuth) : (person = userPerson);

  const [newName, setNewName] = useState(person.name);
  const [newAbout, setNewAbout] = useState(person.about);

  useEffect(() => {
    setNewName(person.name);
    setNewAbout(person.about);
  }, [person]);
  const createObjUser = () => {
    const newObjUser = {
      name: newName,
      about: newAbout,
    };

    return newObjUser;
  };

  const resetObjUser = () => {
    setNewName(person.name);
    setNewAbout(person.about);
  };
  return (
    <ProfileContext.Provider
      value={{
        btnActive,
        setBtnActive,
        person,
        newName,
        setNewName,
        newAbout,
        setNewAbout,
        createObjUser,
        resetObjUser,
        btnNameAbout,
        setBtnNameAbout,
        modal,
        setModal,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};

export default ProfileProvider;

export { ProfileContext };
