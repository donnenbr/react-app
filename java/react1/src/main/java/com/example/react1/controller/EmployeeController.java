package com.example.react1.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import com.example.react1.model.Employee;
import com.example.react1.repository.EmployeeRepo;

// import javax.websocket.server.PathParam;

import java.util.Optional;

@RestController
public class EmployeeController {
	@Autowired
	EmployeeRepo employeeRepo;
	
	// required to appease the react front end
	@CrossOrigin(origins = "*")
	@GetMapping("employee")
	public Iterable<Employee> getEmployees(@RequestParam(required=false) Long deptId) {
		if (deptId == null) {
			return employeeRepo.findAll();
		}
		return employeeRepo.findByDepartmentId(deptId);
	}
	
	// required to appease the react front end
	@CrossOrigin(origins = "*")
	@GetMapping("allEmployees")
	public Iterable<Employee> getAllEmployees() {
		return employeeRepo.findAll();
	}
	
	// required to appease the react front end
	@CrossOrigin(origins = "*")
	@GetMapping("employee/{id}")
	public Employee getEmployee(@PathVariable Long id) {
		Optional<Employee> emp = employeeRepo.findById(id);
		if (emp.isEmpty()) {
			throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Employee not found");
		}
		return emp.get();
	}
	
	// required to appease the react front end
	@CrossOrigin(origins = "*")
	@PostMapping("employee")
	public Employee addEmployee(@RequestBody Employee emp) {
		System.out.println("*** emp dept " + emp.getDepartment());
		// long count = employeeRepo.count();
		// emp.setId(count+1);
		emp = employeeRepo.save(emp);
		
		return emp;
	}
	
	// required to appease the react front end
	@CrossOrigin(origins = "*")
	@PutMapping("employee/{id}")
	public Employee updateEmployee(@PathVariable Long id, @RequestBody Employee emp) {
		Optional<Employee> dbEmp = employeeRepo.findById(id);
		if (dbEmp.isEmpty()) {
			throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Employee not found");
		}
		Employee emp2 = dbEmp.get();
		emp2.setAge(emp.getAge());
		emp2.setName(emp.getName());
		emp2.setRole(emp.getRole());
		emp2.setDepartment(emp.getDepartment());
		emp2 = employeeRepo.save(emp2);
		
		return emp2;
	}
	
	// required to appease the react front end
	@CrossOrigin(origins = "*")
	@DeleteMapping("employee/{id}")
	public Employee deleteEmployee(@PathVariable Long id) {
		Optional<Employee> emp = employeeRepo.findById(id);
		if (emp.isEmpty()) {
			throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Employee not found");
		}
		employeeRepo.delete(emp.get());
		return emp.get();
	}
}
