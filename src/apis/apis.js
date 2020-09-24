import api from 'axios'

api.defaults.baseURL=' http://127.0.0.1:5000'
// 1.登录api接口
export const login_api = params => api.post('/users/checkLogin',params)
// 2.添加账号api接口
export const addUser_api = params => api.post('/users/add',params)
// 3.获取账号列表api接口
export const accountList_api = params => api.get('/users/list',params)
// 4.获取删除账号api接口
export const removeUser_api = params => api.get('/users/del',params)
// 5.获取批量删除账号api接口
export const removeAll_api = params => api.get('/users/batchdel',params)
// 6.获取修改账号api接口
export const updateUser_api = params => api.post('/users/edit',params)
// 7.获取检查旧密码是否正确api接口
export const oldPwd_api = params => api.get('/users/checkoldpwd',params)
// 8.获取修改密码api接口
export const updatePwd_api = params => api.post('/users/editpwd',params)
// 9.获取账号信息api接口
export const accountinfo_api = params => api.get('/users/accountinfo',params)
// 10.获取头像上传接口api接口
export const avatar_api = params => api.get('/users/avatar_upload',params)


// ==========================关于商品API=================================
// 11.获取商品列表api接口
export const goodsList_api = params => api.get('/goods/list',params)
// 12.获取删除当前商品api接口
export const goodsDel_api = params => api.get('/goods/del',params)
// 13.获取修改当前商品api接口
export const goodsUpdate_api = params => api.post('/goods/edit',params)
// 14.获取商品分类api接口
export const catelist_api = params => api.get('/goods/catelist',params)
