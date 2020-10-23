import React, { Component } from 'react'
import { Button, Modal } from 'react-bootstrap'

type Props = {
    showSubmitModal: boolean,
    attendanceStatus: { present: number, absent: number, left: number },
    onHide: () => void,
    onSubmit: () => void,
}

type State = {

}
export default class SubmitModal extends Component<Props, State> {
    render() {

        const { present, absent, left } = this.props.attendanceStatus
        return (
            <Modal show={this.props.showSubmitModal} onHide={this.props.onHide} backdropClassName='static' animation={false} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Confirmation</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h5 className='text-center'>Are you sure to submit the attendance?</h5>

                    <p>Present: {present}, Absent: {absent}, Left: {left}</p>

                    <p>Total Students: {present + absent + left}</p>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={this.props.onHide}>Close</Button>

                    <Button variant="primary" onClick={this.props.onSubmit}>Submit</Button>
                </Modal.Footer>
            </Modal>
        )
    }
}
