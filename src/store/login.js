import {
    reqlogin
} from "@/api"
import {setToken} from '../utils/toekn'

const actions = {
    // 实现登录，token
    getlogin({commit}, data) {
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
    }
}
const mutations = {
    GETLOGIN(state,token){
        state.token=token
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