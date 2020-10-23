import { Attendance } from "./Attendance";


export type StoredAttendance = {
    semester_id: number,
    semester_name: string,
    attendance: Attendance[],
}