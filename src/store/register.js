import { reqregister } from "@/api";
const state={}
const actions={
    async getregister({commit},data){
        let result=reqregister(data).then(res=>{
            console.log(res);
            return res
        })
        return result
    }
}
const mutations={}
const getters={}

export default {
    state,
    actions,
    mutations,
    getters
}