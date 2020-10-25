import React, { Component } from 'react'
import { Button, Nav, Navbar } from 'react-bootstrap'
import { toast } from 'react-toastify'

type Props = {

}

type State = {

}

export default class Header extends Component<Props, State> {

    constructor(props: Props) {
        super(props)

        this.clearStorage = this.clearStorage.bind(this)
    }

    clearStorage() {

        localStorage.clear()

        toast.dark('Storage Cleared', {
            position: "top-center",
            autoClose: 3000,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,

        });
    }

    render() {
        return (
            <div>
                <Navbar fixed='top' bg="light" className='shadow-sm'>
                    <Navbar.Brand href="#home">Attend In</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ml-auto">
                            <Nav.Item><Button onClick={this.clearStorage}>Clear History</Button></Nav.Item>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>

            </div>
        )
    }
}
