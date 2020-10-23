import React, { Component } from 'react'
import { Button, ButtonGroup } from 'react-bootstrap'
import { exportXLSX } from '../helpers/ExportExcel'
import { getAttendanceFromStorage } from '../helpers/helperFns'

type Props = {

}

type State = {

}

export default class FileAndShare extends Component<Props, State> {

    constructor(props: Props) {
        super(props)
        this.generateExcel = this.generateExcel.bind(this)
        this.openShareModal = this.openShareModal.bind(this)
    }


    generateExcel() {

        let todaysAttendance = getAttendanceFromStorage()

        exportXLSX(todaysAttendance)
    }

    openShareModal() {
        // <a href="https://wa.me/?text=I'm%20inquiring%20about%20the%20apartment%20listing">Share</a>
    }

    render() {
        return (

            <ButtonGroup size='lg' className='w-100'>
                <Button variant='success' className="rounded-0 mr-1" onClick={this.generateExcel}>Excel</Button>
                <Button variant='success' className="rounded-0 ml-1" onClick={this.openShareModal}>Share</Button>
            </ButtonGroup>
        )
    }
}
