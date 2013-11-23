function bid(name) {
    this.name = name;
    this.biddings = [];
}

bid.create_new_bid = function (activity_name) {
    var counter = Number(localStorage.counter || '0') + 1
    var bid_content = new bid("竞价" + counter);
    var local_activities = _.map(JSON.parse(localStorage.activities), function (i_activity) {
        if (i_activity.name == activity_name) {
            i_activity.bids.push(bid_content)
        }
        return  i_activity
    })
    localStorage.activities = JSON.stringify(local_activities);
    localStorage.counter = counter;
}
bid.get_activity_info_of_bid = function (activity_name, bid_name) {
    var activity_info = bidding.find_current_activity_info(activity_name)
    return _.find(activity_info.bids, function (i_bid) {
        if (i_bid.name == bid_name) {
            return i_bid
        }
    })
}
bid.get_bid_info = function (activity_name, bid_name) {
    return _.map(bid.get_activity_info_of_bid(activity_name, bid_name).biddings, function (i_bid_info) {
        return i_bid_info
    })
}
function transform_biddings_to_view_model(activity_name, bid_name) {
    var bid_result_count = [], get_unique_bid_array = [], person_bid_group_infos, winner = [];
    person_bid_group_infos = _.groupBy(bid.get_bid_info(activity_name, bid_name), function (num) {
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
    if (get_unique_bid_array != "") {
        winner.push(get_unique_bid_array[0].num[0])
        return winner
    }
}

function transform_bids_to_view_model(activity_name) {
    var activity_info = bidding.find_current_activity_info(activity_name)
    return _.map(activity_info.bids, function (i_bid) {
        return i_bid
    })
}

