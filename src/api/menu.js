import request from '@/utils/request'
// 数据
export function getMenuList(query,current,size){
    return request({
        url:  `/system/menu/search`,
        method: 'post',
        data:{
            ...query,current,size
        }
    })
}
// 删除
export function deleteMenu(id){
    return request({
        url:  `/system/menu/${id}`,
        method: 'delete',
    })
}
