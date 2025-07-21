import './App.css'
import { BrowserRouter, Routes, Route, useLocation, matchPath } from "react-router-dom"
import BlogPage from './Components/blogs/index.jsx'
import Dashboard from './Components/dashboard/index.jsx'
import Navbar from './Components/navbar/navbar.jsx'
import Sidebar from './Components/sidebar/sidebar.jsx'
import HistoryPage from './Components/history/index.jsx'
import CashflowPage from './Components/cashflow/index.jsx'
import GoalsPage from './Components/goals/index.jsx'
import ProfilePage from './Components/profile/index.jsx'
import Signup from './Components/SignUp/index.jsx'
import Login from './Components/Login/index.jsx'
import Form from './Components/Form/index.jsx'
import CashflowIndividual from './Components/cashflow/IndividualCashflow/CashflowIndividual.jsx';
import BudgetRecommendation from "./Components/dashboard/budgetRecommendations.jsx"
import HistoryIndividualRouter from './Components/history/HistoryIndividualData/HistoryIndividual.jsx'
import PhoneBar from './Components/sidebar/phonebar.jsx'
import NotFound from './Components/NotFound.jsx'
import CashflowIndividualData from './Components/cashflow/IndividualCashflowData/CashflowIndividualData.jsx'


function AppRoutes() {
  const location = useLocation();
  const hideLayout = ['/login', '/signup', '/form'];
  const isNotFound = ![
    '/', '/dashboard', '/budgetRecommendation/ai', '/blogs',
    '/profile', '/goals', '/historys', '/historys/:month',
    '/historys/:month/:urlId', '/cashflow', '/cashflow/:urlId',
    '/cashflow/SixMonth/:month', '/cashflow/SixMonth/:month/:urlId'
  ].some((path) =>
    matchPath({ path, end: true }, location.pathname)
  );
  const shouldHideLayout = hideLayout.includes(location.pathname.toLowerCase());


  return (
    <>
      {!shouldHideLayout && <Navbar />}

      {(!shouldHideLayout && !isNotFound) && (
        <div className='sidebar fixed left-0 h-[100%] w-[14.5vw] bg-[#B8D7DE8C] rounded-md mt-4'>
          <Sidebar />
        </div>
      )}


      <Routes>
        <Route path='/' element={<Dashboard />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/budgetRecommendation/ai' element={<BudgetRecommendation />} />
        <Route path='/blogs' element={<BlogPage />} />
        <Route path='/profile' element={<ProfilePage />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/form' element={<Form />} />
        <Route path='/goals' element={<GoalsPage />} />
        <Route path="/historys" element={<HistoryPage />} />
        <Route path="/historys/:month" element={<HistoryPage />} />
        <Route path='/historys/:month/:urlId' element={<HistoryIndividualRouter />} />
        <Route path='/cashflow' element={<CashflowPage />} />
        <Route path='/cashflow/:urlId' element={<CashflowPage />} />
        <Route path='/cashflow/SixMonth/:month' element={<CashflowIndividual />} />
        <Route path='/cashflow/SixMonth/:month/:urlId' element={<CashflowIndividualData />} />
        <Route path='*' element={<NotFound />} />



      </Routes>
     {!shouldHideLayout && <div className="phone-bar fixed bottom-0  left-0 w-full  bg-[#2D5359] ">
          <PhoneBar />
      </div>}
    </>
  )
}

function App() {
  return (
    <>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </>
  );
}

export default App;

