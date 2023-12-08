import React, { useEffect, useState } from "react";
import { FcMoneyTransfer } from "react-icons/fc";

import { useDispatch } from "react-redux";
import { decrement } from "../app/features/counter";
import { Chart as ChartJS,Tooltip,Legend,ArcElement,BarElement,Title,CategoryScale,LinearScale } from "chart.js";
import { Bar, Doughnut } from 'react-chartjs-2';
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";


const Dashboard = () => {
  let initialExpenseData;
  let storedExpenseData
  try {
    initialExpenseData = localStorage.getItem("expensesData");
    storedExpenseData = initialExpenseData ? JSON.parse(initialExpenseData) : [];
  } catch (error) {
    // Handle any potential errors here
    console.error("Error accessing or parsing localStorage:", error);
    storedExpenseData = []; // Set a default value in case of an error
  }
  let initialOrderData = localStorage.getItem("ordersData")
  let storedOrderData = initialExpenseData ? JSON.parse(initialOrderData) : []
  
  
  
  const [expenseData,setExpenseData] = useState(storedExpenseData)
  const [ordersData,setOrdersData] = useState(storedOrderData)
  const [filterExpenseData,setFilterExpenseData] = useState(expenseData)
  const [filterOrdersData,setFilterOrdersData] = useState(ordersData)
  const [yearFilter,setYearFilter] = useState(new Date().getFullYear())
  const [monthFilter,setMonthFilter] = useState(new Date().getMonth()+1)
  const [barChartFilteredData,setBarCHartFilteredData] = useState(ordersData)

  
  
  const [profit,setProfit] = useState(0)
  const [totalOrders,setTotalOrders] = useState(0)
  const [totalExpenseAmount,setTotalExpenseAmount] = useState(0)
  
  const colors = [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 192, 64, 0.2)',
  ]
  
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ]
  

  const [categoryData,setCategoryData] = useState([])
  const [categoryExpense,setCategoryExpense] = useState([])
  const [ordersByMonths,setOrdersByMonths] = useState([])
  const [month,setMonth] = useState([])
  const [amount,setAmount] = useState([])

  useEffect(()=>{
    let filteredData = ordersData.filter((item)=>item.month === monthFilter && item.year === yearFilter)
    setFilterOrdersData(filteredData)
    //console.log(filterOrdersData)
  },[ordersData,monthFilter,yearFilter])

  useEffect(()=>{
    let filteredData = ordersData.filter((item)=>item.year===yearFilter)
    setBarCHartFilteredData(filteredData)
  },[ordersData,yearFilter])

  

  useEffect(()=>{
    let filteredData = expenseData.filter((item)=>item.month===monthFilter && item.year === yearFilter)
    setFilterExpenseData(filteredData)
  },[expenseData,yearFilter,monthFilter])
  
 //console.log(filterExpenseData)

  useEffect(()=>{
    let profitData = filterOrdersData.reduce((acc,i)=>acc+i.payment,0)
    setProfit(profitData)
    let totalOrdersData = filterOrdersData.reduce((acc,i)=>acc+parseInt(i.qty),0)
    setTotalOrders(totalOrdersData)
    let ordersDataByMonths = {

    }
    barChartFilteredData.forEach((item)=>{
      if(!ordersDataByMonths[item.month]){
        ordersDataByMonths[item.month]=item.payment
      }
      else{
        ordersDataByMonths[item.month]+=item.payment
      }
    })

    let ordersArrayByMonths = Object.entries(ordersDataByMonths).map(([month,total])=>({
      month:month,
      total:total
    }))

    const sortedOrdersArray = [...ordersArrayByMonths].sort((a, b) => a.month - b.month);
    setOrdersByMonths(sortedOrdersArray)
    const monthsData = sortedOrdersArray.map((item)=>months[parseInt(item.month)-1]) 
    const data = [...monthsData]
    setMonth(data)
    const amountByMonth = sortedOrdersArray.map((item)=>item.total)
    const amountData = [...amountByMonth]
    setAmount(()=>[...amountData])
    console.log(amount)
  },[filterOrdersData,barChartFilteredData])

  useEffect(()=>{
    let expenseAmount = filterExpenseData.reduce((acc,i)=>acc+parseInt(i.amount),0)
    setTotalExpenseAmount(expenseAmount)
    const uniqueCategoriesSet = new Set();
  filterExpenseData.forEach((item) => {
    uniqueCategoriesSet.add(item.category);
  });

  


  
  // Convert the Set to an array
  const categoryDataArray = [...uniqueCategoriesSet];
  setCategoryData(categoryDataArray)

  let categoryExpenseAmount = {}
  filterExpenseData.forEach((item)=>{
    const {amount,category}=item
    if(!categoryExpenseAmount[category]){
      categoryExpenseAmount[category]=parseInt(amount)
    }else{
      categoryExpenseAmount[category]+=parseInt(amount)
    }
  })

  const aggregatedArray = Object.values(categoryExpenseAmount)
  
  setCategoryExpense(aggregatedArray)

  },[filterExpenseData])

  ChartJS.register(
    ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
  LinearScale,
  BarElement,
  Title,
  )
  //console.log(month)

  console.log(categoryExpense)

   const data = {
    labels: categoryData,
    datasets: [
      {
        label: 'Money Spend',
        data: categoryExpense,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

   const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" ,
      },
      title: {
        display: true,
        text: `${yearFilter} Orders Chart`,
      },
    },
  };
  
  const labels = ["January", "February", "March", "April", "May", "June", "July"];
  
   const barChartData = {
    labels:month,
    datasets: [
      {
        label: "Orders Report",
        data: amount,
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };

  const dispatch = useDispatch()
  return (
    <div className="p-3 md:px-2 md:py-10 md:ml-[340px]" onClick={()=>dispatch(decrement())}>
      <div>
      <div className="w-full md:w-[1080px] flex flex-row justify-between items-center gap-y-4 md:gap-y-0 mt-4 md:mt-0 mb-4">
            <Box sx={{ minWidth: 120, background: "white" }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Month</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={monthFilter}
                  label="Month"
                  onChange={(e)=>setMonthFilter(e.target.value)}
                >
                  {new Array(12).fill("").map((_, index) => (
                    <MenuItem value={index + 1}>{index + 1}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
            <Box sx={{ minWidth: 120, background: "white" }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Year</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={yearFilter}
                  label="Year"
                  onChange={(e)=>setYearFilter(e.target.value)}
                >
                  {new Array(5).fill("").map((_, index) => (
                    <MenuItem value={new Date().getFullYear() + index}>
                      {new Date().getFullYear() + index}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-4 gap-y-4">
          <div className=" w-full h-[100px] md:w-[350px] rounded-md md:h-[150px] bg-[white] shadow-md p-4 md:px-6 md:py-4 flex items-center justify-center">
            <div className="flex gap-4 items-center">
              <div className="w-[60px] md:w-[80px] mix-blend-multiply ">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/438/438526.png"
                  alt=""
                  srcSet=""
                />
              </div>

              <h1 className="text-[50px] text-gray-400 font-bold ">&#8377;{profit}</h1>
            </div>
          </div>
          <div className=" w-full h-[100px] md:w-[350px] rounded-md md:h-[150px] bg-[white] shadow-md p-4 md:px-6 md:py-4 flex items-center justify-center">
            <div className="flex gap-4 items-center">
              <div className="w-[60px] md:w-[80px] mix-blend-multiply ">
                <img
                  src="https://cdn.iconscout.com/icon/premium/png-256-thumb/order-list-10-832873.png"
                  alt=""
                  srcSet=""
                />
              </div>

              <h1 className="text-[50px] text-gray-400 font-bold ">{totalOrders}</h1>
            </div>
          </div>
          <div className=" w-full h-[100px] md:w-[350px] rounded-md md:h-[150px] bg-[white] shadow-md p-4 md:px-6 md:py-4 flex items-center justify-center">
            <div className="flex gap-4 items-center">
              <div className="w-[60px] md:w-[80px] mix-blend-multiply ">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/6289/6289296.png"
                  alt=""
                  srcSet=""
                />
              </div>

              <h1 className="text-[50px] text-red-600 font-bold ">&#8377;{totalExpenseAmount}</h1>
            </div>
          </div>
          <div className=" w-full h-[100px] md:w-[350px] rounded-md md:h-[150px] bg-[white] shadow-md p-4 md:px-6 md:py-4 flex items-center justify-center">
            <div className="flex gap-4 items-center">
              <div className="w-[60px] md:w-[80px] mix-blend-multiply ">
                <img
                  src="https://cdn2.iconfinder.com/data/icons/new-year-resolutions/64/resolutions-24-512.png"
                  alt=""
                  srcSet=""
                />
              </div>

              <h1 className="text-[50px] text-green-600 font-bold ">&#8377;{profit - totalExpenseAmount}</h1>
            </div>
          </div>
          <div className=" w-full h-full   md:col-span-2 md:row-span-2 rounded-md bg-[white] shadow-md p-2 md:p-6 md:flex md:justify-center md:items-center">
            <div className="w-full md:w-[75%]">
             <Doughnut data={data}/>
            </div>
          </div>
          <div className="w-full h-full md:col-span-3 md:row-span-2 rounded-md bg-[white] shadow-md p-4 md:px-6 md:py-4 md:flex md:justify-center md:items-center">
<div className="w-full md:w-[100%] ">
<Bar options={options} data={barChartData} />;
</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
