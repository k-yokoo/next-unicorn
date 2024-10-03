"use client";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Box, Button, Paper, Tab, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Data } from "../type/globalData";
import { useRouter } from "next/navigation";
import axios from "axios";

const borderStyle = {
  border: '1px solid rgba(0, 0, 0, 0.1)',
};
const PageOne = () => {
    const [value, setValue] = useState('all');
    const router = useRouter();
    const [data, setData] = useState<Data[]>([]);
    const [inspectedData, setInspectedData] = useState<Data[]>([]);
    const [notInspectedData, setNotInspectedData] = useState<Data[]>([]);
  
    useEffect(() => {
      getInspectedData();
    }, []);
  
    const getInspectedData = async () => {
      try {
        const Promises = [
          await axios.get('/api/device/list'),
          await axios.get('/api/device/inspection?status=inspected'),
          await axios.get('/api/device/inspection?status=notInspected')
        ];
        const responses = await Promise.all(Promises);
        setData(responses[0].data.result);
        setInspectedData(responses[1].data.result);
        setNotInspectedData(responses[2].data.result);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.error('Axiosのエラーが発生しました:', error);
        } else {
          console.error('Axios以外のエラーが発生しました:', error);
        }
      }
    };
  
    const downloadAllData = async () => {
      try {
        const response = await axios.post('/api/inspection/export',[], {
          responseType: 'blob',
        });
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.download = 'files.zip';
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
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
  
    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
      setValue(newValue);
    };

    return (
      <Paper elevation={3} sx={{ p: 5, width: '90%' }}>
        <Box sx={{ width: '100%', typography: 'body1' }}>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <TabList onChange={handleChange} aria-label="lab API tabs example">
                <Tab label="点検対象機器" value="all" />
                <Tab label="点検済" value="inspected" />
                <Tab label="未点検" value="notInspected" />
              </TabList>
            </Box>
            <TabPanel value="all">
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
                    <TableRow key={row.deviceNo} onClick={() => handleRowClick(row)}>
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
            </TabPanel>
            <TabPanel value="inspected">
              <Button onClick={downloadAllData} variant="contained" color="primary" sx={{ marginBottom: '10px' }}>全データダウンロード</Button>
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
                    {inspectedData.map((row: Data) => (
                      <TableRow key={row.deviceNo} onClick={() => handleRowClick(row)}>
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
            </TabPanel>
            <TabPanel value="notInspected">
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
                      {notInspectedData.map((row: Data) => (
                        <TableRow key={row.deviceNo} onClick={() => handleRowClick(row)}>
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
            </TabPanel>
          </TabContext>
        </Box>
      </Paper>
    );
};

export default PageOne;