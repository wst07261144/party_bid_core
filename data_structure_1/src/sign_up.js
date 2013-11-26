function SignUp(name, phone) {
    this.name = name;
    this.phone = phone;
}

SignUp.find_sign_ups_of_current=function(){
    return _.find(JSON.parse(localStorage.activities),function(i_activity){
        return i_activity.name == localStorage.current_activity
    })
}
SignUp.judge_repeat_name = function (name,phone) {
    var repeat
    var sign_ups= SignUp.find_sign_ups_of_current()
    _.find(sign_ups.sign_ups,function(sign_up){
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
    var local_activity_list = _.map(JSON.parse(localStorage.activities), function (i_activity) {
       if (i_activity.name == localStorage.current_activity) {
            i_activity.sign_ups.push(current_sign)
        }
        return i_activity
    })
    localStorage.activities = JSON.stringify(local_activity_list)
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

