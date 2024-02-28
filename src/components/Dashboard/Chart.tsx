import 'chartjs-adapter-date-fns';
import { enUS } from 'date-fns/locale';
import React, { useEffect } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, TimeScale } from 'chart.js';
import { Line } from 'react-chartjs-2';
import { ChartOptions } from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    TimeScale
);
ChartJS.defaults.color = 'white';

interface IData {
    created_on: string;
}

export default function Chart({ labelName, dataSet }: { labelName: string, dataSet: IData[] }) {

    const options: ChartOptions<'line'> = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
            },
            title: {
                display: false,
            },
        },
        scales: {
            x: {
                type: 'time',
                time: {
                    unit: 'day',
                    displayFormats: {
                        day: 'dd MMM'
                    },
                    tooltipFormat: 'dd MMM yyyy'
                },
                adapters: {
                    date: {
                        locale: enUS,
                    },
                },
            },
            y: {
                beginAtZero: true,
            }
        }
    };
    

    const getAllDaysOfMonth = (year: number, month: number): string[] => {
        const numDays = new Date(year, month + 1, 0).getDate();
        const daysArray = [];
        for (let day = 1; day <= numDays; day++) {
            daysArray.push(`${year}-${month + 1 < 10 ? '0' : ''}${month + 1}-${day < 10 ? '0' : ''}${day}`);
        }
        return daysArray;
    };

    const getLabelsArrayFromDataSet = () => {
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();
        const currentMonth = currentDate.getMonth();
        return getAllDaysOfMonth(currentYear, currentMonth);
    };

    const convertDataToDataSetAndReturnArrayOfObjects = () => {
        return getLabelsArrayFromDataSet().map((date) => {
            const count = dataSet.filter(data => data.created_on.startsWith(date)).length;
            return count;
        });
    };

    const data = {
        labels: getLabelsArrayFromDataSet(),
        datasets: [
            {
                label: labelName,
                data: convertDataToDataSetAndReturnArrayOfObjects(),
                borderColor: 'black',
                backgroundColor: 'grey',
            },
        ],
    };

    return <Line options={options} data={data} />;
}
