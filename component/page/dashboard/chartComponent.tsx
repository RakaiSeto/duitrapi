'use client';

import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    BarElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar, Line } from 'react-chartjs-2';
import { useTheme } from '@/utils/ThemeProvider';

ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend);

export default function ChartComponent() {
    // get foreground color from theme
    const { theme } = useTheme();
    let foreground = '#000000';
    let grid = 'rgba(0, 0, 0, 0.2)';
    if (theme === 'dark') {
        foreground = '#FFFFFF';
        grid = 'rgba(255, 255, 255, 0.2)';
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

    const data1 = {
        labels: labels,
        datasets: [
            {
                label: 'In Transaction',
                data: values2,
                borderColor: '#0fba09',
                backgroundColor: '#0fba09',
                tension: 0,
                hidden: true
            },
            {
                label: 'Out Transaction',
                data: values1,
                borderColor: '#f72f2f',
                backgroundColor: '#f72f2f',
                tension: 0,
            },
        ],
    };

    const options1 = {
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
                    color: `${grid}`,
                },
                ticks: {
                    color: `${foreground}`,
                },
            },
            y: {
                // Set the symmetrical min and max
                min: 0,
                max: absMax,

                // Style the grid lines
                grid: {
                    // Use a function to set a different color for the zero line
                    color: (context: any) => {
                        if (context.tick.value === 0) {
                            return foreground; // Bolder color for the zero line
                        }
                        return `${grid}`; // Regular grid line color
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

    const options2 = {
        plugins: {
            legend: {
                position: 'top' as const,
                labels: {
                    color: `${foreground}`,
                },
            },
            title: {
                display: true,
                text: 'Daily Transaction Value (Rp)',
                color: `${foreground}`,
            },
        },
        responsive: true,
        interaction: {
            mode: 'index' as const,
            intersect: false,
        },
        scales: {
            x: {
                stacked: true,
                grid: {
                    color: `${grid}`,
                },
                ticks: {
                    color: `${foreground}`,
                },
            },
            y: {
                max: absMax,
                stacked: true,
                // Style the grid lines
                grid: {
                    // Use a function to set a different color for the zero line
                    color: (context: any) => {
                        if (context.tick.value === 0) {
                            return foreground; // Bolder color for the zero line
                        }
                        return `${grid}`; // Regular grid line color
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

    const data2 = {
        labels,
        datasets: [
            {
                label: 'Inflow',
                data: values2,
                borderColor: '#0fba09',
                backgroundColor: '#0fba09',
                stack: 'Stack 1',
                hidden: true
            },
            {
                label: 'Outflow',
                data: values1,
                borderColor: '#f72f2f',
                backgroundColor: '#f72f2f',
                stack: 'Stack 0',
            }
        ],
    };

    return (
        <div className="grid-cols-1 xl:grid-cols-2 gap-4 hidden md:grid">
            <div className="bg-[#f0f0f0] dark:bg-[#1f2a47] p-4 rounded-lg w-full flex justify-center my-2">
                <Line options={options1} data={data1} />
            </div>
            <div className="bg-[#f0f0f0] dark:bg-[#1f2a47] p-4 rounded-lg w-full flex justify-center my-2">
                <Bar options={options2} data={data2} />
            </div>
        </div>
    );
}
