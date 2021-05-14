import { Semester } from "../types/semester";
import Student from "../types/student";

let value = 1
const semOneStudents: Student[] = []

const semThreeStudents: Student[] = []


let semesterId = 12;
const semesterStudents: Semester[] = [
    {
        id: semesterId++,
        name: 'Semester II',
        students: semOneStudents
    },
    {
        id: semesterId++,
        name: 'Semester IV',
        students: semThreeStudents
    }
]

export { semesterStudents };