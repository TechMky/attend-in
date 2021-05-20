import './AttendanceList.css'
import React, { ChangeEvent, Component, MouseEvent } from 'react'
import { Button, ButtonGroup, Col, Form, Row } from 'react-bootstrap'
import { getAttendanceFromStudent, getTodaysDateString } from '../../helpers/helperFns'
import { Attendance } from '../../@types/Attendance'
import { Semester } from '../../@types/Semester'
import FileAndShare from '../FileAndShare'
import StudentAttendance from './StudentAttendance'
import { getSemester, sendAttendance } from '../../helpers/ApiService'
import SubmitModal from '../SubmitModal'
import { toast } from 'react-toastify'
import Student from '../../@types/Student'



type Props = {

}

type State = {
    semesters: Semester[],
    attendance: Attendance[],
    attendanceDate: string,
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
        this.submitAttendance = this.submitAttendance.bind(this)
        this.handleSemesterChange = this.handleSemesterChange.bind(this)
        this.handleDateChange = this.handleDateChange.bind(this)
    }
    state: State = {
        semesters: [],
        attendance: [],
        attendanceDate: getTodaysDateString('yyyy-MM-dd'),
        showSubmitModal: false,
        showWhatsApp: false
    }

    async componentDidMount() {


        const [error, semesters] = await getSemester()
        if (!error) {
            const selectedSemester = semesters.length > 0 ? semesters[0] : {} as Semester
            let attendance: Attendance[] = []

            if (selectedSemester && selectedSemester?.students.length > 0) {

                attendance = selectedSemester.students.map((student: Student) => getAttendanceFromStudent(student, selectedSemester))
            }

            this.setState({ semesters, attendance })
        }

    }

    async submitAttendance() {

        const currentDate = new Date(this.state.attendanceDate)
        const attendance: Attendance[] = this.state.attendance.map(attd => {
            attd.date = currentDate
            return attd
        })

        console.log(attendance)


        const [error] = await sendAttendance(currentDate, attendance)

        if (error) {
            toast.dark('Unable to submit attendance', {
                position: "top-center",
                autoClose: 3000,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
        }



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

        const attendance: Attendance[] = this.state.attendance.map((atted) => {

            if (atted.student._id === changedAttendance.student._id) {
                return changedAttendance
            }

            return atted

        })

        this.setState({ attendance })

    }

    handleSemesterChange(e: ChangeEvent<HTMLSelectElement>) {

        const semesterId: string = e.currentTarget.value
        const foundSemester: Semester = this.state.semesters.find(sem => sem._id === semesterId) || {} as Semester

        const attendance = foundSemester.students.map(student => getAttendanceFromStudent(student, foundSemester))
        this.setState({ attendance })

    }

    handleDateChange(e: ChangeEvent<HTMLInputElement>){
        this.setState({...this.state, attendanceDate: e.currentTarget.value})
    }

    hideModal() {

        this.setState({ showSubmitModal: false })
    }

    showModal(e: MouseEvent) {
        this.setState({ showSubmitModal: true })
    }

    render() {

        const { semesters, attendance, attendanceDate } = this.state

        return (
            <div className='mb-5 py-4'>
                <h1 className="display-6">Take Attendance</h1>
                <hr />

                <Row>
                    <Col md={6}>
                        <Form.Group>
                            <Form.Label>Attendance Date</Form.Label>
                            <Form.Control type='date' size='lg' className='font-weight-bold' value={attendanceDate} onChange={this.handleDateChange}>
                                
                            </Form.Control>
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group>
                            <Form.Label>Select Semester</Form.Label>
                            <Form.Control as="select" size='lg' className='font-weight-bold' onChange={this.handleSemesterChange}>
                                {semesters.map(sem => <option value={sem._id} key={sem._id}>{sem.name}</option>)}
                            </Form.Control>
                        </Form.Group>
                    </Col>
                </Row>



                {
                    attendance.map((attd: Attendance) => {

                        return <StudentAttendance key={attd.student._id} attendance={attd} onStatusChange={this.handleAttendanceStatusChange}></StudentAttendance>
                    })
                }

                <FileAndShare />

                <ButtonGroup className='fixed-bottom'>
                    <Button block variant='primary' size='lg' className="rounded-0" onClick={this.showModal}>Submit</Button>
                </ButtonGroup>

                <SubmitModal showSubmitModal={this.state.showSubmitModal} attendance={this.state.attendance} onHide={this.hideModal} onSubmit={this.submitAttendance} />

            </div>
        )
    }
}

