import { toast } from 'react-toastify';
import XLSX from 'xlsx';
import { StoredAttendance } from '../@types/StoredAttendance';
import { getTodaysDateString } from './helperFns';


export function exportXLSX(data: StoredAttendance[]) {


    if (data.length === 0) {
        toast.dark('Attendance Submitted', {
            position: "top-center",
            autoClose: 3000,
            closeOnClick: true,
        });
        return
    }

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


        semester.attendance.forEach(attd => wbData.push([attd.student._id, attd.statusText]))

        let worksheet = XLSX.utils.aoa_to_sheet(wbData)

        workbook.Sheets[semester.semester_name] = worksheet

    })
   
    const fileName = `Attendance For ${todaysDate}.xlsx`
    XLSX.writeFile(workbook, fileName)

}