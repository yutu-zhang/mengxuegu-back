import request from '@/utils/request'

// 博客标签管理接口数据
export function getBlogLable(query,current,size){
    return request({
        url:'/article/label/search',
        method:'post',
        data:{
            ...query,current,size
        }
    })
}           
// 0查询正常状态下的
export function getNormalList(){
    return request({
        url:'/article/category/list',
        method:'GET'
    })
}
// 查询
export function findBlogLable(id){
    return request({
        url:`/article/label/${id}`,
        method:'GET',
    })
}
// 新增
export function addBlogLable(current,size){
    return request({
        url:'/article/label',
        method:'POST',
        data:{
            current,size
        }
    })
}
// 删除
export function deleBlogLable(id){
    return request({
        url:`/article/label/${id}`,
        method:'delete',
    })
}
// 修改
export function updataBlogLable(){
    return request({
        url:'/article/category',
        method:'PUT',
    })
}
