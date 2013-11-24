function bidding() {

}

bidding.create_new_bid = function (activity_id) {
    var activities = JSON.parse(localStorage.activities)
    var num = Number(activities[activity_id].bids.length) + 1
    var bid_name = '竞价' + num;
    activities[activity_id].bids.push(bid_name)
    activities[activity_id].biddings[bid_name] = []
    localStorage.current_bid = bid_name
    localStorage.activities = JSON.stringify(activities)
}


