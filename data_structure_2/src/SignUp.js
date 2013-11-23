function SignUp(name,phone){
   this.name=name;
    this.phone=phone;
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
function notify_sms_received(sms_json){
    var SMSObj = SignUp.change_to_obj(sms_json)
    var mark = SMSObj.text.substring(0, 2).toUpperCase()
    var phone = SMSObj.phone
    if (localStorage.is_signing_up == 'true') {
        if (mark == "BM") {
            var name = SMSObj.text.substring(2).replace(/^\s+|\s+$/g, '')
            return process_activity_sign_up(name, phone)
        }
    }
    if (localStorage.is_bidding == "true") {
        if (mark == 'JJ') {
            var bid = SMSObj.text.substring(2).replace(/^\s+|\s+$/g, '')
            return process_bidding(bid, phone)
        }
    }
}
function process_activity_sign_up(name,phone){
    var current_sign = new SignUp(name, phone)
    var activities= JSON.parse(localStorage.activities)
    if(!SignUp.judge_repeat_name(phone)){
        activities[localStorage.current_activity].sign_ups.push(current_sign)
        localStorage.activities=JSON.stringify(activities)
    }
}

SignUp.judge_repeat_name = function (phone) {
    var repeat
    var activities= JSON.parse(localStorage.activities)
    _.map(activities[localStorage.current_activity].sign_ups, function (sign_up) {
        if (Number(sign_up.phone) == Number(phone)) {
            repeat = true
        }
    })
    return repeat
}

SignUp.render_sign_ups = function (activity_name) {
    var activities= JSON.parse(localStorage.activities)
    return activities[localStorage.current_activity].sign_ups
}


