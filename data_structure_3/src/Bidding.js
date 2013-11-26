function Bidding(bid, phone) {
    this.phone = phone;
    this.price = bid;
}

Bidding.judge_has_signed = function (bid, phone) {
    var signed
    var sign_ups_json = JSON.parse(localStorage.sign_ups)
    var new_sign_ups = _.filter(sign_ups_json, function (sign_up) {
        return sign_up.activity_id == localStorage.current_activity
    })
    _.each(new_sign_ups, function (sign_up) {
        if (Number(sign_up.phone) == Number(phone)) {
            signed = true
            return Bidding.judge_repeat_bid(bid, phone)
        }
    })
}
Bidding.judge_repeat_bid = function (bid, phone) {
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
    if (!repeat) {
        return Bidding.save_bid(bid, phone)
    }
}
Bidding.save_bid = function (bid, phone) {
    var new_bid = new Bidding(bid, phone)
    var bids_json = JSON.parse(localStorage.bids)
    var new_bid_json = _.map(bids_json, function (i_bid) {
        if (i_bid.activity_id == localStorage.current_activity &&
            i_bid.name == localStorage.current_bid) {
            i_bid.biddings.push(new_bid)
        }
        return i_bid
    })
    localStorage.bids = JSON.stringify(new_bid_json)

}
Bidding.render_biddings = function (current_activity, current_bid) {
    var unique_bid_array, name , winner = []
    var new_bidding = Bidding.add_names_for_bidding(current_activity, current_bid)
    unique_bid_array = Bidding.get_unique_bid_array(new_bidding)
    if (unique_bid_array != "") {
        winner.push(unique_bid_array[0].num[0])
        return winner
    }
}
Bidding.add_names_for_bidding = function (current_activity, current_bid) {
    var bid_json = JSON.parse(localStorage.bids)
    var new_bid_json = _.find(bid_json, function (i_bid) {
        return  i_bid.activity_id == current_activity && i_bid.name == current_bid
    })
    return _.map(new_bid_json.biddings, function (bid) {
        var name_ = Bidding.find_name(bid.phone)
        bid['name'] = name_
        return bid
    })
}
Bidding.find_name = function (phone) {
    var sign_ups_json = JSON.parse(localStorage.sign_ups)
    var new_sign_ups = _.filter(sign_ups_json, function (sign_up) {
        return sign_up.activity_id == localStorage.current_activity
    })
    var find_info = _.find(new_sign_ups, function (sign_up) {
        if (sign_up.phone == phone) {
            return sign_up
        }
    })
    return find_info.name
}
Bidding.get_unique_bid_array = function (bid_info) {
    var bid_result_count = [], get_unique_bid_array = []
    var person_bid_group_infos = _.groupBy(bid_info, function (num) {
        return Number(num.price);
    });
    _.map(person_bid_group_infos, function (value, key) {
        var temp = person_bid_group_infos[key] = value;
        bid_result_count.push({"bid": key, "num": temp});
    })
    _.map(bid_result_count, function (obj) {
        if (obj.num.length == 1) {
            get_unique_bid_array.push(obj);
        }
    })
    return get_unique_bid_array
}