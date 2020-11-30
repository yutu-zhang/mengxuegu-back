import request from '../utils/request'
// 文章管理
// 获取列表数据
export function getArticleList (query,current=1,size=20){
    return request({
       method:'post',
       url:'/article/article/search',
       data:{
        ...query, current, size
        }
    })
}
// 删除列表数据
export function deleteArticle (id){
    return request({
       url:`/article/article/${id}`,
       method:'delete',
    })
}

// 查询
export function getById(id){
    return request({
        url: `/article/article/${id}`,
        method: 'get'
    })
}

//获取所有正常状态的分类和标签
export function getCategoryAndLabel(){
    return request({
        url: `/article/category/label/list`, 
        method: 'get'
    })
}