import React, { useEffect } from "react";
import styled from "styled-components";
import { useGlobalContext } from "../../context/globalContext";
import History from "../../Histroy/Histroy";
import { InnerLayout } from "../../styles/Layouts";
import { dollar } from "../../utils/Icons";
import Chart from "../../Chart/Chart";

function Dashboard() {
    const {
        totalExpenses,
        incomes = [], // ✅ Default empty array to prevent errors
        expenses = [],
        totalIncome,
        totalBalance,
        getIncomes,
        getExpenses,
    } = useGlobalContext();

    useEffect(() => {
        getIncomes();
        getExpenses();
    }, []);

    // ✅ Handle loading state properly
    if (incomes.length === 0 && expenses.length === 0) {
        return <div>Loading...</div>;
    }

    return (
        <DashboardStyled>
            <InnerLayout>
                <h1>All Transactions</h1>
                <div className="stats-con">
                    <div className="chart-con">
                        <Chart />
                        <div className="amount-con">
                            <div className="income">
                                <h2>Total Income</h2>
                                <p>
                                    {dollar} {totalIncome()}
                                </p>
                            </div>
                            <div className="expense">
                                <h2>Total Expense</h2>
                                <p>
                                    {dollar} {totalExpenses()}
                                </p>
                            </div>
                            <div className="balance">
                                <h2>Total Balance</h2>
                                <p>
                                    {dollar} {totalBalance()}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="history-con">
                        <History />
                        <h2 className="salary-title">
                            Min <span>Salary</span> Max
                        </h2>
                        <div className="salary-item">
                            <p>
                                ${incomes.length > 0 ? Math.min(...incomes.map((item) => item.amount)) : 0}
                            </p>
                            <p>
                                ${incomes.length > 0 ? Math.max(...incomes.map((item) => item.amount)) : 0}
                            </p>
                        </div>
                        <h2 className="salary-title">
                            Min <span>Expense</span> Max
                        </h2>
                        <div className="salary-item">
                            <p>
                                ${expenses.length > 0 ? Math.min(...expenses.map((item) => item.amount)) : 0}
                            </p>
                            <p>
                                ${expenses.length > 0 ? Math.max(...expenses.map((item) => item.amount)) : 0}
                            </p>
                        </div>
                    </div>
                </div>
            </InnerLayout>
        </DashboardStyled>
    );
}

const DashboardStyled = styled.div`
    .stats-con {
        display: grid;
        grid-template-columns: repeat(5, 1fr);
        gap: 2rem;
        .chart-con {
            grid-column: 1 / 4;
            height: 400px;
            .amount-con {
                display: grid;
                grid-template-columns: repeat(4, 1fr);
                gap: 2rem;
                margin-top: 2rem;
                .income, .expense, .balance {
                    background: #FCF6F9;
                    border: 2px solid #FFFFFF;
                    box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
                    border-radius: 20px;
                    padding: 1rem;
                    p {
                        font-size: 3.5rem;
                        font-weight: 700;
                    }
                }
            }
        }
    }
`;

export default Dashboard;
