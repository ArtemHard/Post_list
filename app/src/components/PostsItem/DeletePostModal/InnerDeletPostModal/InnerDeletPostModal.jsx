import React from "react";
import styles from "./innerDeletPostModal.module.css";
import { Alert, Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import LoadingButton from "@mui/lab/LoadingButton";
import Stack from "@mui/material/Stack";
import { useDispatch, useSelector } from "react-redux";
import {
  queryDeleteComment,
  queryDeletePost,
} from "../../../../redux/actions/postsAC";
import { useState } from "react";
import { useEffect } from "react";

export const InnerDeletPostModal = (props) => {
  const dispatch = useDispatch();
  const status = useSelector((store) => store.requestStatus);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    status === "deletePending" ? setLoading(true) : setLoading(false);
    status === "deleteComment-pending" ? setLoading(true) : setLoading(false);
  }, [status]);

  const deletePostHandler = (e) => {
    e.preventDefault();
    if (props.commentId) {
      dispatch(queryDeleteComment(props.postId, props.commentId));
    } else dispatch(queryDeletePost(props.postId));
  };
  return (
    <div className={styles.wrapper}>
      <form className={styles.inner}>
        <Alert severity='warning'>
          <strong>Вы уверенны?</strong>
        </Alert>
        <Stack direction='row' spacing={2}>
          <Button variant='contained' onClick={() => props.setModal(false)}>
            Отмена
          </Button>
          <LoadingButton
            endIcon={<DeleteIcon />}
            loading={loading}
            loadingPosition='end'
            variant='contained'
            type='submit'
            color='error'
            onClick={deletePostHandler}
          >
            Удалить
          </LoadingButton>
        </Stack>
      </form>
    </div>
  );
};
