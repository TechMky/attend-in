import Student from "./student";

export type Attendance = Student & {
    att_status: number
}