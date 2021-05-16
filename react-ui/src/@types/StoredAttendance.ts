import { Attendance } from "./Attendance";


export type StoredAttendance = {
    semester_id: string,
    semester_name: string,
    attendance: Attendance[],
}