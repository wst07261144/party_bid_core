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

SignUp.judge_repeat_name = function (name,phone) {
    var repeat
    var current_sign_up= _.filter(JSON.parse(localStorage.sign_ups),function(sign_up){
        return sign_up.activity_id==localStorage.current_activity
    })
    _.each(current_sign_up,function(sign_up){
        if(sign_up.phone==phone){
            repeat=true
        }
    })
    if(!repeat){
        return SignUp.create_activity(name,phone)
    }
}
SignUp.create_activity=function(name,phone){
    new SignUp(name,phone).create()
}

SignUp.render_sign_ups = function (activity_name) {
    var current_sign_up= _.filter(JSON.parse(localStorage.sign_ups),function(sign_up){
        return sign_up.activity_id==localStorage.current_activity
    })
    return  current_sign_up
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

