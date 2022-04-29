import axios from 'axios'

export const Addr = 'http://127.0.0.1/api/'

export function Do(conf){
    return axios({
        method: conf.method,
        url: `${Addr}`+conf.url,
        params: conf.params,
        data: conf.data
    })
}

export function Get(conf){
    conf.method = 'GET'
    return Do(conf)
}

export function Post(conf){
    conf.method = 'POST'
    return Do(conf)
}

export function Put(conf){
    conf.method = 'PUT'
    return Do(conf)
}

export function Delete(conf){
    conf.method = 'DELETE'
    return Do(conf)
}
