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
import { useDispatch, useSelector } from "react-redux";
import { useServerData } from "../../../../hooks/useServerData";
import { useTags } from "../../../../hooks/useTags";
import { useLikes } from "../../../../hooks/useLikes";
import {
  queryAddLike,
  queryDeleteLike,
} from "../../../../redux/actions/postsAC.ts";
import { DeletePostModal } from "../../DeletePostModal/DeletePostModal";
import { Grid, Menu, MenuItem, Tooltip } from "@mui/material";
import { CreateCommentForm } from "../components/CreateCommentForm";

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

const PostDetailCard = () => {
  const [expanded, setExpanded] = React.useState(false);
  const [expandedCommentForm, setExpandedCommentForm] = React.useState(false);
  const [showComBtnText, setShowComBtnText] = React.useState(false);

  const post = useSelector((store) => store.posts[0]);
  const person = useSelector((store) => store.person);

  const updatedTime = useServerData(post.updated_at);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  React.useEffect(() => {
    expandedCommentForm
      ? setShowComBtnText("Скрыть форму")
      : setShowComBtnText("Оставить комментарий");
  }, [expandedCommentForm]);

  const handleExpandCommentForm = () => {
    setExpandedCommentForm(!expandedCommentForm);
  };

  let settings;
  person._id === post.author._id
    ? (settings = ["Удалить", "Редактировать"])
    : (settings = null);

  const description =
    post.text.length > 200 ? post.text.slice(0, 200) + "..." : post.text;

  const tagsString = useTags(post.tags);
  const likesInfo = useLikes(post.likes, person._id);

  const dispatch = useDispatch();

  const likeClicHandler = (e) => {
    e.preventDefault();
    likesInfo?.color === "red"
      ? dispatch(queryDeleteLike(post._id))
      : dispatch(queryAddLike(post._id));
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

  return (
    <Grid item xs={6}>
      <DeletePostModal modal={modal} setModal={setModal} postId={post._id} />
      <Card sx={{ maxWidth: 690, height: "100%" }}>
        <CardHeader
          avatar={
            <Avatar
              sx={{ bgcolor: red[500] }}
              aria-label='recipe'
              src={post.author.avatar}
            >
              {post.author.name.slice(0, 1)}
            </Avatar>
          }
          action={
            settings && (
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
            )
          }
          title={post.title}
          subheader={updatedTime}
        />
        <CardMedia
          component='img'
          height='294'
          image={post.image}
          alt={post.title}
        />
        <CardContent>
          <Typography variant='body2' color='text.secondary'>
            {description}
          </Typography>
          <hr />
          <b>#</b> <span>{tagsString}</span>
        </CardContent>
        <CardActions
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <IconButton aria-label='add to favorites' onClick={likeClicHandler}>
            <FavoriteIcon
              sx={{
                color: likesInfo?.color,
              }}
            />{" "}
            <span>{likesInfo?.amount}</span>
          </IconButton>
          <IconButton onClick={handleExpandCommentForm}>
            {showComBtnText}
          </IconButton>
          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label='show more'
          >
            <ExpandMoreIcon />
          </ExpandMore>
        </CardActions>
        <Collapse in={expandedCommentForm} timeout='auto' unmountOnExit>
          <CardContent>
            <CreateCommentForm id={post._id} />
          </CardContent>
        </Collapse>
        <Collapse in={expanded} timeout='auto' unmountOnExit>
          <CardContent>
            <Typography paragraph>{post.text}</Typography>
          </CardContent>
        </Collapse>
      </Card>
    </Grid>
  );
};

export default PostDetailCard;
