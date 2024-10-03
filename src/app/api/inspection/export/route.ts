import { NextResponse } from 'next/server';
import { createZipWithExcelFiles } from '../../../utils/excelUtils';
import { Data } from '@/app/type/globalData';

const allRows: Data[] = [
  { deviceNo: '5R-16030', deviceType: 'クライアントPC', usage: '使用中', user: '山田 太郎', administrator: '山田 太郎', status: true },
  { deviceNo: '5R-16031', deviceType: 'クライアントPC', usage: '使用中', user: '山田 一郎', administrator: '山田 太郎', status: false },
  { deviceNo: '5R-16032', deviceType: 'クライアントPC', usage: '使用中', user: '山田 二郎', administrator: '山田 太郎', status: false },
  { deviceNo: '5R-16033', deviceType: 'クライアントPC', usage: '使用中', user: '山田 三郎', administrator: '山田 太郎', status: true },
  { deviceNo: '5R-16034', deviceType: 'クライアントPC', usage: '使用中', user: '山田 四郎', administrator: '山田 太郎', status: false },
  { deviceNo: '5R-16035', deviceType: 'クライアントPC', usage: '使用中', user: '山田 五郎', administrator: '山田 太郎', status: false },
  { deviceNo: '5R-16036', deviceType: 'クライアントPC', usage: '使用中', user: '山田 六郎', administrator: '山田 太郎', status: true },
  { deviceNo: '5R-16037', deviceType: 'クライアントPC', usage: '使用中', user: '山田 七郎', administrator: '山田 太郎', status: false },
  { deviceNo: '5R-16038', deviceType: 'クライアントPC', usage: '使用中', user: '山田 八郎', administrator: '山田 太郎', status: false },
];

export async function POST() {
  const jsonDataArray = [ allRows[0], allRows[3], allRows[6]];
  const zipBlob = await createZipWithExcelFiles(jsonDataArray);
  const headers = new Headers({
    'Content-Disposition': 'attachment; filename="files.zip"',
    'Content-Type': 'application/zip',
  });

  return new NextResponse(zipBlob, { headers });
}
