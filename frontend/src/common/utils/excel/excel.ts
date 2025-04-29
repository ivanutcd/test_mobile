import * as XLSX from 'xlsx';

import { saveAs } from 'file-saver';
export const ExportExcel = async ({
  headers,
  records,
  fileName,
}: {
  headers: string[];
  records: any[];
  fileName: string;
}) => {
  const fileType =
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
  const fileExtension = '.xlsx';
  const Heading = [headers];
  const ws = XLSX.utils.json_to_sheet([]);
  XLSX.utils.sheet_add_aoa(ws, Heading);
  XLSX.utils.sheet_add_json(ws, records, { origin: 'A2', skipHeader: true });
  const wb = { Sheets: { data: ws }, SheetNames: ['data'] };

  const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
  const data = new Blob([excelBuffer], { type: fileType });
  saveAs(data, `${fileName}${fileExtension}`);
};
