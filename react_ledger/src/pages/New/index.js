import { Button, DatePicker, Input, NavBar } from 'antd-mobile'
import Icon from 'src/components/Icon/index'
import './index.scss'
import classNames from 'classnames'
import { billListData } from 'src/constatnts/index'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { addBillList } from 'src/store/modules/billStore'
import { useDispatch } from 'react-redux'
import dayjs from 'dayjs'

const New = () => {
  const navigate = useNavigate()

  // A var for Income and Expenses status change
  const[billType, setBillType] = useState('pay')

  // get the amount we input
  const [money, setMoney] = useState(0)

  // collect the bill Type
  const [useFor,setUseFor] = useState('')
  const dispatch = useDispatch()

  const moneyChange = (value) =>{
    setMoney(value)
  }

  // save the bill
  const saveBill = () => {
    //collect the table data
    const data = {
      type: billType,
      money:billType === 'pay'? -money : +money,
      date: date,
      useFor: useFor
    }
    console.log(data)
    dispatch(addBillList(data))
  }

  // control the open and the close of the time bar
  const[dateVisible, setDateVisible] = useState(false)

  // store the time 
  const [date,setDate] = useState()

  // date confirmation
  const dateConfirm = (value) =>
  {
    setDate(value)
    setDateVisible(false)
  }
  return (
    <div className="keepAccounts">
      <NavBar className="nav" onBack={() => navigate(-1)}>
        Record an Expense
      </NavBar>

      <div className="header">
        <div className="kaType">
          <Button
            shape="rounded"
            className={classNames(billType === 'pay' ? 'selected' : '')}
            onClick={()=>setBillType('pay')}
          >
            Expense
          </Button>
          <Button
            className={classNames(billType === 'income' ? 'selected' : '')}
            shape="rounded"
            onClick={()=>setBillType('income')}
          >
            Income
          </Button>
        </div>

        <div className="kaFormWrapper">
          <div className="kaForm">
            <div className="date">
              <Icon type="calendar" className="icon" />
              <span className="text" onClick={() => setDateVisible(true)}>{dayjs(date).format('YYYY-MM-DD')}</span>
              {/* Time Selector */}
              <DatePicker
                className="kaDate"
                title="Record Time"
                max={new Date()}
                visible={dateVisible}
                onConfirm={dateConfirm}
              />
            </div>
            <div className="kaInput">
              <Input
                className="input"
                placeholder="0.00"
                type="number"
                val={money}
                onChange={moneyChange}
              />
              <span className="iconYuan">€</span>
            </div>
          </div>
        </div>
      </div>

      <div className="kaTypeList">
        {/* main part */}
        {billListData[billType].map(item => {
          return (
            <div className="kaType" key={item.type}>
              <div className="title">{item.name}</div>
              <div className="list">
                {item.list.map(item => {
                  return (
                    // selected
                    <div
                      className={classNames(
                        'item',
                        useFor === item.type ? 'selected' : ''
                      )}
                      key={item.type}
                      onClick={() => setUseFor(item.type)}
                    >
                      <div className="icon">
                        <Icon type={item.type} />
                      </div>
                      <div className="text">{item.name}</div>
                    </div>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>

      <div className="btns">
        <Button className="btn save" onClick={saveBill}>
          Save
        </Button>
      </div>
    </div>
  )
}

export default New