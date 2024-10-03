import XlsxPopulate from 'xlsx-populate';
import path from 'path';
import JSZip from 'jszip';
import { Data } from '../type/globalData';

const selected = '■';

export async function jsonToExcelWithTemplate(jsonData: Data): Promise<Buffer> {
  // テンプレートファイルを読み込む
  const templatePath = path.join(process.cwd(), 'src', 'app', 'templates', 'L-0100-04-00_templete.xlsx');
  const workbook = await XlsxPopulate.fromFileAsync(templatePath);

  // ヘッダ部分
  workbook.sheet(0).cell('F3').value(jsonData.user); // 点検者

  workbook.sheet(0).cell('B10').value(jsonData.deviceNo);
  workbook.sheet(0).cell('B12').value(jsonData.deviceNo);
  workbook.sheet(0).cell('B14').value(jsonData.deviceNo);
  workbook.sheet(0).cell('D10').value(jsonData.deviceNo);
  workbook.sheet(0).cell('D12').value(jsonData.deviceNo);
  workbook.sheet(0).cell('D14').value(jsonData.deviceNo);
  workbook.sheet(0).cell('G10').value('1');
  workbook.sheet(0).cell('G12').value('2');
  workbook.sheet(0).cell('G14').value('3');
  workbook.sheet(0).cell('H10').value('合格');
  workbook.sheet(0).cell('H12').value('合格');
  workbook.sheet(0).cell('H14').value('合格');

  // 点検結果
  workbook.sheet(0).cell('M24').value(selected);
  workbook.sheet(0).cell('M25').value(selected);
  workbook.sheet(0).cell('M26').value(selected);
  workbook.sheet(0).cell('M27').value(selected);
  workbook.sheet(0).cell('M28').value(selected);
  workbook.sheet(0).cell('M29').value(selected);

  workbook.sheet(0).cell('M33').value(selected);
  workbook.sheet(0).cell('M34').value(selected);
  workbook.sheet(0).cell('M35').value(selected);
  workbook.sheet(0).cell('M36').value(selected);
  workbook.sheet(0).cell('M37').value(selected);
  workbook.sheet(0).cell('M38').value(selected);

  workbook.sheet(0).cell('M41').value(selected);
  workbook.sheet(0).cell('M42').value(selected);
  workbook.sheet(0).cell('M43').value(selected);
  workbook.sheet(0).cell('M44').value(selected);
  workbook.sheet(0).cell('M45').value(selected);
  workbook.sheet(0).cell('M47').value(selected);
  workbook.sheet(0).cell('M48').value(selected);

  // Excelファイルをバッファに書き出す
  const excelBuffer = await workbook.outputAsync();
  return excelBuffer as Buffer;
}

export async function createZipWithExcelFiles(jsonDataArray: Data[]): Promise<Buffer> {
  const zip = new JSZip();
  jsonDataArray.forEach((jsonData) => {
    const excelBuffer = jsonToExcelWithTemplate(jsonData);
    zip.file(`L-0100-04-00_開発環境点検シート(${jsonData.deviceNo}).xlsx`, excelBuffer);
  });
  const zipBuffer = await zip.generateAsync({ type: 'nodebuffer' });
  return zipBuffer;
}

