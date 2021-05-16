import React, { Component } from 'react'
import { Card, Col, Row } from 'react-bootstrap'
import { DashCircleFill, CheckCircleFill, XCircleFill } from 'react-bootstrap-icons'
import { ABSENT, PRESENT, LEFT, PRESENT_TEXT } from '../../config/index.json'
import { Attendance } from '../../@types/Attendance'
import Student from '../../@types/Student'


type Props = {
    student: Student
    onStatusChange: (attendance: Student) => void
}

type State = {

    attendance: Attendance

}

export default class StudentAttendance extends Component<Props, State> {

    constructor(props: Props) {
        super(props)

        this.handleOnClick = this.handleOnClick.bind(this)
        this.state = {
            attendance: {
                date: new Date(),
                status: PRESENT,
                statusText: PRESENT_TEXT,
                studentId: props.student._id
            }
        }
    }

    getIcon(attendance: Attendance) {

        const size = 30
        switch (attendance.status) {
            case PRESENT:

                return <CheckCircleFill size={size} className='text-success'></CheckCircleFill>

            case ABSENT:

                return <XCircleFill size={size} className='text-danger'></XCircleFill>

            case LEFT:

                return <DashCircleFill size={size} className='text-warning'></DashCircleFill>

            default:
                break;
        }
    }


    handleOnClick(): void {

        const {attendance: { status }} = this.state

        let newStatus = PRESENT
        switch (status) {
            case PRESENT:
                newStatus = ABSENT
                break;
            
            case ABSENT:
                newStatus = LEFT
                break;
            
            case LEFT:
                newStatus = PRESENT
                break;
            
            default:
                break;
        }

        this.setState({attendance: { ...this.state.attendance, status: newStatus }})

    }


    render() {

        const { student } = this.props
        const { attendance } = this.state
        return (

            <Card className='mb-2 shadow-sm'>

                <Card.Body className=''>
                    <Row>
                        <Col>
                            <div className="h-100 d-flex justify-content-start align-items-center">
                                <h5 className='text-capitalize'>{student.name}</h5>
                            </div>

                        </Col>
                        <Col xs={3}>

                            <div className="h-100  d-flex justify-content-center align-items-center" onClick={this.handleOnClick}>

                                {this.getIcon(attendance)}

                            </div>
                        </Col>
                    </Row>

                </Card.Body>
            </Card>
        )
    }
}
