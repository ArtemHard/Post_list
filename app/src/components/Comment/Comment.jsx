import React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import { useServerData } from "../../hooks/useServerData";
import { Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { queryDeleteComment } from "../../redux/actions/postsAC";
import { DeletePostModal } from "../PostsItem/DeletePostModal/DeletePostModal";

export const Comment = ({
  _id,
  text,
  author,
  post,
  created_at,
  updated_at,
}) => {
  const time = useServerData(created_at);
  const dispatch = useDispatch();
  const [deleteBtn, setDeleteBtn] = useState(false);
  const [modal, setModal] = useState(false);
  const user = useSelector((store) => store.person);

  useEffect(() => {
    if (author === user._id) {
      setDeleteBtn(true);
    }
  }, [deleteBtn, author, user._id]);

  // const deleteCommentClickHandler = () => {
  //   dispatch(queryDeleteComment(post, _id));
  // };
  return (
    <Card sx={{ maxWidth: 588, height: "100%", width: "100%" }}>
      <DeletePostModal
        postId={post}
        modal={modal}
        setModal={setModal}
        commentId={_id}
      />
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label='recipe'>
            R
          </Avatar>
        }
        title='Здесь будет имя если будет запрос'
        subheader={time}
        action={
          deleteBtn && (
            <Button
              // onClick={deleteCommentClickHandler}
              onClick={() => setModal(true)}
              size='small'
              variant='outlined'
              startIcon={<DeleteIcon />}
            >
              Удалить
            </Button>
          )
        }
      />

      <CardContent>
        <Typography
          sx={{
            wordWrap: "break-word",
          }}
          paragraph
        >
          {text}
        </Typography>
      </CardContent>
    </Card>
  );
};
export default Comment;
