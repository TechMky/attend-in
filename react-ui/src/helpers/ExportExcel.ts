import XLSX from 'xlsx';
export function exportXLSX() {
    let workbook = XLSX.utils.book_new()

    workbook.Props = {
        Title: 'Attendance',

    }

    workbook.SheetNames.push('Sheet1')

    const data = [['hello', 'world']]

    let worksheet = XLSX.utils.aoa_to_sheet(data)

    workbook.Sheets['Sheet1'] = worksheet

    let workbookOut = XLSX.writeFile(workbook, 'test.xlsx')

}