import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function EmployeeDashboard() {

    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem("user"));

    const [expenses, setExpenses] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const loadExpenses = async () => {

            try {

                const response = await api.get(
                    `/api/expenses/employee/${user.id}`
                );

                setExpenses(response.data);

            } catch (error) {

                console.error("Error fetching expenses:", error);

            } finally {

                setLoading(false);

            }

        };

        if (user) {
            loadExpenses();
        }

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
                <h4>Loading...</h4>
            </div>
        );
    }

    return (

        <div className="container mt-4">

            <div className="d-flex justify-content-between align-items-center mb-4">

                <div>
                    <h2>Welcome, {user.name}</h2>
                    <p className="text-muted">
                        Grade {user.grade}
                    </p>
                </div>

                <div>

                    <button
                        className="btn btn-success me-2"
                        onClick={() => navigate("/add-expense")}
                    >
                        Add Expense
                    </button>

                    <button
                        className="btn btn-danger"
                        onClick={logout}
                    >
                        Logout
                    </button>

                </div>

            </div>

            <div className="card shadow">

                <div className="card-header">
                    <h4>Your Expenses</h4>
                </div>

                <div className="card-body">

                    <table className="table table-striped">

                        <thead>

                            <tr>
                                <th>Category</th>
                                <th>Amount</th>
                                <th>Description</th>
                                <th>Date</th>
                                <th>Receipt</th>
                            </tr>

                        </thead>

                        <tbody>

                            {expenses.length === 0 ? (

                                <tr>

                                    <td colSpan="5" className="text-center">
                                        No expenses found.
                                    </td>

                                </tr>

                            ) : (

                                expenses.map((expense) => (

                                    <tr key={expense.id}>

                                        <td>{expense.category}</td>
                                        <td>₹{expense.amount}</td>
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

                            )}

                        </tbody>

                    </table>

                </div>

                <div className="card-footer">

                    <h5>
                        Total Expenses: ₹{totalExpense.toFixed(2)}
                    </h5>

                </div>

            </div>

        </div>

    );

}

export default EmployeeDashboard;