import React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import { useServerData } from "../../hooks/useServerData";

export const Comment = ({
  _id,
  text,
  author,
  post,
  created_at,
  updated_at,
}) => {
  const time = useServerData(created_at);

  return (
    <Card sx={{ maxWidth: 690 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label='recipe'>
            R
          </Avatar>
        }
        title='Здесь будет имя если будет запрос'
        subheader={time}
      />
      <CardContent>
        <Typography paragraph>{text}</Typography>
      </CardContent>
    </Card>
  );
};
export default Comment;
