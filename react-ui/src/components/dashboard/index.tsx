import React from 'react'
import './dashboard.css'
import attendanceImg from '../../assets/images/attendance.jpg'
import { Card, CardDeck } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { ROUTE } from '../../config/index.json'

function Dashboard() {
    return (
        <CardDeck>
            <Card border='primary' className='shadow-lg' style={{ width: '18rem' }}>
                <Link to={ROUTE.ATTENDANCE}>
                    <Card.Img variant="top" className="img-fluid" src={attendanceImg} />
                    <Card.Body>
                        <Card.Title>Attendance</Card.Title>
                        <Card.Text>
                            Take today's attendance.
                        </Card.Text>
                    </Card.Body>
                </Link>
            </Card>
            
        </CardDeck>
    )
}

export default Dashboard
