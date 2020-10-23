import React, { Component } from 'react'
import { Button, ButtonGroup } from 'react-bootstrap'
import { exportXLSX } from '../helpers/ExportExcel'
import { getAttendanceFromStorage } from '../helpers/helperFns'
import ShareModal from './ShareModal'

type Props = {

}

type State = {

    showShareModal: boolean
}

export default class FileAndShare extends Component<Props, State> {

    constructor(props: Props) {
        super(props)
        this.generateExcel = this.generateExcel.bind(this)
        this.toggleModal = this.toggleModal.bind(this)
    }

    state: State = {
        showShareModal: false
    }

    generateExcel() {

        let todaysAttendance = getAttendanceFromStorage()

        exportXLSX(todaysAttendance)
    }

    toggleModal() {
        this.setState((prevState) => ({ showShareModal: !prevState.showShareModal }))
    }

    render() {
        return (

            <div>

                <ButtonGroup size='lg' className='w-100'>
                    <Button variant='success' className="rounded-0 mr-1" onClick={this.generateExcel}>Excel</Button>
                    <Button variant='success' className="rounded-0 ml-1" onClick={this.toggleModal}>Share</Button>
                </ButtonGroup>

                <ShareModal show={this.state.showShareModal} onHide={this.toggleModal} />
            </div>
        )
    }
}
