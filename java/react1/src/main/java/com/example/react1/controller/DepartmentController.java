package com.example.react1.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.http.HttpStatus;

import com.example.react1.model.Department;
import com.example.react1.repository.DepartmentRepo;

// import javax.websocket.server.PathParam;

import java.util.Optional;

@RestController
public class DepartmentController {
	@Autowired
	DepartmentRepo deptRepo;
	
	// required to appease the react front end
	@CrossOrigin(origins = "*")
	@GetMapping("department")
	public Iterable<Department> getDepartments() {
		return deptRepo.findAll();
	}
	
	@CrossOrigin(origins = "*")
	@GetMapping("department/{id}")
	public Department getDepartment(@PathVariable Long id) {
		Optional<Department> dept = deptRepo.findById(id);
		if (dept.isEmpty()) {
			throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Department not found");
		}
		return dept.get();
	}
	
	@CrossOrigin(origins = "*")
	@PostMapping("department")
	public Department addDepartment(@RequestBody Department dept) {
		// long count = deptRepo.count();
		// dept.setId(count+1);
		dept = deptRepo.save(dept);
		
		return dept;
	}

}
