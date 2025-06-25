"use client";

import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  MenuItem,
  Box,
  Button,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

const pages = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Contact", path: "/contact" },
];
const Navbar = () => {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const router = useRouter();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleRedirect = (path) => {
    router.push(path); // navigate using router
    handleCloseNavMenu(); // close the mobile menu
  };

  return (
    <AppBar position="static">
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Typography variant="h6" component="div">
          MyApp
        </Typography>

        <Box sx={{ display: { xs: "flex", md: "none" } }}>
          <IconButton size="large" onClick={handleOpenNavMenu} color="inherit">
            <MenuIcon />
          </IconButton>
          <Menu
            anchorEl={anchorElNav}
            open={Boolean(anchorElNav)}
            onClose={handleCloseNavMenu}
          >
            {pages.map((page) => (
              <MenuItem
                key={page.name}
                onClick={() => handleRedirect(page.path)}
              >
                {page.name}
              </MenuItem>
            ))}
          </Menu>
        </Box>

        {/* Menu for medium and larger screens */}
        <Box sx={{ display: { xs: "none", md: "flex" }, gap: 2 }}>
          {pages.map((page) => (
            <Button
              key={page.name}
              color="inherit"
              component={Link}
              href={page.path}
            >
              {page.name}
            </Button>
          ))}
        </Box>
      </Toolbar>
    </AppBar>
  );
};
export default Navbar;
