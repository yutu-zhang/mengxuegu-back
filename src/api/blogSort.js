import request from '@/utils/request'

// 博客分类管理接口数据
export function getBlogSort(query,current,size){
    return request({
        url:'/article/category/search',
        method:'post',
        data:{
            ...query,current,size
        }
    })
}
// 新增
export function addBlogSort(current,size){
    return request({
        url:'/article/category',
        method:'POST',
        data:{
            current,size
        }
    })
}
// 删除
export function deleBlogSort(id){
    return request({
        url:`/article/category/${id}`,
        method:'delete',
    })
}
// 查询
export function findBlogSort(id){
    return request({
        url:`/article/category/${id}`,
        method:'GET',
    })
}
// 修改
export function updataBlogSort(){
    return request({
        url:'/article/category',
        method:'PUT',
    })
}