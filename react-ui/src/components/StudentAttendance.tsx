import React, { Component } from 'react'
import { Card, Col, Row } from 'react-bootstrap'
import { DashCircleFill, CheckCircleFill, XCircleFill } from 'react-bootstrap-icons'
import { ABSENT, PRESENT, LEFT } from '../assets/constants'
import { Attendance } from './AttendanceList'

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
        switch (attendance.att_status) {
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

        let newAttendance = Object.assign(this.props.attendance, {})

        if (this.props.attendance.att_status === LEFT) {
            newAttendance.att_status = PRESENT
            this.props.onStatusChange(newAttendance)
            return
        }

        newAttendance.att_status++

        this.props.onStatusChange(newAttendance)
        return

    }


    render() {

        const { attendance } = this.props
        return (

            <Card className='mb-2 shadow-sm'>

                <Card.Body className=''>
                    <Row>
                        <Col>
                            <div className="h-100 d-flex justify-content-start align-items-center">
                                <h5 className='text-capitalize'>{attendance.name.toLowerCase()}</h5>
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
