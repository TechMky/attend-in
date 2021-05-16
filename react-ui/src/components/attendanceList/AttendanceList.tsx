import React, { ChangeEvent, Component, MouseEvent } from 'react'
import { Button, ButtonGroup, Form } from 'react-bootstrap'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { ABSENT, LEFT, PRESENT } from '../../config/index.json'
import { getAttendanceFromStorage, getTodaysDateString } from '../../helpers/helperFns'
import { Attendance } from '../../@types/Attendance'
import { Semester } from '../../@types/Semester'
import { StoredAttendance } from '../../@types/StoredAttendance'
import './AttendanceList.css'
import FileAndShare from '../FileAndShare'
import StudentAttendance from './StudentAttendance'
import SubmitModal from '../SubmitModal'
import { getSemester } from '../../helpers/ApiService'
import Student from '../../@types/Student'



type Props = {

}

type State = {
    selectedSemester: Semester,
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
        selectedSemester: {} as Semester,
        semesters: [],
        attendance: [],
        showSubmitModal: false,
        showWhatsApp: false
    }

    async componentDidMount(){

        const semesters: Semester[] = await getSemester()

        this.setState({semesters, selectedSemester: semesters.length > 0 ? semesters[0] : {} as Semester })

    }


    submitAttendance() {

        const todaysAttendance = getAttendanceFromStorage()        
        const attendanceTaken: StoredAttendance = {
            semester_id: this.state.selectedSemester._id,
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

        // let newAttendance: Attendance[] = this.state.attendance.map((oldAttendance, i) => {

        //     if (oldAttendance._id === changedAttendance._id) {
        //         oldAttendance.att_status = changedAttendance.att_status
        //     }

        //     return oldAttendance
        // })

        // this.setState({ attendance: newAttendance })


    }

    handleSemesterChange(e: ChangeEvent<HTMLSelectElement>) {

        const semesterId:string = e.currentTarget.value
        const foundSemester:Semester = this.state.semesters.find(sem => sem._id === semesterId) || {} as Semester
        this.setState({selectedSemester: foundSemester})

    }

    hideModal() {

        this.setState({ showSubmitModal: false })
    }

    showModal(e: MouseEvent) {
        this.setState({ showSubmitModal: true })
    }

    render() {

        const { semesters, selectedSemester } = this.state
        console.log("🚀 ~ file: AttendanceList.tsx ~ line 161 ~ AttendanceList ~ render ~ selectedSemester", selectedSemester)

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
                    selectedSemester.students?.map((student:Student) => {

                        return <StudentAttendance key={student._id} student={student} onStatusChange={() => {}}></StudentAttendance>
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

