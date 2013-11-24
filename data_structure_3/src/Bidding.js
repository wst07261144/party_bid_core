function Bidding(bid, phone) {
    this.phone = phone;
    this.price = bid;
}

Bidding.judge_has_signed = function (phone) {
    var signed
    var sign_ups_json = JSON.parse(localStorage.sign_ups)
    var new_sign_ups = _.filter(sign_ups_json, function (sign_up) {
        return sign_up.activity_id == localStorage.current_activity
    })
    _.each(new_sign_ups, function (sign_up) {
        if (Number(sign_up.phone) == Number(phone)) {
            signed = true
        }
    })
    return signed

}
Bidding.judge_repeat_bid = function (phone) {
    var repeat
    var bids_json = JSON.parse(localStorage.bids)
    var new_bid_json = _.filter(bids_json, function (i_bid) {
        return i_bid.activity_id == localStorage.current_activity &&
            i_bid.name == localStorage.current_bid
    })
    _.each(new_bid_json[0].biddings, function (sign_up) {
        if (Number(sign_up.phone) == Number(phone)) {
            repeat = true
        }
    })
    return repeat
}

function process_bidding(bid, phone) {
    var new_bid = new Bidding(bid, phone)
    var bids_json = JSON.parse(localStorage.bids)
    if (Bidding.judge_has_signed(phone)) {
        if (!Bidding.judge_repeat_bid(phone)) {
            var new_bid_json = _.map(bids_json, function (i_bid) {
                if (i_bid.activity_id == localStorage.current_activity &&
                    i_bid.name == localStorage.current_bid) {
                    i_bid.biddings.push(new_bid)
                }
                return i_bid
            })
            localStorage.bids = JSON.stringify(new_bid_json)
        }
    }
}
