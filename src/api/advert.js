import request from '@/utils/request'
// 广告

// 获取列表数据
export function getAdvertList (query,current=1,size=20){
    return request({
        method:'post',
       url:'/article/advert/search',
       data:{
        ...query, current, size
        }
    })
}

// 获取删除接口
export function deleteAdvert(id){
    return request({
        url:`/article/advert/${id}`,
        method:'delete',
    })
}

// 新增
export function addAdvert(current,size){
    return request({
        url:'/article/advert',
        method:'POST',
        data:{
            current,size
        }
    })
}

// 修改
export function updataAdvert(data){
    return request({
        url:'/article/advert',
        method:'PUT',
        data
    })
}

// 0正常状态下查询 ID
export function getAdverId(id){
    return request({
        url: `/article/advert/${id}`,
        method:'GET'
    })
}


// 上传图片
export function uploadImg(data={}){
    return request({
        url: `/article/file/upload`,
        method: 'post',
        data // data: data 简写   
    })
}
// 删除图片
export function deleteImg(imgUrl){
    return request({
        url: `/article/file/delete`,
        method: 'delete',
        params: {'fileUrl': imageUrl}  
    })
}