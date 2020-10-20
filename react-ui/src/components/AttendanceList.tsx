import React, { Component, MouseEvent } from 'react'
import './AttendanceList.css'
import { Button, ButtonGroup, Modal } from 'react-bootstrap'
import students from '../assets/student'
import { ABSENT, LEFT, PRESENT } from '../assets/constants'
import StudentAttendance from './StudentAttendance'
import Student from '../interface/student'
import { exportXLSX } from '../helpers/ExportExcel';

export type Attendance = Student & {
    att_status: number
}

type Props = {

}

type State = {
    attendance: Attendance[],
    showSubmitModal: any,
    statusLabel: string
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
    }
    state: State = {

        attendance: students.map(student => {
            return {
                id: student.id,
                name: student.name,
                att_status: PRESENT
            }
        }),

        showSubmitModal: false,

        statusLabel: ''
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

        const todaysDate = new Date()

        //may be need to do this last
        // localStorage.setItem(todaysDate.getTime().toString(), JSON.stringify(this.state.attendance))

        //create a sheet here and save accordingly
        exportXLSX()

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

    hideModal() {

        this.setState({ showSubmitModal: false })
    }

    showModal(e: MouseEvent) {
        this.setState({ showSubmitModal: true })
    }




    render() {

        const { present, left, absent } = this.getAttendanceStatus()

        return (
            <div className='pb-5'>
                <h1 className="text-center">Students</h1>
                {
                    this.state.attendance.map((student) => {

                        return <StudentAttendance key={student.id} attendance={student} onStatusChange={this.handleAttendanceStatusChange}></StudentAttendance>
                    })
                }

                <ButtonGroup className='fixed-bottom'>
                    <Button block variant='primary' size='lg' className="rounded-0" onClick={this.showModal}>Submit</Button>
                </ButtonGroup>


                <Modal show={this.state.showSubmitModal} onHide={this.hideModal} backdropClassName='static' animation={false} centered>
                    <Modal.Header closeButton>
                        <Modal.Title>Confirmation</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <h5 className='text-center'>Are you sure to submit the attendance?</h5>

                        <p>Present: {present}, Absent: {absent}, Left: {left}</p>

                        <p>Total Students: {present + absent + left}</p>

                        <h6 className='text-center'>{this.state.statusLabel}</h6>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.hideModal}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={this.submitAttendance}>
                            Submit
                        </Button>
                    </Modal.Footer>
                </Modal>

            </div>
        )
    }
}

