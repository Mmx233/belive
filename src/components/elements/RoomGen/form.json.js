export let General={
    main: [
        {label: "房间ID",key:"room", value: 1,min:1, disabled: false},
    ],
    switches: [
        {disabled: false,label: "显示消息弹幕",key:"show_danmaku", value: false},
        {disabled: false,label: "显示醒目留言(SC)",key:"show_super_chat", value: false},
        {disabled: false,label: "显示新舰长",key:"show_new_member", value: false},
        {disabled: false,label: "显示礼物",key:"show_gift", value: false},
        {disabled: false,label: "显示礼物信息",key:"show_gift_info", value: false},
        {disabled: false,label: "弹幕居下",key:"danmaku_at_bottom", value: false},
        {disabled: false,label: "底部显示SC固定栏",key:"ticker_at_bottom", value: false},
        {disabled: false,label: "合并相似弹幕",key:"merge_danmaku", value: false},
        {disabled: false,label: "合并礼物",key:"merge_gift", value: false},
        {disabled: false,label: "只显示翻译弹幕",key:"translated_danmaku_only", value: false},
    ],
    inputs: [
        {disabled: false,label: "翻译弹幕首字符",key:"translation_sign", value: "【"},
        {disabled: false,label: "打赏弹幕最低显示价格(元)",key:"min_gift_price", value: 0,type:"number",inputProps:{min:0}},
        {disabled: false,label: "打赏停驻栏最低显示价格(元)",key:"min_ticker_price", value: 0.1,type:"number",inputProps:{min:0,step:0.1}},
        {disabled: false,label: "最大弹幕数",key:"max_danmaku_num", value: 0,type:"number",inputProps:{min:0}},
        {disabled: false,label: "预留淡出弹幕数",key:"danmaku_fade_num", value: 3,type:"number",inputProps:{min:0}},
        {disabled: false,label: "弹幕停留时长(为0时持续停留)",key:"danmaku_pin_time", value: 0,type:"number",inputProps:{min:0}},
        {disabled: false,label: "图片插入方式",key:"image_show_type", value: "0",select:true,selection:[
                {label:"替换关键词(无需符号)",value:"0"},
                {label:"替换关键词(需符号)",value:"1"},
                {label:"在文字消息后添加",value:"2"},
            ]},
        {disabled: false,label: "最大图片数",key:"max_image_num", value: 2,type:"number",inputProps:{min:0}},
    ],
}