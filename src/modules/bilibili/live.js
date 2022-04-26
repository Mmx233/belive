import {LiveWS} from 'bilibili-live-ws';
import axios from 'axios';
import Cookies from 'universal-cookie';

export function ConnectDanmaku(room_id) {
    return new LiveWS(room_id)
}

export async function AvatarUrl(uid){
    const cookies = new Cookies();
    if(cookies.get[`avatar-${uid}`]!==undefined) {
        return cookies[`avatar-${uid}`]
    }
    try {
        const res=await axios.get(`https://api.bilibili.com/x/space/acc/info?mid=${uid}`)
        cookies.set(`avatar-${uid}`,res.data.data.info['face'],{maxAge:24*60*60})
        return res.data.data.info['face']
    } catch (err) {
        console.log(err)
        return "https://static.hdslb.com/images/member/noface.gif"
    }
}
