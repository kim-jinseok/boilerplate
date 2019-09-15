import HomePage from '../../components/home-page'
import Auth from '../../components/auth.vue'
import reportState from '../../components/reportState'
import approvalState from '../../components/approvalState'
import approvalStateDetail from '../../components/approvalStateDetail'
import releaseStateDetail from '../../components/releaseStateDetail'
import getRecBoard from '../../components/getRecBoard'
import releasedState from '../../components/releasedState'
import searchResult from '../../components/searchResult'

// const requireAuth = (to, from, next) => {
//  const isAuth = localStorage.getItem('token')
//  //로그인 갔다가 다시 현재 페이지로 와야하기 때문에 현재 페이지 경로는 to에 들어있다
//  //${} 쿼리이기 때문에 인코딩 시켜준다.
//  const loginPath = `/login?rPath=${encodeURIComponent(to.path)}`

//  isAuth ? next() : next(loginPath)
//}

export const routes = [
	{
		name      : 'home-page',
		path      : '/home-page',
		component : HomePage,
		display   : 'HomePage',
		icon      : 'home',
		meta      : { requiresLogin: true }
	},
	{ name: 'auth', path: '/auth', component: Auth, display: 'Auth', icon: 'graduation-cap' },
	{ name: 'reportState', path: '/reportState', component: reportState, display: 'reportState' },
	{ name: 'approvalState', path: '/approvalState', component: approvalState, display: 'approvalState' },
	{
		name      : 'approvalStateDetail',
		path      : '/approvalStateDetail/:aid/:type',
		component : approvalStateDetail,
		display   : 'approvalStateDetail'
	},
	{
		name      : 'releaseStateDetail',
		path      : '/releaseStateDetail/:aid/:type',
		component : releaseStateDetail,
		display   : 'releaseStateDetail'
	},
	{ name: 'getRecBoard', path: '/getRecBoard/:bid', component: getRecBoard, display: 'getRecBoard' },
	{ name: 'releasedState', path: '/releasedState', component: releasedState, display: 'releasedState' },
	{
		name      : 'searchResult',
		path      : '/searchResult/:searchType/:searchValue',
		component : searchResult,
		display   : 'searchResult'
	}
]
