import React, { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import { add, decrement } from "../app/features/counter";

import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import TextField from "@mui/material/TextField";
import { Select, MenuItem } from "@mui/material";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import SendIcon from "@mui/icons-material/Send";
import Stack from "@mui/material/Stack";

const Home = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const storedOrderData = localStorage.getItem("ordersData");
  const initialOrder = storedOrderData ? JSON.parse(storedOrderData) : [];
  const [order, setOrder] = useState(initialOrder);
  const [quantity, setQuantity] = useState(0);
  const [payment, setPayment] = useState(0);

  const storedPayment = localStorage.getItem("pendingpayment");
  let initialPendingPayment = 0;

  try {
    initialPendingPayment = storedPayment ? JSON.parse(storedPayment) : 0;
  } catch (error) {
    console.error("Error parsing stored data:", error);
    initialPendingPayment = 0;
  }

  const [pendingPayment, setPendingPayment] = useState(initialPendingPayment);
  const expenseData = localStorage.getItem("expensesData");
  const initialExpense = expenseData ? JSON.parse(expenseData) : [];
  const [expense, setExpense] = useState(initialExpense);
  const [expenseName, setExpenseName] = useState("");
  const [expenseCategory, setExpenseCategory] = useState("");
  const [expensePaymentCategory, setExpensePaymentCategory] = useState("");
  const [dateData, setDateData] = useState("");
  const [expenseAmount, setExpenseAmount] = useState(0);
  const [expenseComments, setExpenseComments] = useState("");

  const expenseOptions = [
    "Grocery",
    "Clothes",
    "Medicines",
    "Online Shopping",
    "Chakki Atta",
    "Petrol",
  ];

  const paymentOptions = ["Cash", "Online", "Atm"];

  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const addOrder = () => {
    let newDate = new Date();
    let orderData = {
      date:
        newDate.getDate() +
        "/" +
        (newDate.getMonth() + 1)+
        "/" +
        newDate.getFullYear(),
      qty: quantity,
      payment: quantity * 3,
      day: daysOfWeek[newDate.getDay()],
      month: newDate.getMonth() + 1,
      year: newDate.getFullYear(),
    };
    const currentPendingPayment = localStorage.getItem("pendingpayment")
      ? JSON.parse(localStorage.getItem("pendingpayment"))
      : 0;
    const updatedPendingPayment = currentPendingPayment + quantity * 3;
    setPendingPayment(updatedPendingPayment);
    setOrder([...order, orderData]);
    localStorage.setItem("ordersData", JSON.stringify([...order, orderData]));
    localStorage.setItem(
      "pendingpayment",
      JSON.stringify(updatedPendingPayment)
    );

    setQuantity(0);
  };

  const addExpense = () => {
    let newDate = new Date();
    let expenseData = {
      expense: expenseName,
      category: expenseCategory,
      paymentType: expensePaymentCategory,
      amount: expenseAmount,
      comment: expenseComments,
      expenseDate: dateData,
      month: newDate.getMonth() + 1,
      year: newDate.getFullYear(),
    };
    setExpense([...expense, expenseData]);
    localStorage.setItem(
      "expensesData",
      JSON.stringify([...expense, expenseData])
    );
    setDateData("");
    setExpenseAmount(0);
    setExpenseCategory("");
    setExpenseComments("");
    setExpenseName("");
    setExpensePaymentCategory("");
  };

  const updatePayment = () => {
    const currentPendingPayment = localStorage.getItem("pendingpayment")
      ? JSON.parse(localStorage.getItem("pendingpayment"))
      : 0;
    const updatedPendingPayment = payment > currentPendingPayment ? (payment - currentPendingPayment) : (currentPendingPayment - payment);
    setPendingPayment(updatedPendingPayment);
    localStorage.setItem("pendingpayment",JSON.stringify(updatedPendingPayment))
    setPayment(0);
  };

  const dispatch = useDispatch();
  

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
        onClick={() => dispatch(decrement())}
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
          <div className="w-full h-full md:w-[1050px] md:h-[650px]  rounded-[20px]   md:p-6">
            <div>
              <div className="flex flex-col md:flex-row md:gap-x-4 gap-y-4 md:gap-y-0">
                <div className="md:w-[500px]  h-full w-full rounded-[10px] shadow-lg bg-[#FFF] p-4 md:p-8">
                  <div>
                    <TextField
                      id="Quantity"
                      label="Quantity"
                      variant="outlined"
                      sx={{
                        width: "100%",
                        background: "#FFF",
                        border: "none",
                      }}
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                      required={true}
                    />

                    <h1 className="text-[20px] text-[#CDCDCD]  font-[600] mt-6">
                      Total:-
                      <span className="text-green-300">
                        &#8377;{quantity && quantity * 3}
                      </span>
                    </h1>

                    <div className="mt-6">
                      <Button
                        variant="contained"
                        onClick={addOrder}
                        startIcon={<SendIcon />}
                        className="text-20px md:text-[30px] text-[#fff] px-6 py-2 bg-purple-200 rounded-[10px] hover:bg-[#935af0] transition ease-in-out duration-300 font-[600] mt-6 w-full "
                      >
                        {" "}
                        Add
                      </Button>
                    </div>
                  </div>
                </div>
                <div className="md:w-[500px]  h-full w-full rounded-[10px] shadow-lg bg-[#FFF] p-4 md:p-8">
                  <div>
                    <h1 className="text-[20px] text-[#CDCDCD]  font-[600] mb-6 ">
                      Balance:-
                      <span
                        className={`${
                          payment > pendingPayment && pendingPayment
                            ? "text-green-300"
                            : "text-red-300"
                        }`}
                      >
                        &#8377;{pendingPayment}
                      </span>
                    </h1>

                    <TextField
                      id="Balance Amount"
                      label="Payment Aount"
                      variant="outlined"
                      sx={{
                        width: "100%",
                        background: "#FFF",
                        border: "none",
                      }}
                      value={payment}
                      onChange={(e) => setPayment(e.target.value)}
                      required={true}
                    />

                    <div className="mt-6">
                      <Button
                        onClick={updatePayment}
                        variant="contained"
                        startIcon={<SendIcon />}
                        className="text-20px md:text-[30px] text-[#fff] px-6 py-2 bg-purple-200   rounded-[10px] hover:bg-[#935af0] transition ease-in-out duration-300 font-[600] mt-6 w-full "
                      >
                        Update
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full h-full md:w-[1000px]  bg-[#FFF] shadow-md p-4 md:p-8 mt-4 rounded-[10px] ">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-4 md:gap-y-0">
                  <div>
                    <TextField
                      id="outlined-basic"
                      label="Expense Name"
                      variant="outlined"
                      sx={{
                        width: "100%",
                        background: "#FFF",
                        border: "none",
                      }}
                      value={expenseName}
                      onChange={(e) => setExpenseName(e.target.value)}
                      required={true}
                    />
                    <div className="mt-5">
                      <Select
                        id="demo-simple-select"
                        value={expenseCategory}
                        label="Expense Category"
                        sx={{
                          width: "100%",
                          background: "#FFF",
                          border: "none",
                        }}
                        onChange={(e) => setExpenseCategory(e.target.value)}
                        required={true}
                      >
                        {expenseOptions.map((option, i) => (
                          <MenuItem value={option} key={i}>
                            {option}
                          </MenuItem>
                        ))}
                      </Select>
                    </div>

                    <div className="mt-3">
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={["DatePicker"]} className="">
                          <DatePicker
                            label="Expense date "
                            sx={{
                              width: "100%",
                              background: "#FFF",
                              border: "none",
                            }}
                            value={dateData}
                            onChange={(newValue) => setDateData(newValue)}
                            required={true}
                          />
                        </DemoContainer>
                      </LocalizationProvider>
                    </div>
                  </div>
                  <div>
                    <TextField
                      id="Amount"
                      label="Amount"
                      variant="outlined"
                      sx={{
                        width: "100%",
                        background: "#FFF",
                        border: "none",
                      }}
                      value={expenseAmount}
                      onChange={(e) => setExpenseAmount(e.target.value)}
                      required={true}
                    />
                    <div className="mt-5">
                      <Select
                        id="demo-simple-select"
                        value={expensePaymentCategory}
                        label="Expense Category"
                        sx={{
                          width: "100%",
                          background: "#FFF",
                          border: "none",
                        }}
                        onChange={(e) =>
                          setExpensePaymentCategory(e.target.value)
                        }
                        required={true}
                      >
                        {paymentOptions.map((option, i) => (
                          <MenuItem value={option} key={i}>
                            {option}
                          </MenuItem>
                        ))}
                      </Select>
                    </div>

                    <div className="mt-5">
                      <TextField
                        id="Comments"
                        label="Comments"
                        variant="outlined"
                        sx={{
                          width: "100%",
                          background: "#FFF",
                          border: "none",
                        }}
                        value={expenseComments}
                        onChange={(e) => setExpenseComments(e.target.value)}
                        required={true}
                      />
                    </div>
                  </div>
                </div>
                <div className="mt-6">
                  <Button
                    variant="contained"
                    startIcon={<SendIcon />}
                    onClick={addExpense}
                    className="text-20px md:text-[30px] text-[#fff] px-6 py-2 bg-purple-200 rounded-[10px] hover:bg-[#935af0] transition ease-in-out duration-300 font-[600] mt-4 w-full"
                  >
                    Add Expense
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
