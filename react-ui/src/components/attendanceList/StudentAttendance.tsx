import React, { Component } from 'react'
import { Card, Col, Row } from 'react-bootstrap'
import { DashCircleFill, CheckCircleFill, XCircleFill } from 'react-bootstrap-icons'
import { ABSENT, PRESENT, LEFT, PRESENT_TEXT, ABSENT_TEXT, LEFT_TEXT } from '../../config/index.json'
import { Attendance } from '../../@types/Attendance'
import Student from '../../@types/Student'
import { Semester } from '../../@types/Semester'


type Props = {
    attendance: Attendance
    onStatusChange: (attendance: Attendance) => void
}

type State = {

}

export default class StudentAttendance extends Component<Props, State> {

    constructor(props: Props) {
        super(props)
        this.handleOnClick = this.handleOnClick.bind(this)
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


        let newStatus = PRESENT
        let newStatusText = PRESENT_TEXT
        switch (this.props.attendance.status) {
            case PRESENT:
                newStatus = ABSENT
                newStatusText = ABSENT_TEXT
                break;
            
            case ABSENT:
                newStatus = LEFT
                newStatusText = LEFT_TEXT
                break;
            
            case LEFT:
                newStatus = PRESENT
                newStatusText = PRESENT_TEXT
                break;
            
            default:
                break;
        }

        this.props.onStatusChange({ ...this.props.attendance, status: newStatus, statusText: newStatusText })

    }


    render() {

        const { attendance } = this.props
        return (

            <Card className='mb-2 shadow-sm'>

                <Card.Body className=''>
                    <Row>
                        <Col>
                            <div className="h-100 d-flex justify-content-start align-items-center">
                                <h5 className='text-capitalize'>{attendance.student.name}</h5>
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
