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
  console.log(btnNameAbout);

  const changeAbout = (e) => {
    setNewAbout(e.target.value);
  };
  const changeName = (e) => {
    setNewName(e.target.value);
  };

  const clickHandler = () => {
    if (btnNameAbout === false) {
      console.log("вызвал модульное окно");
    }
  };

  const text = "Нажмите\nдля \nзамены";

  return (
    <Grid container spacing={3} justifyContent='center'>
      <div className={styles.avatar__container} onClick={clickHandler}>
        <img
          className={btnNameAbout ? styles.avatar : styles.avatar_blur}
          src={person.avatar}
          alt='avatar'
        />
        {btnNameAbout ? null : <span className={styles.textClick}>{text}</span>}
      </div>
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
