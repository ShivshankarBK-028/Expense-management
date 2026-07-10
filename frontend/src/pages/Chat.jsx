import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Chat() {

    const navigate = useNavigate();

    const [messages, setMessages] = useState([
        {
            sender: "bot",
            text: "Hello! 👋 Welcome to Expense Support.\nSelect one of the questions below."
        }
    ]);

    const [askedQuestions, setAskedQuestions] = useState([]);

    const faqs = [
        {
            question: "💰 What is my daily expense limit?",
            answer:
                "Daily Expense Limits:\n\n• Grade 1 → ₹300/day\n• Grade 5 → ₹500/day\n• Grade 10 → ₹1000/day"
        },
        {
            question: "📂 Which expense categories are allowed?",
            answer:
                "Available Categories:\n\n• Food\n• Travel\n• Accommodation\n• Office Supplies\n• Medical\n• Other"
        },
        {
            question: "🧾 How do I upload a receipt?",
            answer:
                "1. Go to Add Expense\n2. Fill all expense details\n3. Click 'Choose File'\n4. Select an image or PDF\n5. Click Submit Expense"
        }
    ];

    const handleQuestionClick = (faq) => {

        if (askedQuestions.includes(faq.question)) {
            return;
        }

        setMessages(prev => [
            ...prev,
            {
                sender: "user",
                text: faq.question
            },
            {
                sender: "bot",
                text: faq.answer
            }
        ]);

        setAskedQuestions(prev => [...prev, faq.question]);

    };

    return (

        <div className="container mt-4">

            <div className="d-flex justify-content-between align-items-center mb-3">

                <h2>💬 Expense Support Chat</h2>

                <button
                    className="btn btn-secondary"
                    onClick={() => navigate(-1)}
                >
                    Back
                </button>

            </div>

            <div
                className="card shadow"
                style={{
                    height: "550px"
                }}
            >

                <div className="card-header bg-success text-white">
                    Expense Support
                </div>

                <div
                    className="card-body"
                    style={{
                        overflowY: "auto",
                        background: "#f5f5f5"
                    }}
                >

                    {

                        messages.map((msg, index) => (

                            <div
                                key={index}
                                className={`d-flex mb-3 ${
                                    msg.sender === "user"
                                        ? "justify-content-end"
                                        : "justify-content-start"
                                }`}
                            >

                                <div
                                    className={`p-3 rounded ${
                                        msg.sender === "user"
                                            ? "bg-success text-white"
                                            : "bg-white border"
                                    }`}
                                    style={{
                                        maxWidth: "70%",
                                        whiteSpace: "pre-line"
                                    }}
                                >
                                    {msg.text}
                                </div>

                            </div>

                        ))

                    }

                </div>

                <div className="card-footer">

                    <h6 className="mb-3">
                        Frequently Asked Questions
                    </h6>

                    <div className="d-grid gap-2">

                        {

                            faqs.map((faq, index) => (

                                <button
                                    key={index}
                                    className="btn btn-outline-success text-start"
                                    onClick={() => handleQuestionClick(faq)}
                                    disabled={askedQuestions.includes(faq.question)}
                                >
                                    {
                                        askedQuestions.includes(faq.question)
                                            ? "✓ " + faq.question
                                            : faq.question
                                    }
                                </button>

                            ))

                        }

                    </div>

                </div>

            </div>

        </div>

    );

}

export default Chat;