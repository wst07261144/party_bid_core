function SignUp(name, phone) {
    this.name = name;
    this.phone = phone;
    this.activity_id=localStorage.current_activity;
}

SignUp.prototype.create=function(){
    var sign_up_json=JSON.parse(localStorage.sign_ups)
    sign_up_json.push(this)
    localStorage.sign_ups=JSON.stringify(sign_up_json)
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
function notify_sms_received(sms_json) {
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
function process_activity_sign_up(name, phone) {
    if (!SignUp.judge_repeat_name(phone)) {
        new SignUp(name,phone).create()
    }
}

SignUp.judge_repeat_name = function (phone) {
    var repeat
    var current_sign_up= _.filter(JSON.parse(localStorage.sign_ups),function(sign_up){
        return sign_up.activity_id==localStorage.current_activity
    })
    _.each(current_sign_up,function(sign_up){
        if(sign_up.phone==phone){
            repeat=true
        }
    })
    return repeat
}





