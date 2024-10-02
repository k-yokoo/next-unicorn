"use client";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import React, { useEffect, useState } from "react";
import axios from 'axios';
import { Data } from '../type/globalData';
import { useRouter } from 'next/navigation';
import { Box, CircularProgress, Divider, Typography } from '@mui/material';
import { useSession } from 'next-auth/react';

const hoverStyle = {
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: 'rgba(0, 0, 0, 0.04)',
  },
};
const borderStyle = {
  border: '1px solid rgba(0, 0, 0, 0.1)',
};

const PageOne = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [data, setData] = useState<Data[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getUserData();
  }, []);

  const getUserData = async () => {
    try {
      const response = await axios.get('/api/device/list');
      setData(response.data.result);
      setIsLoading(false);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Axiosのエラーが発生しました:', error);
      } else {
        console.error('Axios以外のエラーが発生しました:', error);
      }
    }
  };

  const handleRowClick = (row: Data) => {
    // ここにクリック時のアクションを記述します
    router.push('/myDevice/inspection?id=' + row.deviceNo);
  };

  return (
    <Paper elevation={3} sx={{ p: 5, width: '90%' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography sx={{ marginBottom: '20px' }} variant='h4' >{session?.user.name}さんの点検対象機器</Typography>
        {isLoading && (
          <CircularProgress />
        )}
      </Box>
      <Divider sx={{ marginBottom: '10px', mb: 3 }} />
      {!isLoading && (
        <TableContainer sx={{ marginTop: '10px', marginLeft: '10px', width: '90%' }} component={Paper}>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: 'rgba(100, 100, 200, 0.3)' }}>
                <TableCell sx={borderStyle}>管理番号</TableCell>
                <TableCell sx={borderStyle}>機器種別</TableCell>
                <TableCell sx={borderStyle}>使用状況</TableCell>
                <TableCell sx={borderStyle}>使用者</TableCell>
                <TableCell sx={borderStyle}>管理者</TableCell>
                <TableCell>点検結果</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row: Data) => (
                <TableRow key={row.deviceNo} onClick={() => handleRowClick(row)} sx={{ ...hoverStyle }}>
                  <TableCell sx={borderStyle}>{row.deviceNo}</TableCell>
                  <TableCell sx={borderStyle}>{row.deviceType}</TableCell>
                  <TableCell sx={borderStyle}>{row.usage}</TableCell>
                  <TableCell sx={borderStyle}>{row.user}</TableCell>
                  <TableCell sx={borderStyle}>{row.administrator}</TableCell>
                  <TableCell>{row.status ? '点検済' : '未点検'}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Paper>
  );
};

export default PageOne;