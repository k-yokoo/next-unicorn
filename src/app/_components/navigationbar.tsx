"use client";
import { AppBar, Avatar, IconButton, Link, Toolbar, Typography } from "@mui/material";
import React from "react";
import { useSession } from 'next-auth/react';

const NavigationBar = () => {
  const { data: session } = useSession();
  console.log(`session: ${JSON.stringify(session)}`);
  return (
    <AppBar
      position="fixed"
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
    >
      <Toolbar>
        <Typography variant="h6" noWrap component="div">
          <Link href="/" underline="none" color="inherit">
            Unicorn
          </Link>
        </Typography>
        <div style={{ flexGrow: 1 }}></div>
        <IconButton color="inherit" sx={{ p: 0.5 }}>
          <Avatar src="/static/images/avatar/1.jpg" alt="My Avatar" />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default NavigationBar;