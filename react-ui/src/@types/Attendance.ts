import { Semester } from "./Semester";
import Student from "./Student";

export type Attendance = {
    student: Student
    semester: Semester
    status: number
    statusText: string
    date: Date
}