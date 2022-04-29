import {Get} from "./base";

export function Avatar(uid) {
    return Get({
        url: `/api/user/avatar/`,
        params: {
            uid
        }
    });
}
