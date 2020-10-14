import React from 'react'

import './StudentList.css'
import Student from '../interface/student'

type Props = {
    students: Student[]
}

export default function StudentList({ students }: Props) {
    console.log(students)
    return (
        <div className="History">
            <h3 style={{ textAlign: "center" }}>Students</h3>
            <ul>
                {
                    students.map((student, index) => (
                        <li key={index} className="History-item">
                            <div className="History-outcome">

                                <span>{student.name}</span>

                            </div>
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}
