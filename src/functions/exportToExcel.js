import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

export const exportToExcel = (tableData) => {
    const workbook = XLSX.utils.book_new();
    ['set1', 'set2', 'set3'].forEach(setKey => {
        const set = tableData[setKey];
        const localSheet = XLSX.utils.aoa_to_sheet(set.local);
        const visitanteSheet = XLSX.utils.aoa_to_sheet(set.visitante);
        XLSX.utils.book_append_sheet(workbook, localSheet, `${setKey}_local`);
        XLSX.utils.book_append_sheet(workbook, visitanteSheet, `${setKey}_visitante`);
    });

    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], { type: EXCEL_TYPE });
    saveAs(data, `partido_${new Date().toISOString()}.xlsx`);
};

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
