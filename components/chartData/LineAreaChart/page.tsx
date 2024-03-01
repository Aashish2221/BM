/* eslint-disable react/jsx-no-undef */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { Suspense, useEffect, useState } from 'react';
import dayjs from 'dayjs';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
  ScriptableContext
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { chartData } from '@/interfaces/typeinterfaces';
import { getChartData } from '@/services/spot-prices';
import { useSelector } from 'react-redux';
import { selectUser } from '@/features/userSlice';
import { toCurrency, toPercent } from '@/utils/utilities';
import { MdArrowDropDown, MdArrowDropUp } from 'react-icons/md';
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

type metalProps = {
  metal: string;
  currentSpotPrice: chartData;
  initialchartData: chartData[];
  initfrom: string;
  initto: string;
  initchange: number;
  initHigh: number;
  initlow: number;
};
const LineAreaChart = ({
  metal,
  currentSpotPrice,
  initialchartData,
  initfrom,
  initto,
  initchange,
  initHigh,
  initlow
}: metalProps) => {
  const [chartdata, setChartData] = useState(initialchartData);
  const [Number, setNumber] = useState(3);
  const [TimeFrame, setTimeFrame] = useState('month');
  const [size, setSize] = useState<number | undefined>(20); 
  const [initialdata, setInitialData] = useState(true);
  // const [from, setFrom] = useState(initfrom);
  // const [to, setTo] = useState(initto);
  // const [high, setHigh] = useState(initHigh);
  // const [low, setLow] = useState(initlow);
  const select = useSelector(selectUser)
//   const getDateDifferenceFromWeek = (weeks: number) => {
//     const currentDate = new Date();
//     const startDate = new Date(currentDate.getTime() - weeks * 7 * 24*  60*  60 * 1000);
//     return { startDate };
//   }
//   const getDateDifferenceFromMonth = (months: number) => {
//     const currentDate = new Date();
//     const startDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - months, currentDate.getDate());
//     return { startDate, currentDate};
//   }
//   const getDateDifferenceFromYear = (years: number) => {
//     const currentDate = new Date();
//     const startDate = new Date(currentDate.getFullYear() - years, currentDate.getMonth(), currentDate.getDate());
//     return { startDate };
// }
  useEffect(() => {
    initFetch(Number, TimeFrame);
    // metal === 'Silver'
    //   ? setHigh(Math.max(...chartdata.map((x) => x.silver)))
    //   : setHigh(Math.max(...chartdata.map((x) => x.gold)));
    // metal === 'Silver'
    //   ? setLow(Math.min(...chartdata.map((x) => x.silver)))
    //   : setLow(Math.min(...chartdata.map((x) => x.gold)));

    // if (TimeFrame === 'week') {
    //   let dateDifference = getDateDifferenceFromWeek(Number);
    //   const options: any = { month: '2-digit', day: '2-digit', year: 'numeric' };
    //   let date = dateDifference.startDate.toLocaleDateString('en-US', options);
    //   setFrom(date)
    // }
    // else if (TimeFrame === 'month') {
    //   let dateDifferenceMonth = getDateDifferenceFromMonth(Number);
    //   const options: any = { month: '2-digit', day: '2-digit', year: 'numeric' };
    //   const date = dateDifferenceMonth.startDate.toLocaleDateString('en-US', options);
    //   setFrom(date);
    //   const curreDate = dateDifferenceMonth.currentDate.toLocaleDateString('en-US', options);
    //   setTo(curreDate);
    // }
    // else if(TimeFrame === 'year'){
    //   let dateDifferenceYear = getDateDifferenceFromYear(Number);
    //   const options: any = { month: '2-digit', day: '2-digit', year: 'numeric' };
    //   const date = dateDifferenceYear.startDate.toLocaleDateString('en-US', options);
    //   setFrom(date);
    // }
    // else {
    //    setFrom(chartdata.map((x) => x.dateNTime.replaceAll(' 00:00:00', ''))[0]);
    // }
  }, [metal, Number, TimeFrame]);

  const initFetch = async (Number: number, TimeFrame: string) => {
    setNumber(Number);
    setTimeFrame(TimeFrame);
    const response = await getChartData(Number, TimeFrame, false);
    const allreponse = [...response.data, currentSpotPrice];
    // const allreponse = [...response.data];
    setChartData(allreponse);
  };
  
  console.log(currentSpotPrice)
  console.log(chartdata)
  return (
    <div className='sm:m-2 mt-2 flex h-fit flex-col items-center justify-center rounded-xl bg-gray-100 shadow-lg w-full'>
      <div className='mt-2 flex w-full flex-col justify-start text-[15px] font-semibold text-dark-black md:flex-row md:justify-between lg:text-[20px]'>
        <h2 className='flex w-full items-start px-1 py-1 text-start'>
          {metal} Spot Price Chart
        </h2>
        <ul className='flex h-fit w-full flex-row items-start justify-start gap-1 px-1 py-1 text-sm text-gray-700 md:items-end md:justify-end'>
          <li
            onClick={() => {
              initFetch(1, 'week'), setInitialData(false),setSize(7);
            }}
          >
            <button className={`relative block rounded-[30%] ${(TimeFrame==='week'&&Number===1)?('bg-primary'):('bg-gray-300')} px-1 sm:px-2 py-1 sm:py-2`}>
              1W
            </button>
          </li>
          <li
            onClick={() => {
              initFetch(2, 'week'), setInitialData(false),setSize(14);
            }}
          >
            <button className={`relative block rounded-[30%] ${(TimeFrame==='week'&&Number===2)?('bg-primary'):('bg-gray-300')} px-1 sm:px-2 py-1 sm:py-2`}>
              2W
            </button>
          </li>
          <li
            onClick={() => {
              initFetch(1, 'month'), setInitialData(false),setSize(15);
            }}
          >
            <button className={`relative block rounded-[30%] ${(TimeFrame==='month'&&Number===1)?('bg-primary'):('bg-gray-300')} px-1 sm:px-2 py-1 sm:py-2`}>
              1M
            </button>
          </li>
          <li
            onClick={() => {
              initFetch(3, 'month'), setInitialData(false),setSize(18);
            }}
          >
          <button
          className={`relative block rounded-[30%] ${(TimeFrame==='month'&&Number===3)?('bg-primary'):('bg-gray-300')} px-1 sm:px-2 py-1 sm:py-2`}>
              3M
          </button>

          </li>
          <li
            onClick={() => {
              initFetch(6, 'month'), setInitialData(false),setSize(16);
            }}
          >
            <button className={`relative block rounded-[30%] ${(TimeFrame==='month'&&Number===6)?('bg-primary'):('bg-gray-300')} px-1 sm:px-2 py-1 sm:py-2`}>
              6M
            </button>
          </li>
          <li
            onClick={() => {
              initFetch(1, '1-Year'), setInitialData(false);
            }}
          >
            <button className={`relative block rounded-[30%] ${(TimeFrame==='1-Year'&&Number===1)?('bg-primary'):('bg-gray-300')} px-1 sm:px-2 py-1 sm:py-2`}>
              1Y
            </button>
          </li>
          <li
            onClick={() => {
              initFetch(5, 'year'), setInitialData(false);
            }}
          >
            <button className={`relative block rounded-[30%] ${(TimeFrame==='year'&&Number===5)?('bg-primary'):('bg-gray-300')} px-1 sm:px-2 py-1 sm:py-2`}>
              5Y
            </button>
          </li>
          <li
            onClick={() => {
              initFetch(10, 'year'), setInitialData(false);
            }}
          >
            <button className={`relative block rounded-[30%] ${(TimeFrame==='year'&&Number===10)?('bg-primary'):('bg-gray-300')} px-1 sm:px-2 py-1 sm:py-2`}>
              10Y
            </button>
          </li>
          <li
            onClick={() => {
              initFetch(0, 'All'), setInitialData(false);
            }}
          >
            <button className={`relative block rounded-[30%] ${(TimeFrame==='All'&&Number===0)?('bg-primary'):('bg-gray-300')} px-1 sm:px-2 py-1 sm:py-2`}>
              All
            </button>
          </li>
        </ul>
      </div>
      <div className='flex w-full flex-col items-start justify-between px-1 py-1 md:-mt-5'>
        <div className='flex flex-row items-center justify-start gap-5'>
          <span className='text-lg font-semibold text-primary'>
            USD $
            {metal === 'Silver'
              ? currentSpotPrice?.silver
              : currentSpotPrice?.gold}
          </span>
          <div className="flex items-center">
            {initchange < 0 ? (
              <MdArrowDropDown size={24} fill="#FF2A2A" />
            ) : (
              <MdArrowDropUp size={24} fill="#27D24A" />
            )}
            <span className={`text-sm font-semibold ${initchange < 0 ? "text-red-600" : "text-green-600"}`}>
              {Math.abs(initchange)}
            </span>
          </div>
        </div>
        <div className='items-between flex w-full flex-col justify-between  gap-2 md:flex-row'>
          <div className='flex flex-row items-start justify-start gap-2 lg:gap-8'>
            <span className='text-sm font-medium text-gray-700'>
              Bid ${select.spotPrices && metal === 'Silver' ? (select.spotPrices.silverBid || 'N/A') : (select.spotPrices && select.spotPrices.goldBid || 'N/A')}
            </span>


            <span className='text-sm font-medium text-gray-700'>
              Ask ${select.spotPrices && metal === 'Silver' ? (select.spotPrices.silver || 'N/A') : (select.spotPrices && select.spotPrices.gold || 'N/A')}
            </span>

            <div className='text-sm font-medium text-gray-700 flex gap-1 items-center text-center fix'>
              Change Percent
              <span className={`flex items-center space-x-1 ${metal === "Silver" ? (select.spotPrices.silverChangePercent >= 0 ? 'text-green-600' : 'text-red-600') : (select.spotPrices.goldChangePercent >= 0 ? 'text-green-600' : 'text-red-600')}`}>
                {metal === "Silver" ?
                  (select.spotPrices.silverChangePercent > 0 ? <MdArrowDropUp size={16} fill="#27D24A" /> : <MdArrowDropDown size={16} fill="#FF2A2A" />)
                  :
                  (select.spotPrices.goldChangePercent > 0 ? <MdArrowDropUp size={16} fill="#27D24A" /> : <MdArrowDropDown size={16} fill="#FF2A2A" />)
                }
                {toPercent(metal === "Silver" ? Math.abs(select.spotPrices.silverChangePercent) : Math.abs(select.spotPrices.goldChangePercent))}%
              </span>
            </div>


          </div>
          <div className='flex flex-row items-end justify-end gap-2 whitespace-normal text-sm font-medium'>
            From{' '}
            <span className='relative bg-gray-300 text-gray-700'>
              {chartdata[0].dateNTime.slice(0,10)}
            </span>
            To{' '}
            <span className='relative bg-gray-300 text-gray-700'>
              {currentSpotPrice.dateNTime}
            </span>
          </div>
        </div>
      </div>
      <div className='flex h-fit w-full items-start justify-start px-1 py-1'>
        <Suspense
          fallback={
            <section className='h-[200px] items-start bg-gray-100 w-full sm:w-[350px] md:h-[300px] 2xl:w-[1050px]'></section>
          }
        >
          <Line
            className='h-[200px] items-start bg-gray-100 sm:w-[700px] md:h-[300px] 2xl:w-[1050px]'
            data={{
              labels:
                TimeFrame == 'week' ||
                  TimeFrame == 'month' ||
                  (TimeFrame === 'year' && Number === 1)
                  ? chartdata
                    .filter((x) => x.dateNTime)
                    .map((x) => dayjs(x.dateNTime.slice(0,10)).format('D MMM'))
                  : chartdata
                    .filter((x) => x.dateNTime)
                    .map((x) => x.dateNTime.slice(0,10)),
              datasets: [
                {
                  label: `${metal} Spot Prices`,
                  fill: true,
                  pointRadius: 0,
                  backgroundColor: (context: ScriptableContext<'line'>) => {
                    const ctx = context.chart.ctx;
                    const gradient = ctx.createLinearGradient(0, 0, 0, 400);
                    gradient.addColorStop(0, 'rgb(255, 175, 71,1)');
                    gradient.addColorStop(1, 'rgb(255, 175, 71,0)');
                    return gradient;
                  },
                  borderColor: 'rgb(255, 175, 71)',
                  borderWidth: 2,
                  data:
                    metal === 'Silver'
                      ? chartdata.filter((x) => x.silver).map((x) => x.silver)
                      : chartdata.filter((x) => x.gold).map((x) => x.gold)
                }
              ]
            }}
            options={{
              maintainAspectRatio: false,
              responsive: true,
              plugins: {
                tooltip: {
                  mode: 'index',
                  intersect: false
                }
              },
              hover: {
                mode: 'nearest',
                intersect: true
              },
              scales: {
                x: {
                  grid: {
                    display: false
                  },
                  ticks: {
                    color: 'black',
                    maxTicksLimit: size,
                    padding: 1,
                    font: {
                      size: 10
                    }
                  }
                },
                y: {
                  grid: {
                    display: true
                  },
                  ticks: {
                    color: 'black',
                    padding: 1,
                    font: {
                      size: 10
                    }
                  }
                }
              }
            }}
          />
        </Suspense>
      </div>
    </div>
  );
};
export default LineAreaChart;
