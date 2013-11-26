function notify_sms_received(sms_json) {
    var SMSObj = SignUp.change_to_obj(sms_json)
    var mark = SMSObj.text.substring(0, 2).toUpperCase()
    var phone = SMSObj.phone
    if (mark == "BM") {
        var name = SMSObj.text.substring(2).replace(/^\s+|\s+$/g, '')
        return process_activity_sign_up(name, phone)
    }
    if (mark == 'JJ') {
        var bid = SMSObj.text.substring(2).replace(/^\s+|\s+$/g, '')
        return process_bidding(bid, phone)
    }
}
function process_activity_sign_up(name, phone) {
    if (localStorage.is_signing_up == 'true') {
        return SignUp.judge_repeat_name(name, phone)
    }
}
function process_bidding(bid, phone) {
    if (localStorage.is_bidding == "true") {
        return Bid.judge_has_signed(bid, phone)
    }

}
