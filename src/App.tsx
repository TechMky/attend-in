import React from 'react';
import students from './assets/student'
import './App.css';
import StudentList from './components/StudentList';

function App() {
  return (
    <div className="App">
      <StudentList students={students} />
    </div>
  );
}

export default App;
