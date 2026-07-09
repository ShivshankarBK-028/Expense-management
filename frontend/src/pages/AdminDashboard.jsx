import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend,
    ResponsiveContainer
} from "recharts";

function AdminDashboard() {

    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem("user"));

    const [expenses, setExpenses] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const loadExpenses = async () => {

            try {

                const response = await api.get("/api/expenses");

                setExpenses(response.data);

            } catch (error) {

                console.error(error);

            } finally {

                setLoading(false);

            }

        };

        loadExpenses();

    }, []);

    const logout = () => {

        localStorage.removeItem("user");
        navigate("/");

    };

    const totalExpense = expenses.reduce(
        (sum, expense) => sum + Number(expense.amount),
        0
    );

    if (loading) {
        return (
            <div className="container mt-5 text-center">
                <h3>Loading...</h3>
            </div>
        );
    }

    const totalEmployees = new Set(
        expenses.map(expense => expense.employeeName)
    ).size;

    const totalExpenseRecords = expenses.length;

    const categoryData = Object.values(

        expenses.reduce((acc, expense) => {

            if (!acc[expense.category]) {

                acc[expense.category] = {
                    name: expense.category,
                    value: 0
                };

            }

            acc[expense.category].value += Number(expense.amount);

            return acc;

        }, {})

    );

    const COLORS = [
        "#0088FE",
        "#00C49F",
        "#FFBB28",
        "#FF8042",
        "#AF19FF",
        "#FF4560"
    ];

    return (

        <div className="container mt-4">

            <div className="d-flex justify-content-between align-items-center mb-4">

                <div>

                    <h2>Welcome, {user.name}</h2>

                    <p className="text-muted">
                        Administrator Dashboard
                    </p>

                </div>

                <button
                    className="btn btn-danger"
                    onClick={logout}
                >
                    Logout
                </button>

            </div>

            {/* KPI Cards */}

            <div className="row mb-4">

                <div className="col-md-4 mb-3">

                    <div className="card text-center shadow border-primary">

                        <div className="card-body">

                            <h6>Total Expenses</h6>

                            <h3 className="text-primary">
                                ₹{totalExpense.toFixed(2)}
                            </h3>

                        </div>

                    </div>

                </div>

                <div className="col-md-4 mb-3">

                    <div className="card text-center shadow border-success">

                        <div className="card-body">

                            <h6>Total Employees</h6>

                            <h3 className="text-success">
                                {totalEmployees}
                            </h3>

                        </div>

                    </div>

                </div>

                <div className="col-md-4 mb-3">

                    <div className="card text-center shadow border-warning">

                        <div className="card-body">

                            <h6>Expense Records</h6>

                            <h3 className="text-warning">
                                {totalExpenseRecords}
                            </h3>

                        </div>

                    </div>

                </div>

            </div>

            {/* Pie Chart */}

            <div className="row mb-4">

                <div className="col-lg-6 mx-auto">

                    <div className="card shadow">

                        <div className="card-header text-center">

                            <h5>Expense Distribution by Category</h5>

                        </div>

                        <div className="card-body">

                            <ResponsiveContainer width="100%" height={320}>

                                <PieChart>

                                    <Pie
                                        data={categoryData}
                                        dataKey="value"
                                        nameKey="name"
                                        outerRadius={110}
                                        label
                                    >

                                        {

                                            categoryData.map((entry, index) => (

                                                <Cell
                                                    key={index}
                                                    fill={COLORS[index % COLORS.length]}
                                                />

                                            ))

                                        }

                                    </Pie>

                                    <Tooltip />

                                    <Legend />

                                </PieChart>

                            </ResponsiveContainer>

                        </div>

                    </div>

                </div>

            </div>

            {/* Expense Table */}

            <div className="card shadow">

                <div className="card-header">

                    <h3 className="text-center">
                        All Employee Expenses
                    </h3>

                </div>

                <div className="card-body">

                    <table className="table table-striped table-hover">

                        <thead className="table-dark">

                            <tr>

                                <th>Employee</th>
                                <th>Category</th>
                                <th>Amount</th>
                                <th>Description</th>
                                <th>Date</th>
                                <th>Receipt</th>

                            </tr>

                        </thead>

                        <tbody>

                            {

                                expenses.length === 0 ?

                                    <tr>

                                        <td
                                            colSpan="6"
                                            className="text-center"
                                        >
                                            No expenses found.
                                        </td>

                                    </tr>

                                    :

                                    expenses.map((expense) => (

                                        <tr key={expense.id}>

                                            <td>{expense.employeeName}</td>

                                            <td>{expense.category}</td>

                                            <td>
                                                ₹{Number(expense.amount).toFixed(2)}
                                            </td>

                                            <td>{expense.description}</td>

                                            <td>{expense.expenseDate}</td>

                                            <td>

                                                {expense.receiptFileName ? (

                                                    <a
                                                        href={`http://localhost:8080/uploads/${expense.receiptFileName}`}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="btn btn-sm btn-primary"
                                                    >
                                                        View
                                                    </a>

                                                ) : (

                                                    <span className="text-muted">
                                                        No Receipt
                                                    </span>

                                                )}

                                            </td>

                                        </tr>

                                    ))

                            }

                        </tbody>

                    </table>

                </div>

                <div className="card-footer">

                    <h5 className="mb-0">

                        Total Expenses : ₹{totalExpense.toFixed(2)}

                    </h5>

                </div>

            </div>

        </div>

    );

}

export default AdminDashboard;