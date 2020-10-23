import XLSX from 'xlsx';
import { StoredAttendance } from '../types/StoredAttendance';
import { getAttendanceStatusText, getTodaysDateString } from './helperFns';


export function exportXLSX(data: StoredAttendance[]) {


    let workbook = XLSX.utils.book_new()

    workbook.Props = {
        Title: 'Attendance',

    }

    const todaysDate = getTodaysDateString()
    data.forEach(semester => {

        workbook.SheetNames.push(semester.semester_name)


        const wbData = [
            [`BACHELOR OF JOURNALISM AND MASS COMMUNICATION - ${semester.semester_name}`],
            ['Name', todaysDate]
        ]


        semester.attendance.forEach(attd => wbData.push([attd.name, getAttendanceStatusText(attd.att_status)]))

        let worksheet = XLSX.utils.aoa_to_sheet(wbData)

        workbook.Sheets[semester.semester_name] = worksheet

    })
   
    const fileName = `Attendance For ${todaysDate}.xlsx`
    XLSX.writeFile(workbook, fileName)

}