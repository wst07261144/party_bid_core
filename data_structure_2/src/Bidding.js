function Bid(phone, price) {
    this.phone = phone;
    this.price = price;
}
Bid.judge_has_signed=function(phone){
    var signed
    var activities=JSON.parse(localStorage.activities)
    _.each(activities[localStorage.current_activity_id].sign_ups,function(sign_up){
        if(Number(sign_up.phone)==Number(phone)){
            signed='true'
        }
    })
    return signed

}
Bid.judge_repeat_bid = function (phone) {
    var repeat
    var activities=JSON.parse(localStorage.activities)
    _.each(activities[localStorage.current_activity_id].biddings[localStorage.current_bid]
        ,function(sign_up){
        if(Number(sign_up.phone)==Number(phone)){
            repeat='true'
        }
    })
    return repeat
}

function process_bidding(bid, phone) {
    var activities=JSON.parse(localStorage.activities)
    var bidder=new Bid(phone, bid)
    if(Bid.judge_has_signed(phone)=='true'){
        if(Bid.judge_repeat_bid(phone)!='true'){
            activities[localStorage.current_activity_id].biddings[localStorage.current_bid].push(bidder)
            localStorage.activities = JSON.stringify(activities)
        }
    }
}

