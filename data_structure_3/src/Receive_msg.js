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
    if(localStorage.is_signing_up=='true'){
        return SignUp.judge_repeat_name(name,phone)
    }
}
function process_bidding(bid, phone) {
//    var new_bid = new Bidding(bid, phone)
//    var bids_json = JSON.parse(localStorage.bids)
//    if (Bidding.judge_has_signed(phone)) {
//        if (!Bidding.judge_repeat_bid(phone)) {
//            var new_bid_json = _.map(bids_json, function (i_bid) {
//                if (i_bid.activity_id == localStorage.current_activity &&
//                    i_bid.name == localStorage.current_bid) {
//                    i_bid.biddings.push(new_bid)
//                }
//                return i_bid
//            })
//            localStorage.bids = JSON.stringify(new_bid_json)
//        }
//    }
    if(localStorage.is_bidding == "true"){
        return Bidding.judge_has_signed(bid,phone)
    }
}
