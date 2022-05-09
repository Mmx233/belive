import {LiveWS} from 'bilibili-live-ws';
import {AvatarUrl as Avatar} from "../api/user";

export function ConnectDanmaku(room_id) {
    return new LiveWS(room_id)
}

export async function AvatarUrl(uid){
    let raw = localStorage.getItem(`avatar-${uid}`)
    if(raw!==undefined) {
        let data=JSON.parse(raw)
        if(data.expire>Date.now()) {
            return data.url
        }
    }
    try {
        const res=await Avatar(uid);
        localStorage.setItem(`avatar-${uid}`,JSON.stringify({
            expire:Date.now()+1000*60*60*24,
            url:res.data.data
        }))
        return res.data.data
    } catch (err) {
        console.log(err)
        return "https://static.hdslb.com/images/member/noface.gif"
    }
}
