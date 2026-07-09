package com.expense.expense_management.controller;

import com.expense.expense_management.dto.ExpenseRequest;
import com.expense.expense_management.dto.ExpenseResponse;
import com.expense.expense_management.service.ExpenseService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/expenses")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class ExpenseController {

    private final ExpenseService expenseService;

    @PostMapping
    public ExpenseResponse saveExpense(@RequestBody ExpenseRequest request) {
        return expenseService.saveExpense(request);
    }

    @GetMapping("/employee/{id}")
    public List<ExpenseResponse> getEmployeeExpenses(@PathVariable Long id) {
        return expenseService.getEmployeeExpenses(id);
    }

    @GetMapping
    public List<ExpenseResponse> getAllExpenses() {
        return expenseService.getAllExpenses();
    }
}