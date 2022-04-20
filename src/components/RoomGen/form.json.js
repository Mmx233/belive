export function Range(AllForm,func){
    for(let space in AllForm) {
        let a=AllForm[space]
        for(let name in a) {
            let b=a[name]
            for(let key in b) {
                let r=func(space,name,key,b[key])
                if(typeof r==='boolean'&&!r){
                    return
                }
            }
        }
    }
}

export let General={
    main: {
        id: {label: "房间ID", value: 1, min: 1},
    },
    switches: {
        show_danmaku:{disabled: true,label: "显示消息弹幕", value: false},
        show_super_chat:{disabled: true,label: "显示醒目留言(SC)", value: false},
        show_new_member:{disabled: true,label: "显示新舰长", value: false},
        show_gift:{disabled: true,label: "显示礼物", value: false},
        show_gift_info:{disabled: true,label: "显示礼物信息", value: false},
        danmaku_at_bottom:{disabled: true,label: "弹幕居下", value: false},
        ticker_at_bottom:{disabled: true,label: "底部显示SC固定栏", value: false},
        merge_danmaku:{disabled: true,label: "合并相似弹幕", value: false},
        merge_gift:{disabled: true,label: "合并礼物", value: false},
        translated_danmaku_only:{disabled: true,label: "只显示翻译弹幕", value: false},
    },
    inputs: {
        translation_sign:{disabled: true,label: "翻译弹幕首字符", value: "【"},
        min_gift_price:{disabled: true,label: "打赏弹幕最低显示价格(元)", value: 0,type:"number",inputProps:{min:0}},
        min_ticker_price:{disabled: true,label: "打赏停驻栏最低显示价格(元)", value: 0.1,type:"number",inputProps:{min:0,step:0.1}},
        max_danmaku_num:{disabled: true,label: "最大弹幕数", value: 0,type:"number",inputProps:{min:0}},
        danmaku_fade_num:{disabled: true,label: "预留淡出弹幕数", value: 3,type:"number",inputProps:{min:0}},
        danmaku_pin_time:{disabled: true,label: "弹幕停留时长(为0时持续停留)", value: 0,type:"number",inputProps:{min:0}},
        image_show_type:{disabled: true,label: "图片插入方式", value: "0",select:true,selection:[
                {label:"替换关键词(无需符号)",value:"0"},
                {label:"替换关键词(需符号)",value:"1"},
                {label:"在文字消息后添加",value:"2"},
            ]},
        max_image_num:{disabled: true,label: "最大图片数", value: 2,type:"number",inputProps:{min:0}},
    },
}

export let Forbid = {
    switches:{
        block_gift_danmaku:{disabled: true,label: "屏蔽礼物弹幕", value: false},
        block_newbie:{disabled: true,label: "屏蔽非正式会员", value: false},
        block_no_mobile:{disabled: true,label: "屏蔽未绑定手机用户", value: false},
    },
    sliders: {
        block_level: {disabled: true, label: "屏蔽用户等级低于", value: 0, min: 0, max: 60},
        block_medal_level: {disabled: true, label: "屏蔽勋章等级低于", value: 0, min: 0, max: 40},
    },
    inputs: {
        block_keywords: {disabled: true, label: "屏蔽关键词", helperText: '使用换行分隔', multiline: true, value: ""},
        block_users: {disabled: true, label: "屏蔽用户", helperText: '使用换行分隔', multiline: true, value: ""}
    }
}

export let Test = {
    sliders: {
        min_test_danmaku_interval: {value: 2000},
        max_test_danmaku_interval: {value: 5000},
    },
}
