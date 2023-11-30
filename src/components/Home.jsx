
import React, { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import { add,decrement } from "../app/features/counter";
const Home = ({setActive}) => {
    
  const [currentDate, setCurrentDate] = useState(new Date());
  const storedOrderData = localStorage.getItem('ordersData');
  const initialOrder = storedOrderData ? JSON.parse(storedOrderData) : [];
  const [order,setOrder] = useState(initialOrder)
  const [quantity,setQuantity] = useState(0)
  const [payment,setPayment] = useState(0)
  const [pendingPayment,setPendingPayment] = useState(0)
  const expenseData = localStorage.getItem("expensesData")
  const initialExpense = expenseData ? JSON.parse(expenseData) : []
  const [expense,setExpense] = useState(initialExpense)

  
  
  

  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];



  const addOrder = ()=>{
    let newDate = new Date()
    let orderData = {
        
        date : newDate.getDate() + "/" + newDate.getMonth() + "/" + newDate.getFullYear(),
        qty : quantity,
        payment : (quantity * 3),
        day : daysOfWeek[newDate.getDay()],
        month : newDate.getMonth()+1,
        year : newDate.getFullYear()
    }
    setOrder([...order,orderData])
    setQuantity(0)
    localStorage.setItem("ordersData",JSON.stringify([...order,orderData]))

  }

  const addExpense = ()=>{
    let newDate = new Date()
    let expenseData = {
        expense : "",
        category : "",
        paymentType : "",
        amount : 0,
        comment : ""
    }
  }

  const updatePayment = ()=>{
   let  newpendingPayment = payment > pendingPayment ? (payment - pendingPayment) : pendingPayment - payment
   setPendingPayment(newpendingPayment)
  }

  useEffect(()=>{

    //console.log(order)
    let pendingPaymentData =  order.reduce((acc,i)=>acc + i.payment,0)
    setPendingPayment(pendingPaymentData)

    //console.log(pendingPayment)

  },[order])

  

  const dispatch = useDispatch()

  let day = currentDate.getDate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000); // Update every second

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []);


  return (
    <>
    <div
          className="px-2 md:px-4 md:py-6 mt-4 md:mt-10 md:ml-[350px]"
          onClick={() => setActive(false)}
        >
          <div className="px-4 py-4 md:px-6 md:py-6 w-full md:w-[1050px] bg-[#fff] min-h-[50px] rounded-[10px] shadow-sm flex items-center justify-between mb-10">
            <div className="flex items-center gap-4">
              <h1 className="text-[20px] text-[#CDCDCD] font-[400]">
                {day}/{currentDate.getMonth()}/{currentDate.getFullYear()}
              </h1>
              <h1 className="text-[20px] text-[#CDCDCD] font-[400]">
                {daysOfWeek[currentDate.getDay()]}
              </h1>
            </div>
            <div>
              <h1 className="text-[20px] text-[#CDCDCD] font-[400]">
                {currentDate.getHours()} : {currentDate.getMinutes()} :{" "}
                {currentDate.getSeconds()}
              </h1>
            </div>
          </div>

          <div className="flex flex-col ">
            <div className="w-full h-full md:w-[1050px] md:h-[650px] bg-[#FFF] rounded-[20px] shadow-sm p-4 md:p-6">
              <div>
                <div className="flex flex-col md:flex-row md:gap-x-4 gap-y-4 md:gap-y-0">
                  <div className="md:w-[500px]  h-full w-full rounded-[10px] shadow-sm bg-[#FDF7FF] p-4 md:p-8">
                    <div>
                      <input
                        className="w-full h-[50px] rounded-[10px] p-4 text-[#CDCDCD] text-[20px] focus:outline-none"
                        placeholder="Enter Quantity"
                        onChange={(e)=>setQuantity(e.target.value)}
                        value={quantity}
                      />

                      <h1 className="text-[20px] text-[#CDCDCD]  font-[600] mt-6">
                        Total:-
                        <span className="text-green-300">&#8377;{quantity && quantity * 3}</span>
                      </h1>

                      <button onClick={addOrder}   className="text-20px md:text-[30px] text-[#fff] px-6 py-2 bg-purple-200 rounded-[10px] hover:bg-[#935af0] transition ease-in-out duration-300 font-[600] mt-6 w-full">
                        {" "}
                        Add
                      </button>
                    </div>
                  </div>
                  <div className="md:w-[500px]  h-full w-full rounded-[10px] shadow-sm bg-[#FDF7FF] p-4 md:p-8">
                    <div>
                      <h1 className="text-[20px] text-[#CDCDCD]  font-[600] ">
                        Balance:-
                        <span className={`${payment > pendingPayment ? "text-green-300" : "text-red-300" }`}>&#8377;{pendingPayment}</span>
                      </h1>

                      <input
                        className="w-full h-[50px] rounded-[10px] p-4 text-[#CDCDCD] text-[20px] focus:outline-none mt-6"
                        placeholder="Update Balance"
                        value={payment}
                        onChange={(e)=>setPayment(e.target.value)}
                      />

                      <button onClick={updatePayment} className="text-20px md:text-[30px] text-[#fff] px-6 py-2 bg-purple-200   rounded-[10px] hover:bg-[#935af0] transition ease-in-out duration-300 font-[600] mt-6 w-full">
                        Update
                      </button>
                    </div>
                  </div>
                </div>
                <div className="w-full h-full md:w-[1000px] shadow-sm bg-[#FDF7FF] p-4 md:p-8 mt-4 rounded-[10px] ">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-4 md:gap-y-0">

                    <div>
                    <input
                        className="w-full h-[50px] rounded-[10px] p-4 text-[#CDCDCD] text-[15px] focus:outline-none"
                        placeholder="Expnese Name"
                      />
                      <div className="mt-5">
                      <select className="w-full outline-none h-[50px] rounded-[10px] p-4 text-[#CDCDCD] text-[15px] focus:outline-none " placeholder="Expense Category mt-3">
                      <option >Expense Category</option>
                      </select>
                      </div>

                      <div className="mt-5">
                      <select className="w-full outline-none h-[50px] rounded-[10px] p-4 text-[#CDCDCD] text-[15px] focus:outline-none " placeholder="Expense Category mt-3">
                       <option >Grocery</option>
                      </select>
                      </div>


                    </div>
                    <div>
                    <input
                        className="w-full h-[50px] rounded-[10px] p-4 text-[#CDCDCD] text-[15px] focus:outline-none"
                        placeholder="Expense Amount"
                      />
                      <div className="mt-5">
                      <select className="w-full outline-none h-[50px] rounded-[10px] p-4 text-[#CDCDCD] text-[15px] focus:outline-none " placeholder="Expense Category mt-3">
                       <option>Type</option>
                      </select>
                      </div>

                      <div className="mt-5">
                      <input
                        className="w-full h-[50px] rounded-[10px] p-4 text-[#CDCDCD] text-[15px] focus:outline-none"
                        placeholder="Expnese Comments"
                      />
                      </div>


                    </div>


                  </div>
                  <button className="text-20px md:text-[30px] text-[#fff] px-6 py-2 bg-purple-200 rounded-[10px] hover:bg-[#935af0] transition ease-in-out duration-300 font-[600] mt-4 w-full">
                        Add Expense
                      </button>
                </div>
              </div>
            </div>
          </div>
        </div>
    </>
  )
}

export default Home