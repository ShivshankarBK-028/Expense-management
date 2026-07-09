package com.expense.expense_management.dto;

import com.expense.expense_management.entity.enums.ExpenseCategory;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;

@Data
@AllArgsConstructor
public class ExpenseResponse {

    private Long id;

    private ExpenseCategory category;

    private BigDecimal amount;

    private String description;

    private LocalDate expenseDate;

    private String employeeName;

    private String receiptFileName;
}