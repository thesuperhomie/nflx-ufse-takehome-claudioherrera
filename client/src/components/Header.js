import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

const Header = () => {
  return (
    <AppBar
      position="static"
      sx={{
        maxWidth: 800,
        marginBottom: 8,
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography variant="h6" noWrap>
            THE KNOCKOFF YELP! — Claudio Herrera — UFSE Take Home
          </Typography>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
