import React, { useEffect, useState } from "react";
import { FcMoneyTransfer } from "react-icons/fc";

import { useDispatch } from "react-redux";
import { decrement } from "../app/features/counter";
import { Chart as ChartJS,Tooltip,Legend,ArcElement } from "chart.js";
import { Doughnut } from 'react-chartjs-2';


const Dashboard = () => {
  let initialExpenseData = localStorage.getItem("expensesData")
  let storedExpenseData = initialExpenseData ? JSON.parse(initialExpenseData) : []
  let initialOrderData = localStorage.getItem("ordersData")
  let storedOrderData = initialExpenseData ? JSON.parse(initialOrderData) : []
  
  const [expenseData,setExpenseData] = useState(storedExpenseData)
  const [ordersData,setOrdersData] = useState(storedOrderData)
  
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

  

  const [categoryData,setCategoryData] = useState([])
  const [categoryExpense,setCategoryExpense] = useState([])

  useEffect(()=>{
    let profitData = ordersData.reduce((acc,i)=>acc+i.payment,0)
    setProfit(profitData)
    let totalOrdersData = ordersData.reduce((acc,i)=>acc+parseInt(i.qty),0)
    setTotalOrders(totalOrdersData)
  },[ordersData])

  useEffect(()=>{
    let expenseAmount = expenseData.reduce((acc,i)=>acc+parseInt(i.amount),0)
    setTotalExpenseAmount(expenseAmount)
    const uniqueCategoriesSet = new Set();
  expenseData.forEach((item) => {
    uniqueCategoriesSet.add(item.category);
  });

  


  
  // Convert the Set to an array
  const categoryDataArray = [...uniqueCategoriesSet];
  setCategoryData(categoryDataArray)

  let categoryExpenseAmount = {}
  expenseData.forEach((item)=>{
    const {amount,category}=item
    if(!categoryExpenseAmount[category]){
      categoryExpenseAmount[category]=amount
    }else{
      categoryExpenseAmount[category]+=amount
    }
  })

  const aggregatedArray = Object.values(categoryExpenseAmount)
  
  setCategoryExpense(aggregatedArray)

  },[expenseData])

  ChartJS.register(
    ArcElement,
    Tooltip,
    Legend
  )
  //console.log(totalExpenseAmount)

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

  const dispatch = useDispatch()
  return (
    <div className="p-3 md:px-2 md:py-10 md:ml-[340px]" onClick={()=>dispatch(decrement())}>
      <div>
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

              <h1 className="text-[50px] text-gray-400 font-bold ">&#8377;{totalExpenseAmount}</h1>
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

              <h1 className="text-[50px] text-gray-400 font-bold ">&#8377;{profit - totalExpenseAmount}</h1>
            </div>
          </div>
          <div className=" w-full h-full   md:col-span-2 md:row-span-2 rounded-md bg-[white] shadow-md p-2 md:p-6 md:flex md:justify-center md:items-center">
            <div className="w-full md:w-[75%]">
             <Doughnut data={data}/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
