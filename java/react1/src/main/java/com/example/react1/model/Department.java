package com.example.react1.model;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.GeneratedValue;
import javax.persistence.SequenceGenerator;;

@Entity
public class Department {
	@Id
	@SequenceGenerator(name = "departmentIdGen", sequenceName = "departmentSeq", initialValue = 1, allocationSize = 1)
	@GeneratedValue(generator = "departmentIdGen")
	private Long id;
	
	private String name;
	private String area;
	
	public Department() {
		
	}
	
	public Department(Long id, String name, String area) {
		super();
		this.id = id;
		this.name = name;
		this.area = area;
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
	public String getArea() {
		return area;
	}
	public void setArea(String area) {
		this.area = area;
	}
}
