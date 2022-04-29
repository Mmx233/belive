import {Get} from "./base";

export function AvatarUrl(uid) {
    return Get({
        url: `user/avatar`,
        params: {
            uid
        }
    });
}
