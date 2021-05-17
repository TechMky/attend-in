import React, { Component } from 'react'
import { Button, Modal } from 'react-bootstrap'
import { Attendance } from '../@types/Attendance'
import { PRESENT, ABSENT, LEFT } from '../config/index.json'

type Props = {
    showSubmitModal: boolean,
    attendance: Attendance[],
    onHide: () => void,
    onSubmit: () => void,
}

type State = {

}
export default class SubmitModal extends Component<Props, State> {

    getAttendanceStats(){
        let present = 0,absent = 0, left = 0
        this.props.attendance.forEach(attd => {

            switch (attd.status) {
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

        return {present, absent, left}
    }

    render() {

        const { present, absent, left } = this.getAttendanceStats()
        return (
            <Modal show={this.props.showSubmitModal} onHide={this.props.onHide} backdropClassName='static' animation={false} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Confirmation</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h5 className='text-center'>Are you sure to submit the attendance?</h5>

                    <p>Present: {present}, Absent: {absent}, Left: {left}</p>

                    <p>Total Students: {this.props.attendance.length}</p>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={this.props.onHide}>Close</Button>

                    <Button variant="primary" disabled={this.props.attendance.length === 0} onClick={this.props.onSubmit}>Submit</Button>
                </Modal.Footer>
            </Modal>
        )
    }
}
