import Year from "src/pages/Year";
import New from "src/pages/New";
import Month from "src/pages/Month";
import Layout from "src/pages/Layout";

import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
{
    path:'/',
    element: <Layout />,
    children:[
        
        {
            path:'month',
            element:<Month />
        },
        {
            path:'year',
            element: <Year />
        }
        
    ]
},

{
    path:'/new',
    element: <New />
},

])

export default router