import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function AddExpense() {

    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem("user"));

    const [formData, setFormData] = useState({
        employeeId: user.id,
        category: "FOOD",
        amount: "",
        description: "",
        expenseDate: ""
    });

    const [message, setMessage] = useState("");
    const [isError, setIsError] = useState(false);
    const [receipt, setReceipt] = useState(null);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const formDataToSend = new FormData();

            formDataToSend.append("employeeId", formData.employeeId);
            formDataToSend.append("category", formData.category);
            formDataToSend.append("amount", formData.amount);
            formDataToSend.append("description", formData.description);
            formDataToSend.append("expenseDate", formData.expenseDate);
            formDataToSend.append("receipt", receipt);

            const response = await api.post(
                "/api/expenses",
                formDataToSend
            );

            console.log(response.data);

            setIsError(false);
            setMessage("Expense added successfully!");

            setTimeout(() => {
                navigate("/dashboard");
            }, 1500);

        } catch (error) {

            console.error(error);

            setIsError(true);

            if (error.response) {
                setMessage(error.response.data);
            } else {
                setMessage("Unable to connect to the backend.");
            }

        }

    };

    return (

        <div className="container mt-5">

            <div
                className="card shadow p-4 mx-auto"
                style={{ maxWidth: "600px" }}
            >

                <h2 className="text-center mb-4">
                    Add Expense
                </h2>

                <form onSubmit={handleSubmit}>

                    <div className="mb-3">

                        <label className="form-label">
                            Category
                        </label>

                        <select
                            className="form-select"
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                        >
                            <option value="FOOD">Food</option>
                            <option value="TRAVEL">Travel</option>
                            <option value="ACCOMMODATION">Accommodation</option>
                            <option value="OFFICE_SUPPLIES">Office Supplies</option>
                            <option value="MEDICAL">Medical</option>
                            <option value="OTHER">Other</option>
                        </select>

                    </div>

                    <div className="mb-3">

                        <label className="form-label">
                            Amount
                        </label>

                        <input
                            type="number"
                            className="form-control"
                            name="amount"
                            value={formData.amount}
                            onChange={handleChange}
                            required
                        />

                    </div>

                    <div className="mb-3">

                        <label className="form-label">
                            Description
                        </label>

                        <textarea
                            className="form-control"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            required
                        />

                    </div>

                    <div className="mb-3">

                        <label className="form-label">
                            Expense Date
                        </label>

                        <input
                            type="date"
                            className="form-control"
                            name="expenseDate"
                            value={formData.expenseDate}
                            onChange={handleChange}
                            required
                        />

                    </div>

                    <div className="mb-3">

                        <label className="form-label">
                            Receipt
                        </label>

                        <input
                            type="file"
                            className="form-control"
                            accept=".jpg,.jpeg,.png,.pdf"
                            onChange={(e) => setReceipt(e.target.files[0])}
                            required
                        />

                    </div>

                    <button
                        type="submit"
                        className="btn btn-primary w-100"
                    >
                        Submit Expense
                    </button>

                </form>

                {message && (

                    <div
                        className={`alert mt-3 ${isError ? "alert-danger" : "alert-success"}`}
                    >
                        {message}
                    </div>

                )}

            </div>

            <button
    className="btn btn-success rounded-circle shadow"
    style={{
        position: "fixed",
        bottom: "25px",
        right: "25px",
        width: "65px",
        height: "65px",
        fontSize: "30px",
        zIndex: 1000
    }}
    onClick={() => navigate("/chat")}
>
    💬
</button>

        </div>

    );

}

export default AddExpense;