import Home from '../../components/home'
import Auth from '../../components/auth'



// const requireAuth = (to, from, next) => {
//  const isAuth = localStorage.getItem('token')
//  //로그인 갔다가 다시 현재 페이지로 와야하기 때문에 현재 페이지 경로는 to에 들어있다
//  //${} 쿼리이기 때문에 인코딩 시켜준다.
//  const loginPath = `/login?rPath=${encodeURIComponent(to.path)}`

//  isAuth ? next() : next(loginPath)
//}


export const routes = [
    { name: 'main', path: '/', component: Home, display: 'About Template', icon: 'info' },
    { name: 'auth', path: '/auth', component: Auth, display: 'Auth', icon: 'graduation-cap' }

]