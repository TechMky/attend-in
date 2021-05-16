import React, { ReactElement } from 'react'
import { Navbar } from 'react-bootstrap'
import { ROUTE } from '../../config/index.json'

type Props = {

}

type State = {

}

export default function Header(props: Props): ReactElement {


    return (
        <Navbar fixed='top' bg="light" className='shadow-sm'>
            <Navbar.Brand href={ROUTE.HOME}>Attend In</Navbar.Brand>
        </Navbar>
    )
}
