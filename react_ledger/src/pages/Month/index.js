import { NavBar, DatePicker } from "antd-mobile"
import './index.scss'
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useMemo } from "react"
import classNames from "classnames"
import dayjs from 'dayjs'
import _ from 'lodash'
import DailyBill from "./components/DayBill"

const Month = () =>
{
    //Get the money group by the month
    const billList = useSelector(state => state.bill.billList)

    const monthGroup = useMemo(() =>{
        return _.groupBy(billList, (item) => dayjs(item.date).format('YYYY-MM'))
    },[billList])




    // the selector of the date
    const[dateVisible, setDateVisible] = useState(false)

    // time display
    const[currentDate, setCurrentDate] = useState(()=>
    {
        return dayjs(new Date()).format('YYYY-MM')
    })

    //current Month date
    const [currentMonthList, setMonthList] = useState([])

    // calculate the month bill
    const monthResult = useMemo(()=>{
        //Expenses, income, balance
        

        const pay = currentMonthList.filter(item => item.type === 'pay').reduce((a,c) => a + c.money, 0)
        const income = currentMonthList.filter(item => item.type === 'income').reduce((a,c) => a + c.money, 0)
        return{
            pay,
            income,
            balance: pay + income
        }
        
    },[currentMonthList])

    //confirm callback
    const onConfirm = (date)=>{
        setDateVisible(false)
        console.log(date)
        const formatDate = dayjs(date).format("YYYY-MM")
        setCurrentDate(formatDate)

        //get the data of the selected month
        setMonthList(monthGroup[formatDate])

    }

    //Initial month bill
    useEffect(()=>{
        const nowDate = dayjs().format('YYYY-MM')
        if(monthGroup[nowDate])
        {
            setMonthList(monthGroup[nowDate])
        }    
    }, [monthGroup])

    //Group the month bill with the day bill
    const dayGroup = useMemo(() =>{
        const groupData = _.groupBy(currentMonthList, (item) => dayjs(item.date).format('YYYY-MM-DD'))
        const groupKey = Object.keys(groupData)
        return {
            groupData,
            groupKey
        }
    },[currentMonthList])

    return(
        <div className="monthlyBill">
            <NavBar className="nav" backArrow={false}>
                Monthly Income and Expenses
            </NavBar>
            <div className="content">
                <div className="header">

                    {/* time changer*/}
                    <div className="date" onClick={()=> setDateVisible(true)}>
                        <span className="text">
                           {currentDate + ''} Bill 
                        </span>
                        {/* if the pop up is opened to decide the arrow direction */}
                        <span className={classNames('arrow',dateVisible && 'expand')}></span>
                    </div>

                    {/* statistic area*/}
                    <div className="twoLineOverview">

                        <div className="item">
                            <span className="money">{monthResult.pay.toFixed(2)}</span>
                            <span className="type">Expenses</span>
                        </div>

                        <div className="item">
                            <span className="money">{monthResult.income.toFixed(2)}</span>
                            <span className="type">Income</span>
                        </div>

                        <div className="item">
                            <span className="money">{monthResult.balance.toFixed(2)}</span>
                            <span className="type">balance</span>
                        </div>
                    </div>

                    {/* Date Picker */}
                    <DatePicker
                    className="kaDate"
                    title="Accounting Time"
                    precision="month"
                    visible={dateVisible}
                    max={new Date()}
                    onCancel={() => setDateVisible(false)}
                    onConfirm={onConfirm}
                    onClose={()=> setDateVisible(false)}
                    />
                </div>

                {/*The single day list analysis */}
                {
                    dayGroup.groupKey.map(key => 
                        {
                            return <DailyBill key={key} date={key} billList={dayGroup.groupData[key]} />
                        })
                }
                

            </div>
        </div>
    )
}
export default Month