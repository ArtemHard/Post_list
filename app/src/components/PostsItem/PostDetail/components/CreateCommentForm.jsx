import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import LoadingButton from "@mui/lab/LoadingButton";
import SendIcon from "@mui/icons-material/Send";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { queryAddComment } from "../../../../redux/actions/postsAC.ts";

export const CreateCommentForm = ({ id }) => {
  const status = useSelector((store) => store.requestStatus);
  const [loading, setLoading] = React.useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    status !== "addComment-pending" ? setLoading(false) : setLoading(true);
  }, [status]);

  function handleClick(e) {
    e.preventDefault();
    const formData = Object.fromEntries(new FormData(e.target).entries());
    dispatch(queryAddComment(id, formData));
    e.target.reset();
  }
  return (
    <Box
      component='form'
      sx={{
        "& .MuiTextField-root": { m: 1 },
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "20px",
      }}
      noValidate
      autoComplete='off'
      onSubmit={handleClick}
    >
      <TextField
        sx={{
          display: "flex",
          alignSelf: "stretch",
        }}
        id='standard-textarea'
        label='Введите комментарий'
        // placeholder='Placeholder'
        multiline
        variant='standard'
        name='text'
      />
      <LoadingButton
        endIcon={<SendIcon />}
        loading={loading}
        loadingPosition='end'
        variant='contained'
        type='submit'
      >
        Отправить
      </LoadingButton>
    </Box>
  );
};

export default CreateCommentForm;
