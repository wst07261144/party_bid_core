function SignUp(name, phone) {
    this.name = name;
    this.phone = phone;
}

SignUp.judge_repeat_name = function (sign_ups, phone) {
    var repeat
    _.map(sign_ups, function (sign_up) {
        if (Number(sign_up.phone) == Number(phone)) {
            repeat = true
        }
    })
    return repeat
}
SignUp.change_to_obj = function (sms_json) {
    var SMSObj;
    _.each(sms_json.messages, function (message) {
        SMSObj = {
            "text": message.message.replace(/^\s+|\s+$/g, ''),
            "phone": message.phone
        }
    })
    return SMSObj
}

SignUp.render_sign_ups = function (activity_name) {
    var current_sign = _.find(JSON.parse(localStorage.activities), function (i_activity) {
        if (i_activity.name == activity_name) {
            return  i_activity
        }
    })
    return _.map(current_sign.sign_ups, function (sign_up) {
        return sign_up
    })
}

function notify_sms_received(sms_json) {
    var SMSObj = SignUp.change_to_obj(sms_json)
    var mark= SMSObj.text.substring(0,2).toUpperCase()
    var phone = SMSObj.phone
    if (localStorage.is_signing_up == 'true') {
        if(mark=="BM"){
            var name = SMSObj.text.substring(2).replace(/^\s+|\s+$/g, '')
            return process_activity_sign_up(name,phone)
        }
    }
    if(localStorage.is_bidding=="true"){
        if(mark=='JJ'){
            var bid=SMSObj.text.substring(2).replace(/^\s+|\s+$/g, '')
            return process_bidding(bid,phone)
        }
    }
}

function process_activity_sign_up(name,phone){
    var current_sign = new SignUp(name, phone)
    var local_activity_list = _.map(JSON.parse(localStorage.activities), function (i_activity) {
        if (i_activity.name == localStorage.current_activity) {
            if (!SignUp.judge_repeat_name(i_activity.sign_ups, phone)) {
                i_activity.sign_ups.push(current_sign)
            }
        }
        return i_activity
    })
    localStorage.activities = JSON.stringify(local_activity_list)
}