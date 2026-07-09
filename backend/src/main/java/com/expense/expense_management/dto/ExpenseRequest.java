package com.expense.expense_management.dto;

import com.expense.expense_management.entity.enums.ExpenseCategory;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;

@Data
public class ExpenseRequest {

    private Long employeeId;

    private ExpenseCategory category;

    private BigDecimal amount;

    private String description;

    private LocalDate expenseDate;
}