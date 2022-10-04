import { Box, Grid, TextField } from "@mui/material";
import React, { useContext } from "react";
// import { useEffect } from "react";
// import { useState } from "react";
// import { useSelector } from "react-redux";
import { ProfileContext } from "../../contexts/profileContext";
import styles from "../profile.module.css";
import { ProfileList } from "./ProfileList/ProfileList";

export const ProfileData = () => {
  const { person, newName, setNewName, newAbout, setNewAbout, btnNameAbout } =
    useContext(ProfileContext);

  // const person = useSelector((store) => store.person);
  // const [name, setName] = useState(person.name);
  // const [about, setAbout] = useState(person.about);

  const changeAbout = (e) => {
    setNewAbout(e.target.value);
  };
  const changeName = (e) => {
    setNewName(e.target.value);
  };

  return (
    <Grid container spacing={3} justifyContent='center'>
      <img className={styles.avatar} src={person.avatar} alt='avatar'></img>
      <Box
        component='form'
        sx={{
          m: 3,
          // width: "25ch",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "20px",
        }}
        noValidate
        autoComplete='off'
      >
        <TextField
          disabled={btnNameAbout}
          id='outlined-disabled'
          label='Имя'
          // defaultValue={person.name}
          name='name'
          value={newName}
          onChange={changeName}
        />
        <TextField
          disabled={btnNameAbout}
          id='outlined-disabled'
          label='Профессия'
          // defaultValue={person.about}
          name='About'
          value={newAbout}
          onChange={changeAbout}
        />
        <TextField
          // disabled={btnActive}
          disabled
          id='outlined-disabled'
          label='avatar'
          defaultValue={person.avatar}
        />
        <TextField
          // disabled={btnActive}
          disabled
          id='outlined-disabled'
          label='Почта'
          defaultValue={person.email}
        />
        <ProfileList />
      </Box>
    </Grid>
  );
};
