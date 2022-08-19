import {
    reqlogin
} from "@/api"
import {setToken,removeToken} from '../utils/toekn'

const actions = {
    // 实现登录，token
    async getlogin({commit}, data) {
        let result=reqlogin(data).then(res=>{
            if(res.status===0){
                commit('GETLOGIN',res.token)
                // token不能持久化，将token存到浏览器
                setToken(res.token)
                return res
            }else{
                return res
            }
        }) 
        return result
    },
    // 退出登录，清除token
    logout({commit}){
        commit('CLEAR')
    }
}
const mutations = {
    GETLOGIN(state,token){
        state.token=token
    },
    CLEAR(state){
        state.token='',
        removeToken()
    }
}
const state = {
    token:''
}
const getters = {

}
export default {
    actions,
    mutations,
    state,
    getters
}