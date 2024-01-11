import { Outlet } from "react-router-dom"
import { TabBar } from "antd-mobile"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { getBillList } from "src/store/modules/billStore"
import "./index.scss"

import {
    BillOutline,
    CalculatorOutline,
    AddCircleOutline
  } from 'antd-mobile-icons'
  
  const tabs = [
    {
      key: '/month',
      title: 'Monthly Bill',
      icon: <BillOutline />,
    },
    {
      key: '/new',
      title: 'Record an Expense',
      icon: <AddCircleOutline />,
    },
    {
      key: '/year',
      title: 'Yearly Bill',
      icon: <CalculatorOutline />,
    },
  ]

const Layout = () =>{
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(getBillList())
    },[dispatch])


const navigate = useNavigate();

const switchRouter = (path)=>
{
    navigate(path)
}

return(
    <div className="layout">
        <div className="container">
            <Outlet />
        </div>
        <div className="footer">
            <TabBar onChange={switchRouter}>
                {tabs.map(item => (
                    <TabBar.Item key = {item.key} icon = {item.icon} title = {item.title}/>
                ))}
            </TabBar>
        </div>
    </div>
)
    
}
export default Layout