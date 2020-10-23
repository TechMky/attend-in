import React, { ChangeEvent, Component, MouseEvent } from 'react'
import { Button, ButtonGroup, Form } from 'react-bootstrap'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { ABSENT, LEFT, PRESENT } from '../assets/constants'
import { semesterStudents as semesterWithStudents } from "../assets/semStudents"
import { getAttendanceFromStorage, getTodaysDateString } from '../helpers/helperFns'
import { Attendance } from '../types/Attendance'
import { Semester } from '../types/semester'
import { StoredAttendance } from '../types/StoredAttendance'
import './AttendanceList.css'
import FileAndShare from './FileAndShare'
import StudentAttendance from './StudentAttendance'
import SubmitModal from './SubmitModal'



type Props = {

}

type State = {
    selectedSemester: Semester,
    attendance: Attendance[],
    showSubmitModal: boolean,
    showWhatsApp: boolean
}

export default class AttendanceList extends Component<Props, State> {


    /**
     *
     */
    constructor(props: Props) {
        super(props);

        this.handleAttendanceStatusChange = this.handleAttendanceStatusChange.bind(this)
        this.showModal = this.showModal.bind(this)
        this.hideModal = this.hideModal.bind(this)
        this.getAttendanceStatus = this.getAttendanceStatus.bind(this)
        this.submitAttendance = this.submitAttendance.bind(this)
        this.handleSemesterChange = this.handleSemesterChange.bind(this)
    }
    state: State = {
        selectedSemester: semesterWithStudents[0],
        attendance: semesterWithStudents[0].students.map(student => {
            return {
                id: student.id,
                name: student.name,
                att_status: PRESENT
            }
        }),

        showSubmitModal: false,

        showWhatsApp: false
    }


    getAttendanceStatus() {
        let present = 0
        let absent = 0
        let left = 0

        this.state.attendance.forEach(attendance => {

            switch (attendance.att_status) {
                case PRESENT:
                    present++
                    break;
                case ABSENT:
                    absent++
                    break;

                case LEFT:
                    left++
                    break;
                default:
                    break;
            }

        })

        return { present, absent, left }
    }

    submitAttendance() {

        const todaysAttendance = getAttendanceFromStorage()        
        const attendanceTaken: StoredAttendance = {
            semester_id: this.state.selectedSemester.id,
            semester_name: this.state.selectedSemester.name,
            attendance: this.state.attendance
        }

        todaysAttendance.push(attendanceTaken)

        localStorage.setItem(getTodaysDateString(), JSON.stringify(todaysAttendance))

        this.setState({ showSubmitModal: false })

        toast.dark('Attendance Submitted', {
            position: "top-center",
            autoClose: 3000,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,

        });
    }



    handleAttendanceStatusChange(changedAttendance: Attendance) {

        let newAttendance: Attendance[] = this.state.attendance.map((oldAttendance, i) => {

            if (oldAttendance.id === changedAttendance.id) {
                oldAttendance.att_status = changedAttendance.att_status
            }

            return oldAttendance
        })

        this.setState({ attendance: newAttendance })


    }

    handleSemesterChange(e: ChangeEvent<HTMLSelectElement>) {
        const selectedIndex = Number(e.currentTarget.value)

        const newSelectedSemester = semesterWithStudents[selectedIndex]

        const newAttendance = newSelectedSemester.students.map(student => {

            return {
                id: student.id,
                name: student.name,
                att_status: PRESENT
            }
        })


        this.setState({ selectedSemester: semesterWithStudents[selectedIndex], attendance: newAttendance })
    }

    hideModal() {

        this.setState({ showSubmitModal: false })
    }

    showModal(e: MouseEvent) {
        this.setState({ showSubmitModal: true })
    }




    render() {

        return (
            <div className='mb-5 pb-4'>
                <h1 className="text-center">Students</h1>

                <Form.Group>
                    <Form.Label>Select Semester</Form.Label>
                    <Form.Control as="select" size='lg' className='font-weight-bold' onChange={this.handleSemesterChange}>
                        {semesterWithStudents.map((sem, index) => <option value={index} key={sem.id} data-index={index}>{sem.name}</option>)}
                    </Form.Control>
                </Form.Group>

                {
                    this.state.attendance.map((student) => {

                        return <StudentAttendance key={student.id} attendance={student} onStatusChange={this.handleAttendanceStatusChange}></StudentAttendance>
                    })
                }

                <FileAndShare />

                <ButtonGroup className='fixed-bottom'>
                    <Button block variant='primary' size='lg' className="rounded-0" onClick={this.showModal}>Submit</Button>
                </ButtonGroup>

                <SubmitModal showSubmitModal={this.state.showSubmitModal} onHide={this.hideModal} attendanceStatus={this.getAttendanceStatus()} onSubmit={this.submitAttendance} />

                <ToastContainer />
            </div>
        )
    }
}

