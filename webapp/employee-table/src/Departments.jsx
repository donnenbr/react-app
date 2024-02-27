import React, { useState, useRef, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function Departments ({selectedDeptId, updateSelectedDeptId}) {
  // better than id
  const formRef = useRef(null);
  const [show, setShow] = useState(false);
  const [formData,setFormData] = useState ({
    name : "",
    area : ""
  });
  const[deptList,setDeptList] = useState([]);

  /*
  const handleDeptClick = (evt) => {
    // alert("*** clicked dept " + evt);
    var deptId = evt.target.getAttribute("dept_id");
    alert("*** dept Id " + deptId);
    updateSelectedDeptId(deptId);
  };
  */

  const handleDeptClickNew = (deptId) => {
    updateSelectedDeptId(deptId);
  };

  /* another way - onClick={handleDeptClick} */

  const DisplayDeptData = deptList.map(
      (info)=>{
          return(
            <tr key={info.id}>
              <td>
                <a href="#" dept_id={info.id} onClick={()=> { handleDeptClickNew(info.id);} }>{info.name}
                </a>
              </td>
            </tr>
          )
      }
  )

  function fetchData() {
    fetch(
      "http://localhost:8080/department")
                  .then((res) => res.json())
                  .then((json) => {
                      setDeptList(json);
                  });
  }

  function dataChanged(evt) {
    console.log("*** data changed " + evt.target.id);
    const newData = {...formData};
    newData[evt.target.id] = evt.target.value;
    setFormData(newData);
  };

  const handleClose = () => setShow(false);
  const handleShow = () =>  {
    setFormData({name : "", area : ""});
    setShow(true);
  };
  const handleSave = () => {
    // const form = formRef.current;
  
    if (formData.name === null || formData.name.trim().length < 1 ||
      formData.area === null || formData.area.trim().length < 1) {
      alert("Name and Area are required!!!");
      return;
    }

      fetch(
        "http://localhost:8080/department", {
          method: 'POST', 
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        })
        .then((res) => res.json())
        .then((result) => {
          console.log("*** post " + JSON.stringify(result));
          if (result.status !== undefined) {
            alert("Request failed, status=" + result.status + ", error " + result.error);
          }
          else {
            fetchData();
          }
            
        })
        .catch((error) => {
          console.log("*** error " + error);
      });

      setShow(false);
      // fetchData();
  };

  // Fetch data when component mounted
  useEffect( () => {
    fetchData()
 }, []);

  return (
    <div>
  <h3 style={{textAlign:'center'}}>Departments</h3>
      <table style={{width:"100%"}} id="dept_table">
          <tbody>
            {DisplayDeptData}
            </tbody>
      </table>
      <hr/>
      <div style={{margin:'10'}}>
          <button id="add_dept_btn" style={{display: 'block', margin: 'auto'}} onClick={handleShow}>
            Add New
          </button>
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Department</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form id="departmentsForm" ref={formRef}>
          <Form.Group className="mb-3">
            <Form.Label>Department Name</Form.Label>
            <Form.Control type="text" placeholder="Enter name" name="name" id="name" required 
              onChange={(e) => dataChanged(e)}/>
            <Form.Label>Area</Form.Label>
            <Form.Control type="text" placeholder="Enter area" name="area" required id="area"
              onChange={dataChanged}/>
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
    </div>
  )
}

export default Departments;
