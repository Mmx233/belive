export function Random(min, max) {
    return Math.round(Math.random() * (max - min)) + min;
}

export default function GenMsg() {
    switch (/*Math.round(Math.random() * 0)*/0) {
        default:
            return {
                "cmd": "DANMU_MSG",
                "info": [
                    [
                        0,
                        1,
                        25,
                        Random(16777666,16777777),
                        new Date().getTime(),
                        Math.floor(new Date().getTime()/1000),
                        0,
                        "be123456",
                        0,
                        0,
                        0,
                        "",
                        0,
                        "{}",
                        "{}",
                    ],
                    Math.floor(new Date().getTime()).toString(16), //msg
                    [
                        Random(326778080,326778100), //uid
                        "Tester",
                        0,
                        0,
                        0,
                        10000,
                        1,
                        ""
                    ],
                    [],
                    [
                        10,
                        0,
                        9868900,
                        ">50000",
                        1
                    ],
                    [
                        "",
                        ""
                    ],
                    0,
                    0,
                    null,
                    {
                        "ts": Math.floor(new Date().getTime()/1000),
                        "ct": new Date().getTime().toString(16)
                    },
                    0,
                    0,
                    null,
                    null,
                    0,
                    210
                ]
            }
    }
}
