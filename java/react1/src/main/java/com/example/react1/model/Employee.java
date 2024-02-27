package com.example.react1.model;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Column;
import javax.persistence.ManyToOne;
import javax.persistence.SequenceGenerator;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.JoinColumn;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
public class Employee {
	@Id
	@SequenceGenerator(name = "employeeIdGen", sequenceName = "employeeSeq", initialValue = 1, allocationSize=1)
	@GeneratedValue(generator = "employeeIdGen")
	private Long id;
	
	@Column(nullable=false, length=80)
	private String name;
	@Column(nullable=false)
	private Integer age;
	@Column(nullable=false, length=12)
	private String role;
	
	// no foreign key for now
	// @Column(name="department_id", nullable=false)
	// private Integer departmentId;
	
	@ManyToOne(fetch = FetchType.EAGER, optional = false)
	@JoinColumn(name = "department_id", nullable = false)
	// @JsonUnwrapped
	private Department department;
	
	public Employee() {
		
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Integer getAge() {
		return age;
	}

	public void setAge(Integer age) {
		this.age = age;
	}

	public String getRole() {
		return role;
	}

	public void setRole(String role) {
		this.role = role;
	}

	public Department getDepartment() {
		return department;
	}

	public void setDepartment(Department department) {
		this.department = department;
	}
}
