import VueRouter from 'vue-router'
import Vue from 'vue'
Vue.use(VueRouter)
import store from '../store'
import Home from '../pages/Home.vue'
import Manager from '../pages/Manager.vue'
import Order from '../pages/Order.vue'
import Project from '../pages/Project.vue'
import Login from '../pages/Login.vue'
import Register from '../pages/Register.vue'
import Student from '../pages/Student.vue'
import Teacher from '../pages/Teacher.vue'
import login from '@/store/login'

const router = new VueRouter({

    routes: [{
            path: '/home',
            component: Home,
            meta: {
                show: true,
                requireAuth: true
            },
            children: [{
                    path: 'student',
                    name: 'students',
                    component: Student,
                    meta: {
                        show: true
                    },
                },
                {
                    path: 'teacher',
                    name: 'teachers',
                    component: Teacher,
                    meta: {
                        show: true
                    },
                }
            ]
        },
        {
            path: '/manager',
            component: Manager,
            meta: {
                show: true,
                requireAuth: true
            }
        },
        {
            path: '/order',
            component: Order,
            meta: {
                show: true,
                requireAuth: true
            }
        },
        {
            path: '/project',
            component: Project,
            meta: {
                show: true,
                requireAuth: true
            }
        },
        {
            path: '/login',
            component: Login,
            meta: {
                show: false,
            }
        },
        {
            path: '/register',
            component: Register,
            meta: {
                show: false
            }
        },
        {
            path: '/',
            redirect: '/login'
        }
    ]
})
// router.beforeEach((to, from, next) => {
//     if (to.meta.requireAuth) {  // 判断该路由是否需要登录权限
//         console.log(store.state.login.flag)
//         if (store.state.login.flag) {  // 通过vuex state获取当前的token是否存在
//             next();
//         }
//         else {
//             next({
//                 path: '/login',
//                 query: {redirect: to.fullPath}  // 将跳转的路由path作为参数，登录成功后跳转到该路由
//             })
//         }
//     }
//     else {
//         next();
//     }
// })
export default router