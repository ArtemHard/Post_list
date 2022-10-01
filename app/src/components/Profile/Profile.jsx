import { Box, Grid, TextField } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import styles from "./profile.module.css";

const Profile = () => {
  const person = useSelector((store) => store.person);

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
        <h1>Профиль</h1>
        <TextField
          disabled
          id='outlined-disabled'
          label='Имя'
          defaultValue={person.name}
        />
        <TextField
          disabled
          id='outlined-disabled'
          label='Профессия'
          defaultValue={person.about}
        />
        <TextField
          disabled
          id='outlined-disabled'
          label='avatar'
          defaultValue={person.avatar}
        />
        <TextField
          disabled
          id='outlined-disabled'
          label='Почта'
          defaultValue={person.email}
        />
      </Box>
    </Grid>
  );
};

export default Profile;
