import { format } from 'date-fns';
import XLSX from 'xlsx';
import { ABSENT, LEFT, PRESENT } from '../assets/constants';
import { Attendance } from '../components/AttendanceList';
export function exportXLSX(filename: string, data: Attendance[]) {

    if (filename.endsWith('.xlsx') === false) filename += '.xlsx'

    let workbook = XLSX.utils.book_new()

    workbook.Props = {
        Title: 'Attendance',

    }

    workbook.SheetNames.push('Sheet1')

    const formattedDate: string = format(new Date(), 'dd-MM-yyyy')
    const wbData = [
        ['BACHELOR OF JOURNALISM AND MASS COMMUNICATION - 1ST SEMESTER'],
        ['Name', formattedDate]
    ]

    data.forEach(attendance => {

        const attdData = [attendance.name]

        switch (attendance.att_status) {
            case PRESENT:

                attdData.push('Present') // define constants afterwards
                break;

            case ABSENT:

                attdData.push('Absent') // define constants afterwards
                break;
            case LEFT:

                attdData.push('Left') // define constants afterwards
                break;

            default:
                attdData.push('')
        }

        wbData.push(attdData)
    })


    let worksheet = XLSX.utils.aoa_to_sheet(wbData)

    workbook.Sheets['Sheet1'] = worksheet

    XLSX.writeFile(workbook, filename)

    return true

}