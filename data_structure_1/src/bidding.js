function bidding(name, phone, price) {
    this.name = name;
    this.phone = phone;
    this.price = price;
}

bidding.find_current_activity_info = function (activity_name) {
    return  _.find(JSON.parse(localStorage.activities), function (i_activity) {
        if (i_activity.name == activity_name) {
            return  i_activity
        }
    })
}
bidding.get_name = function (phone) {
    var current_name;
    var current_activity_info = bidding.find_current_activity_info(localStorage.current_activity)
    _.map(current_activity_info.sign_ups, function (i_sign) {
        if (i_sign.phone == phone) {
            current_name = i_sign.name
        }
    })
    return current_name
}

bidding.judge_repeat_name = function (i_bids, phone) {
    var repeat
    _.find(i_bids.biddings, function (j_bid) {
        if (j_bid != []) {
            if (Number(j_bid.phone) == Number(phone)) {
                repeat = "true"
            }
        }
    })
    return repeat
}

function process_bidding(bid, phone) {
    if (bidding.get_name(phone)) {
        var local_activity_list = _.map(JSON.parse(localStorage.activities), function (i_activity) {
            if (i_activity.name == localStorage.current_activity) {
                _.map(i_activity.bids, function (i_bid) {
                    if (i_bid.name == "竞价" + Number(localStorage.counter)) {
                        if (bidding.judge_repeat_name(i_bid, phone) != "true") {
                            var bidder = new bidding(bidding.get_name(phone), phone, bid)
                            i_bid.biddings.push(bidder)
                        }
                    }
                    return i_bid
                })
            }
            return i_activity
        })
        localStorage.activities = JSON.stringify(local_activity_list)
    }
}
