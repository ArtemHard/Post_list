import React from "react";
import styles from "./innerDeletPostModal.module.css";
import { Alert, Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import LoadingButton from "@mui/lab/LoadingButton";
import Stack from "@mui/material/Stack";

export const InnerDeletPostModal = (props) => {
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
            //   loading={loading}
            loadingPosition='end'
            variant='contained'
            type='submit'
            color='error'
          >
            Удалить
          </LoadingButton>
        </Stack>
      </form>
    </div>
  );
};
