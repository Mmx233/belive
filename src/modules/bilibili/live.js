import {LiveWS} from 'bilibili-live-ws';
import Cookies from 'universal-cookie';

import {AvatarUrl as Avatar} from "../api/user";

export function ConnectDanmaku(room_id) {
    return new LiveWS(room_id)
}

export async function AvatarUrl(uid){
    const cookies = new Cookies();
    if(cookies.getAll()[`avatar-${uid}`]!==undefined) {
        return cookies.getAll()[`avatar-${uid}`]
    }
    try {
        const res=await Avatar(uid);
        cookies.set(`avatar-${uid}`,res.data.data,{maxAge:24*60*60})
        return res.data.data
    } catch (err) {
        console.log(err)
        return "https://static.hdslb.com/images/member/noface.gif"
    }
}
