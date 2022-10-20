import { Button } from "@mui/material";

export const ButtonComments = ({ comments, setShowComments, showComments }) => {
  const btnTextFalse = `Показать комментарии (${comments.length})`;
  const btnTextTrue = `Скрыть комментарии`;
  return (
    <Button onClick={() => setShowComments(!showComments)} variant='outlined'>
      {showComments ? btnTextTrue : btnTextFalse}
    </Button>
  );
};
