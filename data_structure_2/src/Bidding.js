function Bid(phone, price) {
    this.phone = phone;
    this.price = price;
}
Bid.judge_has_signed = function (bid,phone) {
    var signed
    var activities = JSON.parse(localStorage.activities)
    _.each(activities[localStorage.current_activity].sign_ups, function (sign_up) {
        if (Number(sign_up.phone) == Number(phone)) {
            signed = 'true'
            return  Bid.judge_repeat_bid(bid,phone)
        }
    })
    return signed

}
Bid.judge_repeat_bid = function (bid,phone) {
    var repeat
    var activities = JSON.parse(localStorage.activities)
    _.each(activities[localStorage.current_activity].biddings[localStorage.current_bid]
        , function (sign_up) {
            if (Number(sign_up.phone) == Number(phone)) {
                repeat = 'true'
            }
        })
    if(repeat != 'true'){
        return Bid.save_bid(bid,phone)
    }
}
Bid.save_bid=function(bid,phone){
    var activities = JSON.parse(localStorage.activities)
    var bidder = new Bid(phone, bid)
    activities[localStorage.current_activity].biddings[localStorage.current_bid].push(bidder)
    localStorage.activities = JSON.stringify(activities)
}


function transform_bids_to_view_model(current_activity) {
    var activities = JSON.parse(localStorage.activities)
    return activities[current_activity].bids
}

function transform_biddings_to_view_model(current_activity, current_bid) {
    var winner = [], unique_bid_array
    var new_bid_info= Bid.add_name_for_bids(current_activity, current_bid)
    unique_bid_array = get_unique_bid_array(new_bid_info)
    if (unique_bid_array != "") {
        winner.push(unique_bid_array[0].num[0])
        return winner
    }
}
Bid.add_name_for_bids=function(current_activity, current_bid){
    var activities = JSON.parse(localStorage.activities)
    var bid_info = activities[current_activity].biddings[current_bid]
    return _.map(bid_info,function(i_bid){
       i_bid['name']=Bid.find_name(current_activity,i_bid.phone)
        return i_bid
    })
}
Bid.find_name=function(current_activity, phone) {
    var activities = JSON.parse(localStorage.activities)
    var bid_info = activities[current_activity].sign_ups
    var find_info = _.find(bid_info, function (sign_up) {
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

