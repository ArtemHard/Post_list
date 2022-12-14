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
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Grid, Menu, MenuItem, Tooltip } from "@mui/material";
import { useServerData } from "../../hooks/useServerData.ts";
import { useTags } from "../../hooks/useTags";
import { useLikes } from "../../hooks/useLikes";
import { queryAddLike, queryDeleteLike } from "../../redux/actions/postsAC.ts";
import { useDispatch } from "react-redux";
import { DeletePostModal } from "./DeletePostModal/DeletePostModal";
import { Link } from "react-router-dom";

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

  let settings;
  personId === author._id
    ? (settings = ["Удалить", "Редактировать", "Открыть"])
    : (settings = ["Открыть"]);

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

  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleCloseOpenUserMenu = (e) => {
    e.preventDefault();
    anchorElUser === null
      ? setAnchorElUser(e.currentTarget)
      : setAnchorElUser(null);
  };

  const [modal, setModal] = React.useState(false);

  const handleOpenSettings = (e) => {
    if (e.target.innerText === "Удалить") {
      setModal(true);
    }
    if (e.target.innerText === "Профиль") {
      // navigate("/profile");
    }
  };

  React.useEffect(() => {
    if (modal) {
      document.body.style.overflow = "hidden";
      document.body.style.paddingRight = "17px";
    }
    return () => {
      document.body.style.overflow = "unset";
      document.body.style.paddingRight = "0px";
    };
  }, [modal]);
console.log('POST ITEM');
  return (
    <Grid item xs={6}>
      <DeletePostModal modal={modal} setModal={setModal} postId={_id} />
      <Card>
        <CardHeader
          avatar={
            <Link to={`/profile/${author._id}`}>
              <Avatar
                sx={{ bgcolor: red[500] }}
                aria-label='recipe'
                src={author.avatar}
                >
                {author.name.slice(0, 1)}
              </Avatar>
            </Link>
          }
          action={
            <Tooltip title={Boolean(anchorElUser) ? null : "Дополнительно"}>
              <IconButton
                aria-label='settings'
                onClick={handleCloseOpenUserMenu}
              >
                <MoreVertIcon />
                <Menu
                  sx={{
                    pr: "0px",
                    mt: "34px",
                  }}
                  id='menu-appbar'
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    padding: "0px",
                    vertical: "top",
                    horizontal: "center",
                    getContentAnchorEl: null,
                  }}
                  keepMounted
                  transformOrigin={{
                    padding: "0px",
                    vertical: "top",
                    horizontal: "center",
                    getContentAnchorEl: null,
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseOpenUserMenu}
                >
                  {settings.map((setting) => (
                    <MenuItem key={setting} onClick={handleCloseOpenUserMenu}>
                      <Typography
                        onClick={handleOpenSettings}
                        key={setting}
                        textAlign='center'
                      >
                        {setting}
                      </Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </IconButton>
            </Tooltip>
          }
          title={title}
          subheader={updatedTime}
        />
        <Link to={`/posts/${_id}`}>
          <CardMedia component='img' height='194' image={image} alt={title} />
        </Link>
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
