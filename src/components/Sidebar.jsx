import React, { useState, useEffect } from "react";


import Home from "./Home";

const Sidebar = () => {
  const [active, setActive] = useState(false);
  
  const navigation = [
    {
      name: "Dashboard",
      link: "/",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="30"
          height="30"
          viewBox="0 0 30 30"
          fill="none"
        >
          <path
            d="M15 17.7441C14.7806 17.7441 14.5651 17.6864 14.375 17.5769L3.12496 11.0803C2.52698 10.7349 2.3222 9.97015 2.6676 9.37216C2.7773 9.18224 2.93504 9.0245 3.12496 8.9148L14.375 2.4231C14.762 2.20093 15.2379 2.20093 15.625 2.4231L26.875 8.9148C27.473 9.2602 27.6777 10.025 27.3323 10.623C27.2226 10.8129 27.0649 10.9706 26.875 11.0803L15.625 17.5769C15.4349 17.6864 15.2194 17.7441 15 17.7441Z"
            fill="#FFC029"
          />
          <path
            d="M26.875 13.9148L24.4198 12.4981L15.625 17.5769C15.2381 17.7999 14.7618 17.7999 14.375 17.5769L5.5801 12.4981L3.12496 13.9148C2.52698 14.2602 2.3222 15.025 2.6676 15.623C2.7773 15.8129 2.93504 15.9706 3.12496 16.0803L14.375 22.5769C14.7618 22.7999 15.2381 22.7999 15.625 22.5769L26.875 16.0803C27.473 15.7349 27.6777 14.9702 27.3323 14.3722C27.2226 14.1823 27.0649 14.0245 26.875 13.9148Z"
            fill="#FD9F24"
          />
          <path
            d="M26.875 18.9148L24.4198 17.4981L15.625 22.5769C15.2381 22.7999 14.7618 22.7999 14.375 22.5769L5.5801 17.4981L3.12496 18.9148C2.52698 19.2602 2.3222 20.025 2.6676 20.623C2.7773 20.8129 2.93504 20.9706 3.12496 21.0803L14.375 27.5769C14.7618 27.7999 15.2381 27.7999 15.625 27.5769L26.875 21.0803C27.473 20.7349 27.6777 19.9702 27.3323 19.3722C27.2226 19.1823 27.0649 19.0245 26.875 18.9148Z"
            fill="#FB7C1F"
          />
        </svg>
      ),
      active: true,
    },
    {
      name: "Orders",
      link: "/",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="26"
          height="26"
          viewBox="0 0 26 26"
          fill="none"
        >
          <path
            d="M24.25 18H6.75C6.41848 18 6.10054 17.8683 5.86612 17.6339C5.6317 17.3995 5.5 17.0815 5.5 16.75C5.5 16.4185 5.6317 16.1005 5.86612 15.8661C6.10054 15.6317 6.41848 15.5 6.75 15.5H19.8C20.6358 15.5 21.4477 15.2209 22.1067 14.7068C22.7657 14.1927 23.2341 13.4732 23.4375 12.6625L25.5 4.55C25.5468 4.36551 25.5509 4.17277 25.5119 3.98646C25.4729 3.80016 25.3919 3.62523 25.275 3.475C25.1534 3.32092 24.9973 3.19762 24.8192 3.1151C24.6411 3.03258 24.4461 2.99315 24.25 3H6.45C6.19211 2.27056 5.71491 1.63875 5.08383 1.19117C4.45275 0.743598 3.69868 0.502174 2.925 0.5H1.75C1.41848 0.5 1.10054 0.631696 0.866116 0.866116C0.631696 1.10054 0.5 1.41848 0.5 1.75C0.5 2.08152 0.631696 2.39946 0.866116 2.63388C1.10054 2.8683 1.41848 3 1.75 3H2.925C3.21054 2.99168 3.49032 3.08142 3.71776 3.25427C3.94519 3.42712 4.10656 3.67266 4.175 3.95L4.25 4.55L6.4125 13C5.41794 13.0448 4.48189 13.4828 3.81028 14.2177C3.13866 14.9526 2.78649 15.9242 2.83125 16.9188C2.87601 17.9133 3.31402 18.8494 4.04892 19.521C4.78383 20.1926 5.75544 20.5448 6.75 20.5H6.975C6.76942 21.0664 6.70336 21.674 6.78241 22.2714C6.86147 22.8687 7.08331 23.4383 7.42915 23.9317C7.77499 24.4251 8.23464 24.828 8.76919 25.1061C9.30374 25.3842 9.89743 25.5294 10.5 25.5294C11.1026 25.5294 11.6963 25.3842 12.2308 25.1061C12.7654 24.828 13.225 24.4251 13.5709 23.9317C13.9167 23.4383 14.1385 22.8687 14.2176 22.2714C14.2966 21.674 14.2306 21.0664 14.025 20.5H16.975C16.7694 21.0664 16.7034 21.674 16.7824 22.2714C16.8615 22.8687 17.0833 23.4383 17.4291 23.9317C17.775 24.4251 18.2346 24.828 18.7692 25.1061C19.3037 25.3842 19.8974 25.5294 20.5 25.5294C21.1026 25.5294 21.6963 25.3842 22.2308 25.1061C22.7654 24.828 23.225 24.4251 23.5709 23.9317C23.9167 23.4383 24.1385 22.8687 24.2176 22.2714C24.2966 21.674 24.2306 21.0664 24.025 20.5H24.25C24.5815 20.5 24.8995 20.3683 25.1339 20.1339C25.3683 19.8995 25.5 19.5815 25.5 19.25C25.5 18.9185 25.3683 18.6005 25.1339 18.3661C24.8995 18.1317 24.5815 18 24.25 18ZM22.65 5.5L21.0125 12.05C20.9441 12.3273 20.7827 12.5729 20.5553 12.7457C20.3278 12.9186 20.048 13.0083 19.7625 13H8.975L7.1 5.5H22.65ZM10.5 23C10.2528 23 10.0111 22.9267 9.80554 22.7893C9.59997 22.652 9.43976 22.4568 9.34515 22.2284C9.25054 21.9999 9.22579 21.7486 9.27402 21.5061C9.32225 21.2637 9.4413 21.0409 9.61612 20.8661C9.79093 20.6913 10.0137 20.5723 10.2561 20.524C10.4986 20.4758 10.7499 20.5005 10.9784 20.5952C11.2068 20.6898 11.402 20.85 11.5393 21.0555C11.6767 21.2611 11.75 21.5028 11.75 21.75C11.75 22.0815 11.6183 22.3995 11.3839 22.6339C11.1495 22.8683 10.8315 23 10.5 23ZM20.5 23C20.2528 23 20.0111 22.9267 19.8055 22.7893C19.6 22.652 19.4398 22.4568 19.3451 22.2284C19.2505 21.9999 19.2258 21.7486 19.274 21.5061C19.3222 21.2637 19.4413 21.0409 19.6161 20.8661C19.7909 20.6913 20.0137 20.5723 20.2561 20.524C20.4986 20.4758 20.7499 20.5005 20.9784 20.5952C21.2068 20.6898 21.402 20.85 21.5393 21.0555C21.6767 21.2611 21.75 21.5028 21.75 21.75C21.75 22.0815 21.6183 22.3995 21.3839 22.6339C21.1495 22.8683 20.8315 23 20.5 23Z"
            fill="#CDCDCD"
          />
        </svg>
      ),
      active: false,
    },
    {
      name: "Transactions",
      link: "/",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="30"
          height="30"
          viewBox="0 0 30 30"
          fill="none"
        >
          <path
            d="M8.75 18.75H12.5C12.8315 18.75 13.1495 18.6183 13.3839 18.3839C13.6183 18.1495 13.75 17.8315 13.75 17.5C13.75 17.1685 13.6183 16.8505 13.3839 16.6161C13.1495 16.3817 12.8315 16.25 12.5 16.25H8.75C8.41848 16.25 8.10054 16.3817 7.86612 16.6161C7.6317 16.8505 7.5 17.1685 7.5 17.5C7.5 17.8315 7.6317 18.1495 7.86612 18.3839C8.10054 18.6183 8.41848 18.75 8.75 18.75ZM23.75 6.25H6.25C5.25544 6.25 4.30161 6.64509 3.59835 7.34835C2.89509 8.05161 2.5 9.00544 2.5 10V21.25C2.5 22.2446 2.89509 23.1984 3.59835 23.9017C4.30161 24.6049 5.25544 25 6.25 25H23.75C24.7446 25 25.6984 24.6049 26.4017 23.9017C27.1049 23.1984 27.5 22.2446 27.5 21.25V10C27.5 9.00544 27.1049 8.05161 26.4017 7.34835C25.6984 6.64509 24.7446 6.25 23.75 6.25ZM25 21.25C25 21.5815 24.8683 21.8995 24.6339 22.1339C24.3995 22.3683 24.0815 22.5 23.75 22.5H6.25C5.91848 22.5 5.60054 22.3683 5.36612 22.1339C5.1317 21.8995 5 21.5815 5 21.25V13.75H25V21.25ZM25 11.25H5V10C5 9.66848 5.1317 9.35054 5.36612 9.11612C5.60054 8.8817 5.91848 8.75 6.25 8.75H23.75C24.0815 8.75 24.3995 8.8817 24.6339 9.11612C24.8683 9.35054 25 9.66848 25 10V11.25Z"
            fill="#CDCDCD"
          />
        </svg>
      ),
      active: false,
    },
    {
      name: "Graphs",
      link: "/",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="30"
          height="30"
          viewBox="0 0 30 30"
          fill="none"
        >
          <path
            d="M12.5 16.25H3.75C3.41848 16.25 3.10054 16.3817 2.86612 16.6161C2.6317 16.8505 2.5 17.1685 2.5 17.5V26.25C2.5 26.5815 2.6317 26.8995 2.86612 27.1339C3.10054 27.3683 3.41848 27.5 3.75 27.5H12.5C12.8315 27.5 13.1495 27.3683 13.3839 27.1339C13.6183 26.8995 13.75 26.5815 13.75 26.25V17.5C13.75 17.1685 13.6183 16.8505 13.3839 16.6161C13.1495 16.3817 12.8315 16.25 12.5 16.25ZM11.25 25H5V18.75H11.25V25ZM26.25 2.5H17.5C17.1685 2.5 16.8505 2.6317 16.6161 2.86612C16.3817 3.10054 16.25 3.41848 16.25 3.75V12.5C16.25 12.8315 16.3817 13.1495 16.6161 13.3839C16.8505 13.6183 17.1685 13.75 17.5 13.75H26.25C26.5815 13.75 26.8995 13.6183 27.1339 13.3839C27.3683 13.1495 27.5 12.8315 27.5 12.5V3.75C27.5 3.41848 27.3683 3.10054 27.1339 2.86612C26.8995 2.6317 26.5815 2.5 26.25 2.5ZM25 11.25H18.75V5H25V11.25ZM26.25 16.25H17.5C17.1685 16.25 16.8505 16.3817 16.6161 16.6161C16.3817 16.8505 16.25 17.1685 16.25 17.5V26.25C16.25 26.5815 16.3817 26.8995 16.6161 27.1339C16.8505 27.3683 17.1685 27.5 17.5 27.5H26.25C26.5815 27.5 26.8995 27.3683 27.1339 27.1339C27.3683 26.8995 27.5 26.5815 27.5 26.25V17.5C27.5 17.1685 27.3683 16.8505 27.1339 16.6161C26.8995 16.3817 26.5815 16.25 26.25 16.25ZM25 25H18.75V18.75H25V25ZM12.5 2.5H3.75C3.41848 2.5 3.10054 2.6317 2.86612 2.86612C2.6317 3.10054 2.5 3.41848 2.5 3.75V12.5C2.5 12.8315 2.6317 13.1495 2.86612 13.3839C3.10054 13.6183 3.41848 13.75 3.75 13.75H12.5C12.8315 13.75 13.1495 13.6183 13.3839 13.3839C13.6183 13.1495 13.75 12.8315 13.75 12.5V3.75C13.75 3.41848 13.6183 3.10054 13.3839 2.86612C13.1495 2.6317 12.8315 2.5 12.5 2.5ZM11.25 11.25H5V5H11.25V11.25Z"
            fill="#CDCDCD"
          />
        </svg>
      ),
      active: false,
    },
  ];

  

  return (
    <>
      <div className="flex flex-col md:flex-row">
        <div className="p-6 border-b border-gray-300 md:hidden flex justify-between items-center">
          <div onClick={() => setActive(!active)}>
            <svg viewBox="0 0 100 80" width="40" height="40">
              <rect width="100" height="20" rx="10"></rect>
              <rect y="30" width="100" height="20" rx="10"></rect>
              <rect y="60" width="100" height="20" rx="10"></rect>
            </svg>
          </div>
          <div className="flex items-center gap-3 ">
            <div className="w-[42px] h-[42px] custom flex items-center justify-center">
              <div className="w-[18px] h-[18px] bg-[#fff]"></div>
            </div>
            <h1 className="text-[30px] md:text-[34px] font-[600] ">Expense</h1>
          </div>
        </div>

        <div
          className={` w-3/4 md:w-[333px] h-screen fixed top-0 left-0 md:translate-x-0 ${
            active ? "translate-x-0" : "-translate-x-full"
          } transition ease-in-out bg-[#fff] duration-300 px-6 md:px-16`}
        >
          <div className="flex flex-col items-start">
            <div className="flex items-center gap-3 mt-4">
              <div className="w-[42px] h-[42px] custom flex items-center justify-center">
                <div className="w-[18px] h-[18px] bg-[#fff]"></div>
              </div>
              <h1 className="text-[30px] md:text-[34px] font-[600] ">
                Expense
              </h1>
            </div>

            <div className="mt-16 flex flex-col items-start space-y-14">
              {navigation.map((nav, i) => (
                <div
                  key={nav.name}
                  className="flex items-center justify-center gap-3   transition ease-in-out duration-300 cursor-pointer"
                >
                  <div>{nav.icon}</div>

                  <h3
                    className={`${
                      nav.active ? "text-[#FFC42A]" : "text-[#CDCDCD]"
                    } text-[20px]  font-[600]`}
                  >
                    {nav.name}
                  </h3>
                </div>
              ))}
            </div>
          </div>
        </div>

        <Home setActive={setActive}/>
      </div>
    </>
  );
};

export default Sidebar;
