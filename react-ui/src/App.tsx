import './App.css';
import React, { lazy, Suspense } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ROUTE } from "./config";
import { Container } from 'react-bootstrap';
import Header from "./components/header";

const Dashboard = lazy(() => import('./components/dashboard'))
const AttendanceList = lazy(() => import('./components/attendanceList/AttendanceList'))

function App() {
  return (

    <Router>
      <Header />
      <Suspense fallback={<div>loading...</div>}>
        <Container className='mt-5 pt-3'>
          <Switch>
            <Route exact path={ROUTE.HOME} component={Dashboard}/>
            <Route exact path={ROUTE.ATTENDANCE} component={AttendanceList}/>
          </Switch>
        </Container>
      </Suspense>
      
    </Router>
  );
}

export default App;
