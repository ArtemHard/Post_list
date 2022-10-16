import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Grid } from "@mui/material";
import { useServerData } from "../../hooks/useServerData";
import { useTags } from "../../hooks/useTags";
import { useLikes } from "../../hooks/useLikes";
import { queryAddLike, queryDeleteLike } from "../../redux/actions/postsAC";
import { useDispatch } from "react-redux";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function PostsItem({
  image,
  author,
  title,
  text,
  updated_at,
  tags,
  likes,
  personId,
  _id,
}) {
  const [expanded, setExpanded] = React.useState(false);
  const updatedTime = useServerData(updated_at);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const description = text.length > 200 ? text.slice(0, 200) + "..." : text;

  const tagsString = useTags(tags);
  const likesInfo = useLikes(likes, personId);

  const dispatch = useDispatch();

  const likeClicHandler = (e) => {
    e.preventDefault();
    likesInfo?.color === "red"
      ? dispatch(queryDeleteLike(_id))
      : dispatch(queryAddLike(_id));
  };

  return (
    <Grid item xs={6}>
      <Card>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: red[500] }} aria-label='recipe'>
              {author.name.slice(0, 1)}
            </Avatar>
          }
          action={
            <IconButton aria-label='settings'>
              <MoreVertIcon />
            </IconButton>
          }
          title={title}
          subheader={updatedTime}
        />
        <CardMedia component='img' height='194' image={image} alt={title} />
        <CardContent>
          <Typography variant='body2' color='text.secondary'>
            {description}
          </Typography>
          <hr />
          <b>#</b> <span>{tagsString}</span>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton aria-label='add to favorites' onClick={likeClicHandler}>
            <FavoriteIcon
              sx={{
                color: likesInfo?.color,
              }}
            />{" "}
            <span>{likesInfo?.amount}</span>
          </IconButton>
          {/* <IconButton aria-label="share">
          <ShareIcon />
        </IconButton> */}
          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label='show more'
          >
            <ExpandMoreIcon />
          </ExpandMore>
        </CardActions>
        <Collapse in={expanded} timeout='auto' unmountOnExit>
          <CardContent>
            <Typography paragraph>{text}</Typography>
          </CardContent>
        </Collapse>
      </Card>
    </Grid>
  );
}
