
import './App.css'

import { Outlet } from 'react-router'
import CommonLayout from './components/Layouts/CommonLayout'

function App() {
 

  return (
    <div className=''>
       <CommonLayout>
        <Outlet></Outlet>
     </CommonLayout>
    </div>
  )
}

export default App
