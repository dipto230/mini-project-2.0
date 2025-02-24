import React, { useContext, useState } from "react";
import axios from "axios";

const BASE_URL = "http://localhost:3000/api/v1/";
const GlobalContext = React.createContext();

export const GlobalProvider = ({ children }) => {
    const [incomes, setIncomes] = useState([]);
    const [expenses, setExpenses] = useState([]);
    const [error, setError] = useState(null);

    // Add Income
    const addIncome = async (income) => {
        try {
            await axios.post(`${BASE_URL}add-income`, income);
            getIncomes(); // Fetch updated incomes
        } catch (err) {
            console.error("Error adding income:", err);
            setError(err.response?.data?.message || "Something went wrong");
        }
    };

    // Get Incomes
    const getIncomes = async () => {
        try {
            const response = await axios.get(`${BASE_URL}get-incomes`);
            setIncomes(response.data || []);
        } catch (error) {
            console.error("Error fetching incomes:", error);
            setError("Failed to fetch incomes");
        }
    };

    // Delete Income
    const deleteIncome = async (id) => {
        try {
            await axios.delete(`${BASE_URL}delete-income/${id}`);
            getIncomes();
        } catch (error) {
            console.error("Error deleting income:", error);
            setError("Failed to delete income");
        }
    };

    // Total Income
    const totalIncome = () => {
        return incomes.reduce((total, income) => total + (income.amount || 0), 0);
    };

    // Add Expense
    const addExpense = async (expense) => {
        try {
            await axios.post(`${BASE_URL}add-expense`, expense);
            getExpenses(); // Fetch updated expenses
        } catch (err) {
            console.error("Error adding expense:", err);
            setError(err.response?.data?.message || "Something went wrong");
        }
    };

    // Get Expenses
    const getExpenses = async () => {
        try {
            const response = await axios.get(`${BASE_URL}get-expenses`);
            setExpenses(response.data || []);
        } catch (error) {
            console.error("Error fetching expenses:", error);
            setError("Failed to fetch expenses");
        }
    };

    // Delete Expense
    const deleteExpense = async (id) => {
        try {
            await axios.delete(`${BASE_URL}delete-expense/${id}`);
            getExpenses();
        } catch (error) {
            console.error("Error deleting expense:", error);
            setError("Failed to delete expense");
        }
    };

    // Total Expenses
    const totalExpenses = () => {
        return expenses.reduce((total, expense) => total + (expense.amount || 0), 0);
    };

    // Total Balance
    const totalBalance = () => {
        return totalIncome() - totalExpenses();
    };

    // Transaction History
    const transactionHistory = () => {
        const history = [...incomes, ...expenses].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        return history.slice(0, 3);
    };

    return (
        <GlobalContext.Provider
            value={{
                addIncome,
                deleteIncome,
                incomes,
                getIncomes,
                totalIncome,
                addExpense,
                getExpenses,
                deleteExpense,
                totalExpenses,
                totalBalance,
                transactionHistory,
                error,
                setError,
            }}
        >
            {children}
        </GlobalContext.Provider>
    );
};

export const useGlobalContext = () => {
    return useContext(GlobalContext);
};
