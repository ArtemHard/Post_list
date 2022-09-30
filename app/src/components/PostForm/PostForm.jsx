import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import Button from "@mui/material/Button";
import { useDispatch } from "react-redux";
import { FormControl, Grid } from "@mui/material";
import { queryNewPost } from "../../redux/actions/postsAC";
import { useEffect } from "react";
import { useNavigate } from "react-router";

const PostForm = () => {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [image, setImage] = useState("");
  const [tags, setTags] = useState("");

  const [disabled, setDisabled] = useState(true);

  const [errors, setErrors] = useState({});

  let navigate = useNavigate();

  useEffect(() => {
    const validate = () => {
      let temp = {};

      temp.title = title.length > 3 ? null : "Введите более чем 3 символа";
      temp.text = text.length > 3 ? null : "Введите более чем 3 символа";
      temp.image = /(http)(.*)/g.test(image)
        ? null
        : "не корректный адрес HTTP";

      setErrors({ ...temp });
      temp.title || temp.text || temp.image
        ? setDisabled(true)
        : setDisabled(false);
    };
    validate();
  }, [title, text, image, tags]);

  const dispatch = useDispatch();

  const submitHandler = () => {
    const preparedPostQuery = {
      title: title,
      text: text,
      image: image,
      tags: tags.split(",").map((el) => el.trim()),
    };

    const body = JSON.stringify(preparedPostQuery);

    dispatch(queryNewPost(body));

    navigate("/posts");
  };

  return (
    <Grid container spacing={3} justifyContent='center'>
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
        <FormControl>
          <TextField
            error={errors.title}
            helperText={errors.title}
            id='outlined-basic'
            label='Title'
            variant='outlined'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </FormControl>
        <TextField
          error={errors.text}
          helperText={errors.text}
          id='outlined-basic'
          label='Text'
          variant='outlined'
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <TextField
          error={errors.image}
          helperText={errors.image}
          id='outlined-basic'
          label='Image'
          variant='outlined'
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />
        <TextField
          id='outlined-basic'
          label='Tags'
          variant='outlined'
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />
        <Button
          onClick={submitHandler}
          variant='contained'
          size='large'
          disabled={disabled}
        >
          Create Post
        </Button>
      </Box>
    </Grid>
  );
};

export default PostForm;
