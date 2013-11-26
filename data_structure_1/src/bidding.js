function bidding(name, phone, price) {
    this.name = name;
    this.phone = phone;
    this.price = price;
}

bidding.find_current_activity_info = function () {
    return  _.find(JSON.parse(localStorage.activities), function (i_activity) {
        return i_activity.name == localStorage.current_activity
    })
}
bidding.find_current_bid_info = function () {
    var bids=[]
    _.find(bidding.find_current_activity_info().bids, function (i_bid) {
        if(i_bid.name == localStorage.current_bid){
            bids.push(i_bid)
        }
    })
    return bids
}

bidding.get_name = function (bid,phone) {
    var current_name;
    var current_activity_info = bidding.find_current_activity_info()
    _.map(current_activity_info.sign_ups, function (i_sign) {
        if (i_sign.phone == phone) {
            current_name = i_sign.name
        }
    })
    if(current_name){
        localStorage.current_name=current_name
        return bidding.judge_repeat_name(bid,phone)
    }
}

bidding.judge_repeat_name = function (bid, phone) {
    var repeat
    var current_bid_info=bidding.find_current_bid_info()
    _.find(current_bid_info[0].biddings, function (j_bid) {
            if (Number(j_bid.phone) == Number(phone)) {
                repeat = "true"
            }
    })
    if(repeat!='true'){
        return bidding.save_bid(bid,phone)
    }
}
bidding.save_bid=function(bid,phone){
    var local_activity_list = _.map(JSON.parse(localStorage.activities), function (i_activity) {
        if (i_activity.name == localStorage.current_activity) {
            _.map(i_activity.bids, function (i_bid) {
                if (i_bid.name == localStorage.current_bid) {
                    var bidder = new bidding(localStorage.current_name, phone, bid)
                    i_bid.biddings.push(bidder)
                }
                return i_bid
            })
        }
        return i_activity
    })
    localStorage.activities = JSON.stringify(local_activity_list)
}



