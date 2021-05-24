import React from 'react'
import { Link } from 'react-router-dom'
import { ROUTE } from '../config/index.json'

function AttendanceNotFound() {

    

    return (
        <div className='mb-5 py-4'>
            <h1>No Attendance found for the date provided</h1>
            <Link className='d-block text-center btn btn-primary' to={ROUTE.ATTENDANCE}>Go To Attendance</Link>
        </div>
    )
}

export default AttendanceNotFound
