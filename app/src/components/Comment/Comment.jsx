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
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { DeletePostModal } from "../PostsItem/DeletePostModal/DeletePostModal";
import { useNavigate } from "react-router-dom";

export const Comment = ({
  _id,
  text,
  author,
  post,
  created_at,
  updated_at,
}) => {
  const time = useServerData(created_at);
  const [deleteBtn, setDeleteBtn] = useState(false);
  const [modal, setModal] = useState(false);
  const user = useSelector((store) => store.person);

  useEffect(() => {
    if (author === user._id) {
      setDeleteBtn(true);
    }
  }, [deleteBtn, author, user._id]);

  const navigate = useNavigate();

  console.log(author);
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
          <Avatar
            sx={{ bgcolor: red[500], cursor: "pointer" }}
            aria-label='recipe'
            // src={author.avatar}
            onClick={() => navigate(`/profile/${author}`)}
          >
            R
          </Avatar>
        }
        // title={author.name}
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
