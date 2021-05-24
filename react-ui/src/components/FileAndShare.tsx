import React, { Component } from 'react'
import { Button, ButtonGroup } from 'react-bootstrap'
import { Semester } from '../@types/Semester'
import ShareModal from './ShareModal'
import { Link } from 'react-router-dom'

type Props = {
    activeSemester: Semester,
    attendanceDate: string
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

    }

    toggleModal() {
        this.setState((prevState) => ({ showShareModal: !prevState.showShareModal }))
    }

    render() {
        const { activeSemester, attendanceDate } = this.props

        return (

            <div>

                <ButtonGroup size='lg' className='w-100'>
                    <Link target='_blank' className="btn btn-success rounded-0 mr-1" to={`/api/attendance/generateExcel/${activeSemester._id}?date=${attendanceDate}`}>
                        Excel
                    </Link>
                    <Button variant='success' className="rounded-0 ml-1" onClick={this.toggleModal}>Share</Button>
                </ButtonGroup>

                <ShareModal show={this.state.showShareModal} onHide={this.toggleModal} />
            </div>
        )
    }
}
