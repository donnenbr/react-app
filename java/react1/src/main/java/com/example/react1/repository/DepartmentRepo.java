package com.example.react1.repository;

import com.example.react1.model.Department;
import org.springframework.stereotype.Repository;
import java.util.List;

import org.springframework.data.repository.CrudRepository;

@Repository
public interface DepartmentRepo extends CrudRepository<Department, Long> {
	
	List<Department> findByName(String name);

    Department findById(long id);
}
