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

const PageOne = () => {
  const [data, setData] = useState<Data[]>([]);

  useEffect(() => {
    getUserData();
  }, []);

  const getUserData = async () => {
    try {
      const response = await axios.get('/api/device/list');
      setData(response.data.result);
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
    alert(`Row clicked: ${row.name}`);
  };
  return (
    <TableContainer sx={{ marginLeft: '10px', width: '80%' }} component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Age</TableCell>
            <TableCell>Email</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row: Data) => (
            <TableRow key={row.id} onClick={() => handleRowClick(row)} style={{ cursor: 'pointer' }}>
              <TableCell>{row.id}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.age}</TableCell>
              <TableCell>{row.email}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default PageOne;