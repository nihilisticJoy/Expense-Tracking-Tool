import classNames from 'classnames'
import './index.scss'
import { useMemo } from 'react'
import {billTypeToName}  from 'src/constatnts/index'
import { useState } from 'react'
import Icon from 'src/components/Icon'

const DailyBill = ({date, billList}) => {
    const dayResult = useMemo(()=>{
        //Expenses, income, balance
        const pay = billList.filter(item => item.type === 'pay').reduce((a,c) => a + c.money, 0)
        const income = billList.filter(item => item.type === 'income').reduce((a,c) => a + c.money, 0)
        return{
            pay,
            income,
            balance: pay + income
        }
        
    },[billList])

    // control the expand and normal state
    const[visible, setVisible] = useState(false)

  return (
    <div className={classNames('dailyBill')}>
      <div className="header">
        <div className="dateIcon">
          <span className="date">{date}</span>
          <span className={classNames('arrow', visible&& 'expand')} onClick={()=>setVisible(!visible)}></span>
        </div>
        <div className="oneLineOverview">
          <div className="pay">
            <span className="type">Expneses</span>
            <span className="money">{dayResult.pay.toFixed(2)}</span>
          </div>
          <div className="income">
            <span className="type">Income</span>
            <span className="money">{dayResult.income.toFixed(2)}</span>
          </div>
          <div className="balance">
            <span className="type">Balance</span>
            <span className="money">{dayResult.balance.toFixed(2)}</span> 
          </div>
        </div>
      </div>
        {/* Every day list */}
        <div className="billList" style = {{display:visible?'block':'none'}}>
        {billList.map(item => {
            return (
            <div className="bill" key={item.id}>
                {/*Icon */}
                <Icon type={item.useFor}/>
                <div className="detail">
                <div className="billType">{item.useFor}</div>
                </div>
                <div className={classNames('money', item.type)}>
                {item.money.toFixed(2)}
                </div>
            </div>
            )
        })}
        </div>
    </div>
  )
}
export default DailyBill