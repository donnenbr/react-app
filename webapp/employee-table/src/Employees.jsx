import React, { useState, useRef, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';


function Employees ({selectedDeptId, updateSelectedDeptId}) {

  const [data,setData] = useState({empSelectedDeptId: selectedDeptId});
  const [employeeList,setEmployeeList] = useState([]);
  const [selectedEmployee,setSelectedEmployee] = useState(null);
  const [formData,setFormData] = useState(null);
  const [show, setShow] = useState('');

  const handleClose = () => setShow("");
  const handleSave = () => {
    if (formData.name === null || formData.name.trim().length < 1 ||
      formData.age === null || (formData.age.trim !== undefined && formData.age.trim().length < 1) ||
      formData.role === null || formData.role.trim().length < 1) {
      alert("Name, Age, and Role are required!!!");
      return;
    }
    console.log("*** data " + JSON.stringify(formData));
    let url = "http://localhost:8080/employee",
        method = undefined;
    if (show === 'edit') {
      url += "/" + formData.id;
      method = "PUT";
    }
    else {
      formData.department = { id: selectedDeptId };
      method = "POST";
    }
    
    fetch(
      url, {
        method: method, 
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })
      .then((res) => res.json())
      .then((result) => {
        console.log("*** result " + JSON.stringify(result));
        if (result.status !== undefined) {
          alert("Request failed, status=" + result.status + ", error " + result.error);
        }
        else {
          fetchData(selectedDeptId);
        }
          
      })
      .catch((error) => {
        console.log("*** error " + error);
    });

    setShow(false);
  };
  const handleAddEmployee = () => {
    setFormData( {
      name: "",
      age: "",
      role: ""
    });
    setShow("add");
  }

  function fetchData(deptId) {
    fetch(
      "http://localhost:8080/employee?deptId=" + escape(deptId))
                  .then((res) => res.json())
                  .then((json) => {
                      // setDeptList(json);
                      console.log("*** json " + json);
                      console.log("*** " + JSON.stringify(json));
                      setEmployeeList(json);
                  });
  }

  function viewEmployee(emp) {
    console.log("*** view emp " + emp.id + ", " + emp.name);
    if (emp !== null && emp !== undefined) {
      setSelectedEmployee(emp);
      setShow('view');
    }
  }

  function editEmployee(emp) {
    console.log("*** edit emp " + emp);
    if (emp !== null && emp !== undefined) {
      setFormData({ ...emp });
      setShow('edit');
    }
  }

  function deleteEmployee(emp) {
    console.log("*** DELETE emp " + emp);
    if (emp !== null && emp !== undefined) {
      fetch(
        "http://localhost:8080/employee/" + emp.id, {
          method: "DELETE", 
          mode: 'cors'
        })
        .then((res) => res.json())
        .then((result) => {
          console.log("*** result " + JSON.stringify(result));
          if (result.status !== undefined) {
            alert("Request failed, status=" + result.status + ", error " + result.error);
          }
          else {
            fetchData(selectedDeptId);
          }
            
        })
        .catch((error) => {
          console.log("*** error " + error);
      });
    }
  }

  const DisplayEmployeeData = employeeList.map(
    (info)=>{
        return(
          <tr key={info.id}>
            <td>{info.name}</td>
            <td>{info.age}</td>
            <td>{info.role}</td>
            <td>
				      <div style={{width:"100%", margin:3}}>
					      <button className="actionButton" onClick={()=>{viewEmployee(info);}}>View</button>&nbsp;&nbsp;
					      <button className="actionButton" onClick={()=>{editEmployee(info);}}>Edit</button>&nbsp;&nbsp;
					      <button className="deleteButton" onClick={()=>{deleteEmployee(info);}}>Delete</button>
				      </div>
			      </td>
          </tr>
        )
    }
  );

  // this detected the change in departments
  useEffect( () => {
    console.log("*** employee useEffect - " + selectedDeptId);
    if (selectedDeptId != data.empSelectedDeptId) {
      console.log("*** dept changed");
      if (selectedDeptId !== null && selectedDeptId !== undefined) {
        fetchData(selectedDeptId);
      }
    }
 }, [selectedDeptId]);

 function dataChanged(evt) {
  const newEmployeeData = {...formData};
  newEmployeeData[evt.target.id] = evt.target.value;
  setFormData(newEmployeeData);
};

 const viewDialog = () => {
    return (
      <Modal show={show == 'view'} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>View Employee</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form id="employeeViewForm">
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" readOnly name="name" value={selectedEmployee == null ? "" : selectedEmployee.name}/>
            <Form.Label>Age</Form.Label>
            <Form.Control type="text" readOnly name="age" value={selectedEmployee == null ? "" : selectedEmployee.age}/>
            <Form.Label>Role</Form.Label>
            <Form.Control type="text" readOnly name="age" value={selectedEmployee == null ? "" : selectedEmployee.role}/>
          </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

    );
 };

 const editDialog = () => {
  return (
    <Modal show={show == 'edit' || show === 'add'} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{show == 'edit' ? "Edit" : "New"} Employee</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form id="employeeViewForm">
          <Form.Group className="mb-3">
            <Form.Control type="text" placeholder="Enter name" name="name" id="name" required 
              value={formData == null ? "" : formData.name}
              onChange={(e) => dataChanged(e)}/>
            <Form.Label>Age</Form.Label>
            <Form.Control type="text" placeholder="Enter age" name="age" id="age" required
              value={formData == null ? "" : formData.age}
              onChange={dataChanged}/>
              <Form.Label>Role</Form.Label>
              <Form.Select name="role" id="role"
                  value={formData == null ? "" : formData.role}
                  onChange={dataChanged}>
                <option value="">-- Select --</option>
                <option value="Manager">Manager</option>
                <option value="Employee">Employee</option>
                <option value="pee-on">Pee-on</option>
              </Form.Select>
          </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
  );
 };

 const addEmployeeButton = () => {
  return (
    <>
    <p/>
    <button id="add_employee_btn" style={{display: 'block', margin: 'auto'}} onClick={handleAddEmployee}>
      Add New
    </button>
    <p/>
    </>
  );
 }

 function emptyList() {
  if (selectedDeptId == null || selectedDeptId == undefined) {
    return (
      <div>
        <h3 style={{textAlign:'center'}}>Please select a Department</h3>
      </div>
    );  
  }
  return (
    <div>
      <h3 style={{textAlign:'center'}}>There are no Employees</h3>
      {addEmployeeButton()}
      {editDialog()}
    </div>
  );
 };

  if (employeeList.length < 1) {
    return emptyList();
  }
  return (
    <div>
      <div>
		    <h3 style={{margin:10, textAlign:'center'}}>Employees</h3>
	    </div>
      <table id="emp_table" style={{border:"2px solid blue", width:"100%", borderCollapse:"collapse"}}>
        <thead>
		      <tr>
			      <th>Name</th>
            <th style={{width:"60px"}}>Age</th>
			      <th style={{width:"100px"}}>Role</th>
			      <th style={{width:"220px"}}>Action</th>
		      </tr>
        </thead>
        <tbody>
          {DisplayEmployeeData}
        </tbody>
      </table>

      {addEmployeeButton()}

      {viewDialog()}
      
      {editDialog()}
    </div>
  );
}

export default Employees;