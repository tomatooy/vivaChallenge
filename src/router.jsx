import FirstPage from './pages/Page1'
import SecondPage from './pages/Page2'


const router = [
    {
        path: '/page2',
        element: <SecondPage/>,
    },
    {
        path: '/',
        element: <FirstPage/>
    }
]

export default router