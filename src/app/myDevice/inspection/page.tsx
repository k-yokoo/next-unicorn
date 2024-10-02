"use client";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import React, { useState } from "react";
import { Box, Typography, FormControl, RadioGroup, FormControlLabel, Radio, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useSearchParams } from 'next/navigation';

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
  const searchParams = useSearchParams();
  const deviceId = searchParams.get('id');
  const [values, setValues] = useState<{ [key: string]: string | null }>({
    group1: null,
    group2: null,
    group3: null,
  });

  const handleChange = (groupId: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues((prevValues) => ({
      ...prevValues,
      [groupId]: (event.target as HTMLInputElement).value,
    }));
  };

  return (
    <>
      <Box>
        DeviceName: {deviceId}
      </Box>
      <Accordion sx={contentStyle} defaultExpanded>
        <AccordionSummary
          sx={{
            backgroundColor: "primary.main",
            color: "white",
            fontWeight: "bold",
          }}
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          {steps[0]}
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
      <Accordion sx={contentStyle} defaultExpanded>
        <AccordionSummary
          sx={{
            backgroundColor: "success.main",
            color: "white",
            fontWeight: "bold",
          }}
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2-content"
          id="panel2-header"
        >
          {steps[1]}
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
      <Accordion sx={contentStyle} defaultExpanded>
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
          {steps[2]}
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
    </>
  );
};

export default MyDeviceInspection;