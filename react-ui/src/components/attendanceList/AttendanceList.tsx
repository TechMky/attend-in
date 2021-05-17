import React, { ChangeEvent, Component, MouseEvent } from 'react'
import { Button, ButtonGroup, Form } from 'react-bootstrap'
import 'react-toastify/dist/ReactToastify.css'
import { getAttendanceFromStudent } from '../../helpers/helperFns'
import { Attendance } from '../../@types/Attendance'
import { Semester } from '../../@types/Semester'
import './AttendanceList.css'
import FileAndShare from '../FileAndShare'
import StudentAttendance from './StudentAttendance'
import { getSemester } from '../../helpers/ApiService'



type Props = {

}

type State = {
    semesters: Semester[],
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
        this.submitAttendance = this.submitAttendance.bind(this)
        this.handleSemesterChange = this.handleSemesterChange.bind(this)
    }
    state: State = {
        semesters: [],
        attendance: [],
        showSubmitModal: false,
        showWhatsApp: false
    }

    async componentDidMount(){

        const semesters: Semester[] = await getSemester()
        const selectedSemester = semesters.length > 0 ? semesters[0] : {} as Semester
        let attendance: Attendance[] = [] 

        if (selectedSemester.students && selectedSemester.students.length > 0) {
         
            attendance = selectedSemester.students.map(student => getAttendanceFromStudent(student, selectedSemester))
        }

        this.setState({ semesters, attendance })

    }


    submitAttendance() {

        // const todaysAttendance = getAttendanceFromStorage()        
        // const attendanceTaken: StoredAttendance = {
        //     semester_id: this.state.selectedSemester._id,
        //     semester_name: this.state.selectedSemester.name,
        //     attendance: this.state.attendance
        // }

        // todaysAttendance.push(attendanceTaken)

        // localStorage.setItem(getTodaysDateString(), JSON.stringify(todaysAttendance))

        // this.setState({ showSubmitModal: false })

        // toast.dark('Attendance Submitted', {
        //     position: "top-center",
        //     autoClose: 3000,
        //     closeOnClick: true,
        //     pauseOnHover: true,
        //     draggable: true,

        // });
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

        const semesterId:string = e.currentTarget.value
        const foundSemester:Semester = this.state.semesters.find(sem => sem._id === semesterId) || {} as Semester

        const attendance = foundSemester.students.map(student => getAttendanceFromStudent(student, foundSemester))
        this.setState({attendance})

    }

    hideModal() {

        this.setState({ showSubmitModal: false })
    }

    showModal(e: MouseEvent) {
        this.setState({ showSubmitModal: true })
    }

    render() {

        const { semesters, attendance } = this.state

        return (
            <div className='mb-5 py-4'>
                <h1 className="display-6">Take Attendance</h1>
                <hr />

                <Form.Group>
                    <Form.Label>Select Semester</Form.Label>
                    <Form.Control as="select" size='lg' className='font-weight-bold' onChange={this.handleSemesterChange}>
                        {semesters.map(sem => <option value={sem._id} key={sem._id}>{sem.name}</option>)}
                    </Form.Control>
                </Form.Group>

                {
                    attendance.map((attd:Attendance) => {

                        return <StudentAttendance key={attd.student._id} attendance={attd} onStatusChange={this.handleAttendanceStatusChange}></StudentAttendance>
                    })
                }

                <FileAndShare />

                <ButtonGroup className='fixed-bottom'>
                    <Button block variant='primary' size='lg' className="rounded-0" onClick={this.showModal}>Submit</Button>
                </ButtonGroup>

                {/* <SubmitModal showSubmitModal={this.state.showSubmitModal} onHide={this.hideModal} attendanceStatus={this.getAttendanceStatus()} onSubmit={this.submitAttendance} /> */}

            </div>
        )
    }
}

