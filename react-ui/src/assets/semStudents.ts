import { Semester } from "../types/semester";
import Student from "../types/student";

let value = 1
const semOneStudents: Student[] = [

    {
        id: value++,
        name: 'ABHISHEK SINGH',
    },
    {
        id: value++,
        name: 'PALLAVI KUMARI GUPTA',
    },
    {
        id: value++,
        name: 'NEHA KUMARI SINGH',
    },
    {
        id: value++,
        name: 'RAJPREET KAUR',
    },
    {
        id: value++,
        name: 'GAURAV KHANNA',
    },
    {
        id: value++,
        name: 'SHRUTI SINGH',
    },
    {
        id: value++,
        name: 'DIBYANSHI KUAMRI SHUKLA',
    },
    {
        id: value++,
        name: 'MEHWISH ANWAR',
    },
    {
        id: value++,
        name: 'HUMA FATMA',
    },

]

const semThreeStudents: Student[] = [

    {
        id: value++,
        name: 'ABHISHEK VISHAL',
    },
    {
        id: value++,
        name: 'CHANDRADEEP',
    },
    {
        id: value++,
        name: 'HRITIKA KUMARI',
    },
    {
        id: value++,
        name: 'SARVESH SINGH',
    },
    {
        id: value++,
        name: 'SHWETA KUMARI',
    }
]


let semesterId = 12;
const semesterStudents: Semester[] = [
    {
        id: semesterId++,
        name: 'Semester I',
        students: semOneStudents
    },
    {
        id: semesterId++,
        name: 'Semester III',
        students: semThreeStudents
    }
]

export { semesterStudents };