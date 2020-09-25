import api from 'axios'

api.defaults.baseURL=' http://127.0.0.1:5000'

// ===============================账号管理API================================
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
export const accountinfo_api = params => api.get('/users/accountinfo',params)
// 验证token是否过期api接口
export const token_api = params => api.get('/users/checktoken',params)


// ==========================商品管理API=================================
// 获取添加分类api接口
export const addcate_api = params => api.post('/goods/addcate',params)
// 获取商品分类api接口
export const catelist_api = params => api.get('/goods/catelist',params)
// 获取删除分类api接口
export const delcate_api = params => api.get('/goods/delcate',params)
// 获取修改分类api接口
export const editcate_api = params => api.post('/goods/editcate',params)
// 获取商品列表api接口
export const goodsList_api = params => api.get('/goods/list',params)
// 获取删除当前商品api接口
export const goodsDel_api = params => api.get('/goods/del',params)
// 获取修改当前商品api接口
export const goodsUpdate_api = params => api.post('/goods/edit',params)
// 获取所有分类api接口
export const categories_api = params => api.get('/goods/categories',params)
// 获取添加商品api接口
export const addGoods_api = params => api.post('/goods/add',params)

// ==========================订单管理API=================================
// 获取订单列表api接口
export const orderList_api = params => api.get('/order/list',params)
// 获取订单详情api接口
export const detail_api = params => api.get('/order/detail',params)


