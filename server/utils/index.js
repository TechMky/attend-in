const format = require('date-fns/format')
const xlsx = require('node-xlsx')
module.exports = {

    destructureDate: (dateString) => {

        const date = new Date(dateString)
        const year = date.getFullYear()
        const month = date.getMonth() + 1 //month is zero based
        const day = date.getDate()
        return {year, month, day}
    },

    exportSingleXLSX: (date, attendanceArray = []) => {

        if (attendanceArray.length === 0 ) return null

        const todaysDate = format(new Date(date.year, date.month - 1, date.day), 'dd-MM-yyyy')
        const semesterName = attendanceArray[0].semester.name;
        const sheetData = [
            [`BACHELOR OF JOURNALISM AND MASS COMMUNICATION - ${semesterName}`],
            ['Name', `Attendance Date: ${todaysDate}`]
        ]

        attendanceArray.forEach(attendance => {
            sheetData.push([attendance.student.name, attendance.statusText])
        })
        
        const buffer = xlsx.build([
            { name: semesterName, data: sheetData}
        ])
    
        return buffer
    }
}