import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import AttendanceList from './components/AttendanceList'
import { Container } from 'react-bootstrap';

function App() {
  return (
    <Container fluid>
      <AttendanceList />
    </Container>
  );
}

export default App;
