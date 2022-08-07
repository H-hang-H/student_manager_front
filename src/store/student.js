import {
    reqStudentList,reqdeletestudent,reqaddstudent,reqchangestudent,reqgettargetinfo,reqselect
} from '@/api'

const state = {
    studentlist: [],
    targetinfo:{},
    // totallength:0
}
const actions = {
    // 获取学生所有信息
    async showstudentList({commit}, data) {
      await reqStudentList(data).then(res=>{
        // 将学生数据提交
        commit('SHOWSTUDENTLIST',res.data)
      })
    },
    // 删除学生信息
    async deletestu({commit},data){
        await reqdeletestudent(data).then(res=>{
            if(res.status===0){
                return 'ok'
            }else{
                return Promise.reject(new Error('fail'))
            }
        })
    } ,
    // 增加学生信息
    async addstudent({commit},data){
        let result=await reqaddstudent(data).then(res=>{
          return res
        })
        return result
    },
    // 获取需要修改的学生信息
    async gettargetstuinfo({commit},data){
        await reqgettargetinfo(data).then(res=>{
            if(res.status===0){
                commit('GETTARGETINFO',res.data[0])
            }else{
                return Promise.reject(new Error('fail'))
            }
        })
    },
    // 修改学生信息
    async changestudent({commit},data){
        let result=reqchangestudent(data).then(res=>{
          return res
        })
        return result
    } ,
    // 模糊查询
    async getselect({commit},data){
        let result=reqselect(data).then(res=>{
            if(res.status===0){
                commit('GETSELECT',res.data)
            }
            return res
        })
        return result
    }
}
const mutations = {
    SHOWSTUDENTLIST(state, data) {
       state.studentlist=data
    },
    GETTARGETINFO(state,data){
        state.targetinfo=data
    },
    GETSELECT(state,data){
        state.studentlist=data
    }
}

const getters={}
export default {
    actions,
    mutations,
    state,
    getters
}