import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { Link, useNavigate } from "react-router-dom";
import LinkMUI from "@mui/material/Link";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { useDispatch, useSelector } from "react-redux";
// @ts-ignore
import { setSearchValue } from "../../redux/actions/searchAC.ts";
// @ts-ignore
import { deleteUserToken } from "../../redux/actions/personAC.ts";
// @ts-ignore
import logo from "./img/svgLogo.svg";
import { PersonType } from "../../redux/initState";
import { AppStateType } from "../../redux/reducers/rootReducer";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

type pagesPageType = {
  title: "Главная" | "Лента" | "Создать пост"
  path: "/" | "/posts" | "/postform"
}

const pages: Array<pagesPageType> = [
  {
    title: "Главная",
    path: "/",
  },
  {
    title: "Лента",
    path: "/posts",
  },
  {
    title: "Создать пост",
    path: "/postform",
  },
]

type settingStringType = "Профиль" | "Войти" | "Регистрация" | "Выход"
let settings: Array<settingStringType> = ["Профиль", "Войти", "Регистрация", "Выход"];

const NavBar : React.FC = () => {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

  const person: PersonType = useSelector ((store: AppStateType) => store.person)
  person.token
    ? (settings = ["Профиль", "Выход"])
    : (settings = ["Войти", "Регистрация"]);

  let hrefAvatar: string;
  person.token && person.avatar
    ? (hrefAvatar = person.avatar)
    : (hrefAvatar = "/static/images/avatar/2.jpg");

  const navigate = useNavigate();

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleOpenSettings = (e: React.MouseEvent<HTMLElement>) => {
    // React.FormEvent<HTMLInputElement>
    // e.preventDefault();
    switch (e.currentTarget.innerText) {
      case "Войти":
        navigate("/signin");
        break;

      case "Регистрация":
        navigate("/signup");
        break;

      default:
        break;
    }
  };

  const handleCloseUserMenu = (e: React.MouseEvent<HTMLElement>) => {
    if (e.currentTarget.innerText === "Выход") {
      dispatch(deleteUserToken());
    }
    if (e.currentTarget.innerText === "Профиль") {
      navigate(`/profile/${person._id}`);
    }
    setAnchorElUser(null);
  };
  const dispatch : any = useDispatch();
  const searchHandler = (e) => {
    dispatch(setSearchValue(e.target.value.trim()));
  };

  return (
    <AppBar position='static'>
      <Container maxWidth='xl'>
        <Toolbar disableGutters>
          <img src={logo} alt='Logo' style={{ padding: "1%" }} />
          <Typography
            variant='h6'
            noWrap
            component='a'
            href='/'
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            EasyInsta
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size='large'
              aria-label='account of current user'
              aria-controls='menu-appbar'
              aria-haspopup='true'
              onClick={handleOpenNavMenu}
              color='inherit'
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id='menu-appbar'
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <LinkMUI component={Link} key={page.path} to={page.path}>
                  <MenuItem key={page.title} onClick={handleCloseNavMenu}>
                    <Typography textAlign='center'>{page.title}</Typography>
                  </MenuItem>
                </LinkMUI>
              ))}
            </Menu>
          </Box>
          <Typography
            variant='h5'
            noWrap
            component='a'
            href=''
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            EI
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <LinkMUI component={Link} key={page.path} to={page.path}>
                <Button
                  key={page.title}
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  {page.title}
                </Button>
              </LinkMUI>
            ))}
          </Box>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder='Поиск…'
              inputProps={{ "aria-label": "search" }}
              onChange={searchHandler}
            />
          </Search>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title='Настройки'>
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt='Remy Sharp' src={hrefAvatar} />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id='menu-appbar'
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
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
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default NavBar;
