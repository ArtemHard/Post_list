import { createContext, useState } from "react";
import { useSelector } from "react-redux";

const ProfileContext = createContext();

const ProfileProvider = ({ children }) => {
  const [btnActive, setBtnActive] = useState(true);
  const [btnNameAbout, setBtnNameAbout] = useState(true);
  const [modal, setModal] = useState(false);

  const person = useSelector((store) => store.person);

  const [newName, setNewName] = useState(person.name);
  const [newAbout, setNewAbout] = useState(person.about);

  const createObjUser = () => {
    const newObjUser = {
      name: newName,
      about: newAbout,
    };

    // return JSON.stringify(newObjUser);
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
