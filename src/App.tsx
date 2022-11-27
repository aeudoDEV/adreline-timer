import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { History } from "./components/About"
import { Form } from "./components/Form"
import { Context } from "./contexts/Context"
import './global.scss'
import { Layout } from "./Layout"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout/>,
    children:[
      {
        path: "/",
        element: <Form/>,
      },
      {
        path: "/about",
        element: <History/>,
      }

    ]
  }
])

export function App() {
  


  return (
    <Context> 
      <RouterProvider router={router}/>
    </Context>
  )
}

