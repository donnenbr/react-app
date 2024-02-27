package com.example.react1.repository;

import com.example.react1.model.Employee;
import org.springframework.stereotype.Repository;
import java.util.List;

import org.springframework.data.repository.CrudRepository;

@Repository
public interface EmployeeRepo extends CrudRepository<Employee, Long> {
	
	List<Employee> findByName(String name);
	
	List<Employee> findByDepartmentId(Long departmentId);

    Employee findById(long id);
}
