package com.expense.expense_management.config;

import com.expense.expense_management.entity.Employee;
import com.expense.expense_management.entity.enums.Role;
import com.expense.expense_management.repository.EmployeeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {

    private final EmployeeRepository employeeRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) {

        if (employeeRepository.count() == 0) {

            Employee admin = Employee.builder()
                    .name("Admin")
                    .email("admin@test.com")
                    .password(passwordEncoder.encode("admin123"))
                    .grade("A")
                    .role(Role.ADMIN)
                    .build();

            Employee emp1 = Employee.builder()
                    .name("Rahul")
                    .email("rahul@test.com")
                    .password(passwordEncoder.encode("rahul123"))
                    .grade("B")
                    .role(Role.EMPLOYEE)
                    .build();

            Employee emp2 = Employee.builder()
                    .name("Priya")
                    .email("priya@test.com")
                    .password(passwordEncoder.encode("priya123"))
                    .grade("C")
                    .role(Role.EMPLOYEE)
                    .build();

            employeeRepository.save(admin);
            employeeRepository.save(emp1);
            employeeRepository.save(emp2);

            System.out.println("Sample employees inserted successfully!");
        }
    }
}