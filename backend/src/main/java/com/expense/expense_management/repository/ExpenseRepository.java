package com.expense.expense_management.repository;

import com.expense.expense_management.entity.Employee;
import com.expense.expense_management.entity.Expense;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ExpenseRepository extends JpaRepository<Expense, Long> {

    List<Expense> findByEmployee(Employee employee);

}