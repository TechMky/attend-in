import axios from 'axios';
import { Attendance } from '../@types/Attendance';
const API_ROUTE = '/api'

export const getSemester = async () => {

    try {
        const semesters = (await axios.get(`${API_ROUTE}/semester`)).data
        console.log(semesters)

        return [null, semesters]

    } catch (error) {

        return [error]
    }

}

export const sendAttendance = async ( attendanceDate: Date, attendanceArray: Attendance[] ) => {

    try {
        const result = await axios.post(`${API_ROUTE}/attendance/submit`, {attendanceDate, attendance: attendanceArray})
        return [null, result.data]
    } catch (error) {
        return [error]
    }

}