// 对api统一管理
import requests from './request'

// 登录操作
export const reqlogin=(data)=>requests({url:'/login',method:'POST',data})

// 获取学生信息
export const reqStudentList = (data) => requests({url: `/use/studentinfo/city/${data}`,method: 'GET'})

// 删除数据
export const reqdeletestudent=(data)=>requests({url:`/use/studentinfo/delete/${data}`,method:'DELETE'})

// 增加学生
export const reqaddstudent=(data)=>requests({url:'/use/studentinfo/add',method:'POST',data})

// 获取需要修改的学生信息
export const reqgettargetinfo=(data)=>requests({url:`/use/studentinfo/stunumber/${data}`,method:'GET'})

// 修改学生信息
export const reqchangestudent=(data)=>requests({url:'/use/studentinfo/change',method:'PUT',data})

// 模糊查询
export const reqselect=(data)=>requests({url:`/use/studentinfo/select?${data}`,method:'GET'})

// 注册操作
export const reqregister=(data)=>requests({url:'register',method:'POST',data})