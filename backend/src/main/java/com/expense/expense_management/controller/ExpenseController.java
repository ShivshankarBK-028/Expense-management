package com.expense.expense_management.controller;

import com.expense.expense_management.dto.ExpenseRequest;
import com.expense.expense_management.dto.ExpenseResponse;
import com.expense.expense_management.service.ExpenseService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.MediaType;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/expenses")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class ExpenseController {

    private final ExpenseService expenseService;

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ExpenseResponse saveExpense(
            @RequestParam Long employeeId,
            @RequestParam String category,
            @RequestParam String amount,
            @RequestParam String description,
            @RequestParam String expenseDate,
            @RequestParam MultipartFile receipt
    ) {

        ExpenseRequest request = new ExpenseRequest();

        request.setEmployeeId(employeeId);
        request.setCategory(com.expense.expense_management.entity.enums.ExpenseCategory.valueOf(category));
        request.setAmount(new java.math.BigDecimal(amount));
        request.setDescription(description);
        request.setExpenseDate(java.time.LocalDate.parse(expenseDate));

        return expenseService.saveExpense(request, receipt);
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