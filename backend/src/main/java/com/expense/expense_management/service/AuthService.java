package com.expense.expense_management.service;

import com.expense.expense_management.dto.LoginRequest;
import com.expense.expense_management.dto.LoginResponse;
import com.expense.expense_management.entity.Employee;
import com.expense.expense_management.repository.EmployeeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final EmployeeRepository employeeRepository;
    private final PasswordEncoder passwordEncoder;

    public LoginResponse login(LoginRequest request) {

        Employee employee = employeeRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("Invalid email or password"));

        if (!passwordEncoder.matches(request.getPassword(), employee.getPassword())) {
            throw new RuntimeException("Invalid email or password");
        }

        return new LoginResponse(
                employee.getId(),
                employee.getName(),
                employee.getRole(),
                employee.getGrade()
        );
    }
}