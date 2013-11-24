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
Bidding.render_biddings=function(current_activity,current_bid){
    var unique_bid_array,name ,winner=[]
    var bid_json=JSON.parse(localStorage.bids)
    var new_bid_json= _.find(bid_json,function(i_bid){
        return  i_bid.activity_id==current_activity &&i_bid.name==current_bid
    })
    unique_bid_array = get_unique_bid_array(new_bid_json.biddings)
        if (unique_bid_array != "") {
        name = find_name(current_activity, unique_bid_array[0].num[0].phone)
        unique_bid_array[0].num[0]['name'] = name
        winner.push(unique_bid_array[0].num[0])
        return winner
    }

}
function find_name(current_activity, phone) {
    var sign_ups_json = JSON.parse(localStorage.sign_ups)
    var new_sign_ups = _.filter(sign_ups_json, function (sign_up) {
        return sign_up.activity_id == current_activity
    })
    var find_info = _.find(new_sign_ups, function (sign_up) {
        if (sign_up.phone == phone) {
            return sign_up
        }
    })
    return find_info.name
}

function get_unique_bid_array(bid_info) {
    var person_bid_group_infos = [], bid_result_count = [], get_unique_bid_array = []
    person_bid_group_infos = _.groupBy(bid_info, function (num) {
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

