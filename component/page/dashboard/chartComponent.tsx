'use client';

import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { useTheme } from '@/utils/ThemeProvider';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function ChartComponent() {
    // get foreground color from theme
    const { theme } = useTheme();
    let foreground = '#000000';
    if (theme === 'dark') {
        foreground = '#FFFFFF';
    }

    // get last 7 day in gmt+7
    const last7DaysData = Array.from({ length: 7 }, (_, i) => {
        const date = new Date();
        date.setDate(date.getDate() - i);
        return {
            date: date,
            value1: Math.floor(Math.random() * 10),
            value2: Math.floor(Math.random() * 10),
        };
    }).reverse();

    // Correctly format the data for Chart.js
    const labels = last7DaysData.map((d) => d.date.toLocaleDateString('en-US', { day: 'numeric', month: 'short' }));
    const values1 = last7DaysData.map((d) => d.value1);
    const values2 = last7DaysData.map((d) => d.value2);
    const values3 = last7DaysData.map((d) => d.value1 - d.value2);

    const allValues = [...values1, ...values2, ...values3];
    let absMax = Math.max(...allValues.map(Math.abs));

    if (absMax % 2 !== 0) {
        absMax += 1;
    }

    const data = {
        labels: labels,
        datasets: [
            {
                label: 'Out Transaction',
                data: values1,
                borderColor: '#f72f2f',
                backgroundColor: '#f72f2f',
                tension: 0,
            },
            {
                label: 'In Transaction',
                data: values2,
                borderColor: '#0fba09',
                backgroundColor: '#0fba09',
                tension: 0,
            },
            {
                label: 'Net Transaction',
                data: values3,
                borderColor: '#ff7a0d',
                backgroundColor: '#ff7a0d',
                tension: 0,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
                labels: {
                    color: `${foreground}`,
                },
            },
            title: {
                display: true,
                text: 'Daily Transaction Count',
                color: `${foreground}`,
            },
        },
        scales: {
            x: {
                // Correctly set the grid and text color for the x-axis
                grid: {
                    color: 'rgba(255, 255, 255, 0.2)',
                },
                ticks: {
                    color: `${foreground}`,
                },
            },
            y: {
                // Set the symmetrical min and max
                min: -absMax,
                max: absMax,

                // Style the grid lines
                grid: {
                    // Use a function to set a different color for the zero line
                    color: (context: any) => {
                        if (context.tick.value === 0) {
                            return foreground; // Bolder color for the zero line
                        }
                        return 'rgba(255, 255, 255, 0.2)'; // Regular grid line color
                    },
                    // You can also set different line widths
                    lineWidth: (context: any) => {
                        if (context.tick.value === 0) {
                            return 2; // Make the zero line thicker
                        }
                        return 1; // Regular line thickness
                    },
                },
                ticks: {
                    color: foreground,
                },
            },
        },
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white dark:bg-[#091636d9] p-4 rounded-lg w-full">
                <Line options={options} data={data} />
            </div>
            <div className="bg-white dark:bg-[#091636d9] p-4 rounded-lg w-full">
                <Line options={options} data={data} />
            </div>
            <div className="bg-white dark:bg-[#091636d9] p-4 rounded-lg w-full">
                <Line options={options} data={data} />
            </div>
            <div className="bg-white dark:bg-[#091636d9] p-4 rounded-lg w-full">
                <Line options={options} data={data} />
            </div>
        </div>
    );
}
