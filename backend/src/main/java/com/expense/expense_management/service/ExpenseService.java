package com.expense.expense_management.service;

import com.expense.expense_management.dto.ExpenseRequest;
import com.expense.expense_management.dto.ExpenseResponse;
import com.expense.expense_management.entity.Employee;
import com.expense.expense_management.entity.Expense;
import com.expense.expense_management.repository.EmployeeRepository;
import com.expense.expense_management.repository.ExpenseRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ExpenseService {

    private final ExpenseRepository expenseRepository;
    private final EmployeeRepository employeeRepository;

    public ExpenseResponse saveExpense(ExpenseRequest request, MultipartFile receipt) {

        Employee employee = employeeRepository.findById(request.getEmployeeId())
                .orElseThrow(() -> new RuntimeException("Employee not found"));

        // Validation
        if (request.getAmount().compareTo(BigDecimal.ZERO) <= 0) {
            throw new RuntimeException("Amount must be greater than zero");
        }

        if (request.getCategory() == null) {
            throw new RuntimeException("Category is required");
        }

        if (request.getDescription() == null || request.getDescription().trim().isEmpty()) {
            throw new RuntimeException("Description cannot be empty");
        }

        if (request.getExpenseDate().isAfter(LocalDate.now())) {
            throw new RuntimeException("Expense date cannot be in future");
        }
        // Business Rule - Maximum expense based on employee grade

        BigDecimal limit;

        switch (employee.getGrade()) {

            case "1":
                limit = new BigDecimal("300");
                break;

            case "5":
                limit = new BigDecimal("500");
                break;

            case "10":
                limit = new BigDecimal("1000");
                break;

            default:
                throw new RuntimeException("Invalid employee grade");
        }

        if (request.getAmount().compareTo(limit) > 0) {
            throw new RuntimeException(
                    "Expense exceeds limit for Grade " + employee.getGrade());
        }

        String fileName = null;

        if (receipt != null && !receipt.isEmpty()) {

            try {

                fileName = UUID.randomUUID() + "_" + receipt.getOriginalFilename();

                Path uploadPath = Paths.get("uploads");

                if (!Files.exists(uploadPath)) {
                    Files.createDirectories(uploadPath);
                }

                Files.copy(
                        receipt.getInputStream(),
                        uploadPath.resolve(fileName)
                );

            } catch (IOException e) {
                throw new RuntimeException("Failed to upload receipt.");
            }
        }

        Expense expense = Expense.builder()
                .employee(employee)
                .category(request.getCategory())
                .amount(request.getAmount())
                .description(request.getDescription())
                .expenseDate(request.getExpenseDate())
                .receiptFileName(fileName)
                .build();

        Expense saved = expenseRepository.save(expense);

        return new ExpenseResponse(
                saved.getId(),
                saved.getCategory(),
                saved.getAmount(),
                saved.getDescription(),
                saved.getExpenseDate(),
                employee.getName(),
                saved.getReceiptFileName()
        );
    }

    public List<ExpenseResponse> getEmployeeExpenses(Long employeeId) {

        Employee employee = employeeRepository.findById(employeeId)
                .orElseThrow(() -> new RuntimeException("Employee not found"));

        return expenseRepository.findByEmployee(employee)
                .stream()
                .map(expense -> new ExpenseResponse(
                        expense.getId(),
                        expense.getCategory(),
                        expense.getAmount(),
                        expense.getDescription(),
                        expense.getExpenseDate(),
                        employee.getName(),
                        expense.getReceiptFileName()
                ))
                .toList();
    }

    public List<ExpenseResponse> getAllExpenses() {

        return expenseRepository.findAll()
                .stream()
                .map(expense -> new ExpenseResponse(
                        expense.getId(),
                        expense.getCategory(),
                        expense.getAmount(),
                        expense.getDescription(),
                        expense.getExpenseDate(),
                        expense.getEmployee().getName(),
                        expense.getReceiptFileName()
                ))
                .toList();
    }
}