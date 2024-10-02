"use client";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";
import {
  Button,
  Container,
  Paper,
} from "@mui/material";

export default function Home() {
  const router = useRouter();
  const handleClick = () => {
    router.push("/myDevice");
  };

  return (
    <Container>
      <Paper elevation={3} sx={{ p: 5 }}>
        <h1 className={styles.title}>Welcome to Unicorn!</h1>
        <Button onClick={handleClick} variant="contained" color="primary">
          点検を開始する
        </Button>
      </Paper>
    </Container>
  );
}