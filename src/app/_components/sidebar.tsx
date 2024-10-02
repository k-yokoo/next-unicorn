"use client";
import {
  Box,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
} from "@mui/material";
import React from "react";
import { usePathname, useRouter } from "next/navigation";
import DashboardIcon from '@mui/icons-material/Dashboard';
import HomeIcon from '@mui/icons-material/Home';
import ChecklistIcon from '@mui/icons-material/Checklist';

const drawerWidth = 240;
type MenuItem = {
  name: string;
  url: string;
  icon: React.ReactNode;
};
const defaultList: MenuItem[] = [
  { name: "Home", url: "/", icon: <HomeIcon /> },
];
const menuList: MenuItem[] = [
  { name: "管理機器一覧", url: "/myDevice", icon: <DashboardIcon /> },
  { name: "点検状況", url: "/inspection", icon: <ChecklistIcon /> },
];

const item = {
  py: '2px',
  px: 3,
  color: 'rgba(255, 255, 255, 0.7)',
  '&:hover, &:focus': {
    bgcolor: 'rgba(255, 255, 255, 0.08)',
  },
};
const itemCategory = {
  boxShadow: '0 -1px 0 rgb(255,255,255,0.1) inset',
  py: 1.5,
  px: 3,
};

const SideBar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const version = process.env.version;

  const clickHandler = (url: string) => {
    router.push(url);
  };

  const isSelected = (url: string) => {
    if (pathname === url || pathname.startsWith(url + "/")) {
      return true;
    }
    return false;
  }

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: drawerWidth,
          boxSizing: "border-box",
        },
      }}
    >
      <Toolbar />
      <Box sx={{ overflow: "auto" }}>
        <List>
          <ListItem sx={{ ...item, ...itemCategory, fontSize: 22, color: '#fff' }}>
            v.{version}
          </ListItem>
          {defaultList.map(({ name, url, icon }: MenuItem) => (
            <ListItem sx={{ marginTop: 'auto' }} key={name} disablePadding>
              <ListItemButton sx={item} selected={isSelected(url)} onClick={() => clickHandler(url)}>
                <ListItemIcon>{icon}</ListItemIcon>
                <ListItemText primary={name} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider sx={{ marginTop: '20px' }} />
        <List>
          {menuList.map(({ name, url, icon }: MenuItem) => (
            <ListItem key={name} disablePadding>
              <ListItemButton sx={item} selected={isSelected(url)} onClick={() => clickHandler(url)}>
                <ListItemIcon>{icon}</ListItemIcon>
                <ListItemText primary={name} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  );
};

export default SideBar;