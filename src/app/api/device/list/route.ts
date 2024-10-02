import { Data } from '@/app/type/globalData';
import { NextResponse } from 'next/server';


const rows: Data[] = [
  { deviceNo: '1K-22028', deviceType: 'クライアントPC', usage: '使用中', user: '横尾 謙二', administrator: '横尾 謙二', status: true },
  { deviceNo: '5R-16030', deviceType: 'クライアントPC', usage: '使用中', user: '高沢 千尋', administrator: '碓氷 正和', status: false },
  { deviceNo: '5R-22056', deviceType: 'クライアントPC', usage: '非稼働', user: '', administrator: '機器管理担当', status: false },
];
export async function GET() {
  try {
    return NextResponse.json({
      result: rows,
    });
  } catch (error) {
    throw error
  }
}
