function SignUp(name, phone) {
    this.name = name;
    this.phone = phone;
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

SignUp.judge_repeat_name = function (name,phone) {
    var repeat
    var activities = JSON.parse(localStorage.activities)
    _.map(activities[localStorage.current_activity].sign_ups, function (sign_up) {
        if (Number(sign_up.phone) == Number(phone)) {
            repeat = true
        }
    })
    if(!repeat){
        return SignUp.save_sign_up(name,phone)
    }

}
SignUp.save_sign_up=function(name,phone){
    var current_sign = new SignUp(name, phone)
    var activities = JSON.parse(localStorage.activities)
    activities[localStorage.current_activity].sign_ups.push(current_sign)
    localStorage.activities = JSON.stringify(activities)
}

SignUp.render_sign_ups = function (activity_name) {
    var activities = JSON.parse(localStorage.activities)
    return activities[localStorage.current_activity].sign_ups
}


