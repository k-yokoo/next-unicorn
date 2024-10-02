"use client";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import React, { useState } from "react";
import { Box, Typography, FormControl, RadioGroup, FormControlLabel, Radio, Accordion, AccordionSummary, AccordionDetails, Button, Snackbar, Alert, SnackbarCloseReason, CircularProgress } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useRouter, useSearchParams } from 'next/navigation';
import Grid from '@mui/material/Grid2';

import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import DoneOutlineIcon from '@mui/icons-material/DoneOutline';

const steps = ['本体＋周辺装置', 'システム', 'ウィルス対応'];
const contentStyle = { minWidth: '700px', maxWidth: '1200px' };
const options = [
  { value: 'passed', label: '合格' },
  { value: 'failed', label: '不合格' },
  { value: 'NotApplicable', label: '対象外' },
];

const checkColumn1 = {
  checkList: [
    {
      id: 'question1',
      label: '設置場所は所定の場所か',
      options: options,
    },
    {
      id: 'question2',
      label: '損傷や劣化はないか',
      options: options,
    },
    {
      id: 'question3',
      label: '本体と周辺装置は正しく接続されているか',
      options: options,
    },
    {
      id: 'question4',
      label: '管理番号ラベルは貼られているか',
      options: options,
    },
    {
      id: 'question5',
      label: '顧客所有物の場合、顧客所有物ラベルが貼られているか',
      options: options,
    },
    {
      id: 'question6',
      label: '本体と周辺装置は正しく動作するか',
      options: options,
    },
  ]
};
const checkColumn2 = {
  checkList: [
    {
      id: 'question1',
      label: 'システムは動作するか',
      options: options,
    },
    {
      id: 'question2',
      label: 'システム環境ファイルは壊れていないか',
      options: options,
    },
    {
      id: 'question3',
      label: 'コンピュータウィルスが混入していないか',
      options: options,
    },
    {
      id: 'question4',
      label: '開発支援ツールは正しく動作するか',
      options: options,
    },
    {
      id: 'question5',
      label: 'ＬＡＮ接続が正しく動作するか',
      options: options,
    },
    {
      id: 'question6',
      label: 'ＰＣ通信が正しく動作するか（モデム等を使用したﾀﾞｲﾔﾙｱｯﾌﾟ接続）',
      options: options,
    },
  ]
};
const checkColumn3 = {
  checkList: [
    {
      id: 'question1',
      label: 'ウィルスチェックソフトはインストールされているか',
      options: options,
    },
    {
      id: 'question2',
      label: 'ウィルスチェックソフトのV/Lは適切なものか',
      options: options,
    },
    {
      id: 'question3',
      label: '定義ファイルのV/Lは適切なものか',
      options: options,
    },
    {
      id: 'question4',
      label: '定義ファイルの更新はスケジュールされているか',
      options: options,
    },
    {
      id: 'question5',
      label: 'ウィルスチェックはスケジュールされているか',
      options: options,
    },
    {
      id: 'question6',
      label: 'ウィルスチェックソフトの設定情報は社内ネットワーク管理部門の推奨設定となっているか',
      options: options,
    },
    {
      id: 'question7',
      label: 'ウィルスチェックソフトは常駐しているか',
      options: options,
    },
  ]
};
const MyDeviceInspection = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const deviceId = searchParams.get('id');
  const [values, setValues] = useState<{ [key: string]: string | null }>({
    group1: null,
    group2: null,
    group3: null,
  });
  const [open, setOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  
  const handleChange = (groupId: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues((prevValues) => ({
      ...prevValues,
      [groupId]: (event.target as HTMLInputElement).value,
    }));
  };

  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason,
  ) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
    router.push('/myDevice');
  };

  const registerResult = () => {
    setIsSaving(true);
    setTimeout(() => {
      setOpen(true);
      setIsSaving(false);
    }, 1000);
  };

  const pageBack = () => {
    router.push('/myDevice');
  };

  return (
    <>
      <Paper elevation={3} sx={{ p: 3, width: '74%' }}>
        <Box sx={{ fontSize: '18px', fontWeight: 'bold' }}>
          DeviceName: {deviceId}
        </Box>
        <Box sx={{ marginTop: '50px', width: '400px', display: 'flex', justifyContent: 'space-between' }}>
          <Button onClick={pageBack} size="large" variant="outlined" startIcon={<ArrowBackIosIcon />}>
            前の画面に戻る
          </Button>
          <Button onClick={registerResult} size="large" variant="contained" endIcon={isSaving ? <CircularProgress color="inherit" size="22px" /> : <DoneOutlineIcon /> }>
            点検結果を登録
          </Button>
        </Box>
      </Paper>
      <Accordion sx={contentStyle} defaultExpanded>
        <AccordionSummary
          sx={{
            backgroundColor: "success.main",
            color: "white",
            fontWeight: "bold",
          }}
          expandIcon={<ExpandMoreIcon  />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2} sx={{ width: '85%' }}>
              <Grid size={9}>{steps[0]}</Grid>
              <Grid size={2}>点検結果：合格</Grid>
            </Grid>
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          <TableContainer sx={contentStyle} component={Paper}>
            <Table>
              <TableBody>
                {checkColumn1.checkList.map((item, index) => {
                  return (
                    <TableRow key={index}>
                      <TableCell sx={{ width: '70%' }}>
                        <Typography sx={{ fontWeight: 'bold' }}>{item.label}</Typography>
                      </TableCell>
                      <TableCell>
                        <FormControl>
                          <RadioGroup
                            row
                            value={values[item.id!]}
                            onChange={handleChange(item.id!)}
                          >
                            {item.options!.map((option) => (
                              <FormControlLabel
                                key={option.value}
                                value={option.value}
                                control={<Radio />}
                                label={option.label}
                              />
                            ))}
                          </RadioGroup>
                        </FormControl>
                      </TableCell>
                    </TableRow>
                  );
                }
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </AccordionDetails>
      </Accordion>
      <Accordion sx={contentStyle}>
        <AccordionSummary
          sx={{
            backgroundColor: "primary.main",
            color: "white",
            fontWeight: "bold",
          }}
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2-content"
          id="panel2-header"
        >
          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2} sx={{ width: '85%' }}>
              <Grid size={9}>{steps[1]}</Grid>
              <Grid size={2}>点検結果：不合格</Grid>
            </Grid>
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          <TableContainer sx={contentStyle} component={Paper}>
            <Table>
              <TableBody>
                {checkColumn2.checkList.map((item, index) => {
                  return (
                    <TableRow key={index}>
                      <TableCell sx={{ width: '70%' }}>
                        <Typography sx={{ fontWeight: 'bold' }}>{item.label}</Typography>
                      </TableCell>
                      <TableCell>
                        <FormControl>
                          <RadioGroup
                            row
                            value={values[item.id!]}
                            onChange={handleChange(item.id!)}
                          >
                            {item.options!.map((option) => (
                              <FormControlLabel
                                key={option.value}
                                value={option.value}
                                control={<Radio />}
                                label={option.label}
                              />
                            ))}
                          </RadioGroup>
                        </FormControl>
                      </TableCell>
                    </TableRow>
                  );
                }
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </AccordionDetails>
      </Accordion>
      <Accordion sx={contentStyle}>
        <AccordionSummary
          sx={{
            backgroundColor: "warning.main",
            color: "white",
            fontWeight: "bold",
          }}
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3-content"
          id="panel3-header"
        >
          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2} sx={{ width: '85%' }}>
              <Grid size={9}>{steps[2]}</Grid>
              <Grid size={2}>点検結果：合格</Grid>
            </Grid>
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          <TableContainer sx={contentStyle} component={Paper}>
            <Table>
              <TableBody>
                {checkColumn3.checkList.map((item, index) => {
                  return (
                    <TableRow key={index}>
                      <TableCell sx={{ width: '70%' }}>
                        <Typography sx={{ fontWeight: 'bold' }}>{item.label}</Typography>
                      </TableCell>
                      <TableCell>
                        <FormControl>
                          <RadioGroup
                            row
                            value={values[item.id!]}
                            onChange={handleChange(item.id!)}
                          >
                            {item.options!.map((option) => (
                              <FormControlLabel
                                key={option.value}
                                value={option.value}
                                control={<Radio />}
                                label={option.label}
                              />
                            ))}
                          </RadioGroup>
                        </FormControl>
                      </TableCell>
                    </TableRow>
                  );
                }
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </AccordionDetails>
      </Accordion>
      <Snackbar open={open} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}autoHideDuration={2000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity="success"
          variant="filled"
          sx={{ width: '100%' }}
        >
          点検結果を登録しました!
        </Alert>
      </Snackbar>
    </>
  );
};

export default MyDeviceInspection;