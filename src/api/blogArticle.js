import request from '../utils/request'
//获取列表
export function getArtidleList(current, size) {
    return request({
        url: `/article/article/search`,
        method: 'POST',
        dat: {
            current,
            size
        }
    })
}
//删除单行
export function DelArtidleList(id) {
    return request({
        url: `/article/article/${id}`,
        method: 'DELETE',

    })
}
//查询当前行
export function ShowArtidleList(id) {
    return request({
        url: `/article/article/${id}`,
        method: 'GET',
    })
}