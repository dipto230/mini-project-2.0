import React from 'react'
import { Chart as ChartJs, 
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
} from 'chart.js'

import { Line } from 'react-chartjs-2'
import styled from 'styled-components'
import { useGlobalContext } from '../../src/context/globalContext'
import { dateFormat } from '../utils/dateFormat/dateFormat'

ChartJs.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
)

function Chart() {
    const { incomes = [], expenses = [] } = useGlobalContext(); // ✅ Default to empty array

    // ✅ Handle empty data state
    if (!Array.isArray(incomes) || !Array.isArray(expenses)) {
        return <div>Loading chart data...</div>;
    }

    const incomeLabels = incomes.length > 0 ? incomes.map((inc) => dateFormat(inc.date)) : [];
    const expenseLabels = expenses.length > 0 ? expenses.map((exp) => dateFormat(exp.date)) : [];

    const incomeData = incomes.length > 0 ? incomes.map((income) => income.amount) : [];
    const expenseData = expenses.length > 0 ? expenses.map((expense) => expense.amount) : [];

    const data = {
        labels: [...new Set([...incomeLabels, ...expenseLabels])], // ✅ Ensure unique labels
        datasets: [
            {
                label: 'Income',
                data: incomeData,
                backgroundColor: 'green',
                tension: 0.2,
            },
            {
                label: 'Expenses',
                data: expenseData,
                backgroundColor: 'red',
                tension: 0.2,
            }
        ]
    };

    return (
        <ChartStyled>
            {incomeData.length === 0 && expenseData.length === 0 ? (
                <div>No data available</div> // ✅ Display message when no data
            ) : (
                <Line data={data} />
            )}
        </ChartStyled>
    )
}

const ChartStyled = styled.div`
    background: #FCF6F9;
    border: 2px solid #FFFFFF;
    box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
    padding: 1rem;
    border-radius: 20px;
    height: 100%;
`;

export default Chart;
