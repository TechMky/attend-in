import React, { ChangeEvent, Component } from 'react'
import { Button, Form, FormGroup, Modal } from 'react-bootstrap'
import { getTodaysDateString } from '../helpers/helperFns'

type Props = {
    show: boolean,
    onHide: () => void,
}

type State = {

    messageText: string
}

export default class ShareModal extends Component<Props, State> {


    constructor(props: Props) {
        super(props)

        this.handleShareClick = this.handleShareClick.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }


    state: State = {
        messageText: `Date: ${getTodaysDateString()}\nExecuted Mass Comm Class SEM I and Sem III`
    }

    handleShareClick() {
        // <a href="https://wa.me/?text=I'm%20inquiring%20about%20the%20apartment%20listing">Share</a>
        const url = `https://wa.me/?text=${encodeURI(this.state.messageText)}`

        window.open(url, '_blank')
    }


    handleChange(e: ChangeEvent<HTMLTextAreaElement>) {
        this.setState({ messageText: e.currentTarget.value })
    }

    render() {

        return (
            <Modal show={this.props.show} onHide={this.props.onHide} backdropClassName='static' animation={false} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Message</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <FormGroup>
                        <Form.Label>Your What's Message</Form.Label>
                        <Form.Control as="textarea" value={this.state.messageText}></Form.Control>
                    </FormGroup>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={this.props.onHide}>Close</Button>

                    <Button variant="primary" onClick={this.handleShareClick}>Share</Button>
                </Modal.Footer>
            </Modal>
        )
    }
}
