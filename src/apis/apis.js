import api from 'axios'

api.defaults.baseURL=' http://127.0.0.1:5000'
// 登录api接口
export const login_api = params => api.post('/users/checkLogin',params)
// 添加账号api接口
export const addUser_api = params => api.post('/users/add',params)
// 获取账号列表api接口
export const accountList_api = params => api.get('/users/list',params)
// 获取删除账号api接口
export const removeUser_api = params => api.get('/users/del',params)
// 获取批量删除账号api接口
export const removeAll_api = params => api.get('/users/batchdel',params)
// 获取修改账号api接口
export const updateUser_api = params => api.post('/users/edit',params)
// 获取检查旧密码是否正确api接口
export const oldPwd_api = params => api.get('/users/checkoldpwd',params)
// 获取修改密码api接口
export const updatePwd_api = params => api.post('/users/editpwd',params)
// 获取账号信息api接口
export const accountinfo_api = params => api.post('/users/accountinfo',params)

