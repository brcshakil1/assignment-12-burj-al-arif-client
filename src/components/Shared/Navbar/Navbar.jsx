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
import AdbIcon from "@mui/icons-material/Adb";
import { Link, NavLink } from "react-router-dom";
import useAuth from "../../../hook/useAuth";

const Navbar = () => {
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [isOpenMenu, setIsOpenMenu] = React.useState(false);
  const { user, logout } = useAuth();

  const handleOpenMenu = () => {
    setIsOpenMenu(!isOpenMenu);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = () => {
    logout();
  };

  const navLinks = (
    <>
      {/* home */}
      <NavLink to={`/`}>
        <Button
          className="text-secondary"
          onClick={() => {
            if (isOpenMenu) {
              setIsOpenMenu(false);
            }
          }}
          sx={{ my: 2, display: "block" }}
        >
          Home
        </Button>
      </NavLink>
      {/* apartment */}
      <NavLink to={`/apartment`}>
        <Button
          className="text-secondary"
          onClick={() => {
            if (isOpenMenu) {
              setIsOpenMenu(false);
            }
          }}
          sx={{ my: 2, display: "block" }}
        >
          ApartMent
        </Button>
      </NavLink>
      {/* about */}
      <NavLink to={`/about`}>
        <Button
          className="text-secondary"
          onClick={() => {
            if (isOpenMenu) {
              setIsOpenMenu(false);
            }
          }}
          sx={{ my: 2, display: "block" }}
        >
          About Us
        </Button>
      </NavLink>
      {/* Contact */}
      <NavLink to={`/contact-us`}>
        <Button
          className="text-secondary"
          onClick={() => {
            if (isOpenMenu) {
              setIsOpenMenu(false);
            }
          }}
          sx={{ my: 2, display: "block" }}
        >
          Contact
        </Button>
      </NavLink>
      {user ? (
        <Button
          className="bg-tertiary"
          onClick={() => {
            handleLogout();
            if (isOpenMenu) {
              setIsOpenMenu(false);
            }
          }}
          sx={{ my: 2, display: "block" }}
          variant="contained"
        >
          Sign out
        </Button>
      ) : (
        <NavLink to={`/signIn`}>
          <Button
            className="bg-tertiary"
            onClick={() => {
              if (isOpenMenu) {
                setIsOpenMenu(false);
              }
            }}
            sx={{ my: 2, display: "block" }}
            variant="contained"
          >
            Sign in
          </Button>
        </NavLink>
      )}
    </>
  );

  return (
    <AppBar className="bg-primary shadow-none" position="static">
      <Container maxWidth="xl">
        <Toolbar className="border-b border-secondary" disableGutters>
          <Link to="/">
            <Typography
              className="text-secondary font-lora"
              variant="h6"
              noWrap
              component="a"
              href="#app-bar-with-responsive-menu"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontWeight: 600,
                textDecoration: "none",
              }}
            >
              BURJ AL ARIF
            </Typography>
          </Link>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              className="text-secondary z-10"
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenMenu}
            >
              <MenuIcon />
            </IconButton>
          </Box>
          <div
            className={`${
              isOpenMenu ? "block" : "hidden"
            } absolute bg-white text-secondary z-10 top-14 shadow-xl px-4`}
          >
            {navLinks}
          </div>
          <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
            className="text-secondary font-lora"
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontWeight: 600,
              textDecoration: "none",
            }}
          >
            BURJ AL ARIF
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {navLinks}
          </Box>

          {user && (
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open">
                {user?.photoURL ? (
                  <div className=" flex items-center justify-center gap-1">
                    <img
                      onClick={handleOpenUserMenu}
                      src={user?.photoURL}
                      alt={user?.displayName}
                      className="w-10 h-10 rounded-full object-cover cursor-pointer border-2 border-secondary"
                    />{" "}
                  </div>
                ) : (
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar
                      alt={user?.displayName}
                      src="/static/images/avatar/2.jpg"
                    />
                  </IconButton>
                )}
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
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
                <Typography sx={{ padding: "15px" }} textAlign="center">
                  <span className="text-secondary font-semibold">
                    {user?.displayName.slice(0, 15)}...
                  </span>
                </Typography>
                <NavLink to="/dashboard/profile">
                  <MenuItem onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">Profile</Typography>
                  </MenuItem>
                </NavLink>
                <NavLink to="/dashboard">
                  <MenuItem onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">Dashboard</Typography>
                  </MenuItem>
                </NavLink>
                <MenuItem
                  onClick={() => {
                    handleCloseUserMenu();
                    handleLogout();
                  }}
                >
                  <Typography textAlign="center">Sign out</Typography>
                </MenuItem>
              </Menu>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
