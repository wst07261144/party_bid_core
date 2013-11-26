function Bid(name) {
    this.name = name;
    this.activity_id = localStorage.current_activity
    this.biddings = [];
}

Bid.create_new_bid = function (current_id) {
    var current_bid = _.filter(JSON.parse(localStorage.bids), function (bid) {
        return bid.activity_id == current_id
    })
    var name = '竞价' + (Number(current_bid.length) + 1)
    localStorage.current_bid = name
    var bids_json = JSON.parse(localStorage.bids)
    bids_json.push(new Bid(name))
    localStorage.bids = JSON.stringify(bids_json)
}

Bid.render_bids = function (current_activity) {
    var bids_json = JSON.parse(localStorage.bids)
    var new_bids_json = _.filter(bids_json, function (bid) {
        return bid.activity_id == current_activity
    })
    return new_bids_json
}


