import CounterExample from '../../components/counter-example'
import FetchData from '../../components/fetch-data'
import HomePage from '../../components/home-page'
import About from '../../components/about'
import Auth from '../../components/auth.vue'
import Trello from '../../components/study/trello'
import Home from '../../components/study/Home'
import Login from '../../components/study/Login'
import NotFound from '../../components/study/NotFound'
import Card from '../../components/study/Card'



// const requireAuth = (to, from, next) => {
//  const isAuth = localStorage.getItem('token')
//  //로그인 갔다가 다시 현재 페이지로 와야하기 때문에 현재 페이지 경로는 to에 들어있다
//  //${} 쿼리이기 때문에 인코딩 시켜준다.
//  const loginPath = `/login?rPath=${encodeURIComponent(to.path)}`

//  isAuth ? next() : next(loginPath)
//}


export const routes = [
    { name: 'homepage', path: '/', component: HomePage, display: 'HomePage', icon: 'home', meta: { requiresLogin: true } },
    { name: 'about', path: '/about', component: About, display: 'About Template', icon: 'info' },
    { name: 'counter', path: '/counter', component: CounterExample, display: 'Counter', icon: 'graduation-cap', meta: { requiresLogin: true } },
    { name: 'fetch-data', path: '/fetch-data', component: FetchData, display: 'Data', icon: 'list' },
    {
        name: 'trello',
        path: '/study/trello/:bid',
        component: Trello,
        display: 'Trello',
        icon: 'list',
        children: [
            { name: 'card', path: 'c/:cid', component: Card }
        ]
    },
    { name: 'login', path: '/login', component: Login, display: 'login', icon: 'list' },
    { name: 'home', path: '/home', component: Home, display: 'Home', icon: 'graduation-cap' },
    { name: 'error', path: '/error', component: NotFound },
    { name: 'auth', path: '/auth', component: Auth, display: 'Auth', icon: 'graduation-cap' }

]