import {LiveWS} from 'bilibili-live-ws';

export function ConnectDanmaku(room_id) {
    return new LiveWS(room_id)
}

export function AvatarUrl(uid){
    return `https://chat.loliloli.net/api/avatar_url?uid=${uid}`
}
