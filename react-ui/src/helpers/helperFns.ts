import { format } from "date-fns";
import { DATE_FORMAT, PRESENT, PRESENT_TEXT } from "../config/index.json";
import { Attendance } from "../@types/Attendance";
import Student from "../@types/Student";
import { Semester } from "../@types/Semester";

export function getTodaysDateString(dateFormat?: string): string {
    if (dateFormat) return format(new Date(), dateFormat)
    return format(new Date(), DATE_FORMAT)
}


export function getAttendanceFromStudent(student: Student, semester: Semester): Attendance {

    const attendance: Attendance = {
        date: new Date(),
        status: PRESENT,
        statusText: PRESENT_TEXT,
        student: student,
        semester: semester
    }

    return attendance

}