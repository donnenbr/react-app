import React, { useState } from 'react';
import './App.css';
import Departments from './Departments';
import Employees from './Employees';

function App() {
  const [selectedDeptId, updateSelectedDeptId] = useState(undefined);
  return (
    <div className="App">
      <table style={{width:'100%', padding:'0'}}>
        <tbody>
          <tr>
            <td style={{border:'1px solid blue', width:'200px', margin:'0'}}>
              <Departments selectedDeptId={selectedDeptId} updateSelectedDeptId={updateSelectedDeptId}/>
            </td>
            <td style={{border:'1px solid blue', margin:'0', padding:'10'}}>
              <Employees  selectedDeptId={selectedDeptId} updateSelectedDeptId={updateSelectedDeptId}/>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default App;
