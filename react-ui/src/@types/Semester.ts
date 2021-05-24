import Student from "./Student";

export type Semester = {
    _id: string,
    name: string,
    isActive: boolean,
    students: Student[]
}