import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import Button from "@mui/material/Button";
import { useDispatch } from "react-redux";
import { TextareaAutosize } from "@mui/material";
import { queryNewPost } from "../../redux/actions/postsAC";

const PostForm = () => {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [image, setImage] = useState("");
  const [tags, setTags] = useState("");

  const dispatch = useDispatch();

  const submitHandler = () => {
    const preparedPostQuery = {
      title: title,
      text: text,
      image: image,
      tags: tags.split(",").map((el) => el.trim()),
    };

    const body = JSON.stringify(preparedPostQuery)
    console.log(body);

    dispatch(queryNewPost(body));
  };

  const isTitleError = false; // Валидация https://mui.com/material-ui/react-text-field/#main-content

  return (
    <Box
      component='form'
      sx={{
        "& > :not(style)": { m: 1, width: "25ch" },
      }}
      noValidate
      autoComplete='off'
    >
      <div>
        <TextField
          error={isTitleError}
          helperText={isTitleError && "Title must have min 3 symbols"}
          id='outlined-basic'
          label='Title'
          variant='outlined'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      {/* <div>
        <TextField
          id='filled-basic'
          label='Text'
          variant='outlined'
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div> */}
      <TextareaAutosize
        maxRows={8}
        aria-label='maximum height'
        placeholder='Text'
        defaultValue='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
      ut labore et dolore magna aliqua.'
        style={{ width: 200 }}
        label='Text'
        variant='outlined'
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <div>
        <TextField
          id='standard-basic'
          label='Image'
          variant='outlined'
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />
      </div>
      <div>
        <TextField
          id='standard-basic'
          label='Tags'
          variant='outlined'
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />
      </div>
      <Button onClick={submitHandler} variant='outlined'>
        Create Post
      </Button>
    </Box>
  );
};

export default PostForm;
