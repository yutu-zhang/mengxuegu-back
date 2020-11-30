import request from '@/utils/request'

// 数据
export function getRoleList(query,current=1,size=20){
    return request({
        url: `/system/role/search`,
        method: 'post',
        data:{
        ...query, current, size
        }
    })
}

// 删除
export function deleteRoleList(id){
    return request({
        url: `/system/role/${id}`,
        method: 'delete',
    })
}

// 新增
export function addRole(){
    return request({
        url: `/system/role`,
        method: 'post',
    })
}

// 获取单条ID
export function findIdRole(id){
    return request({
        url: `/system/role/${id}`,
        method: 'get',
    })
}

// 获取单条ID
export function updataRole(){
    return request({
        url: `/system/role`,
        method: 'put',
    })
}

// 分配权限 获取菜单id 
export function getMenuIdsByRoleId(id){
    return request({
        url: `/system/role/${id}/menu/ids`,
        method: 'get',
    })
}

// 分配
export function saveRoleMenu(id,menuIds){
    return request({
        url: `/system/role/${id}/menu/save`,
        method: 'post',
        data:menuIdsz
    })
}

