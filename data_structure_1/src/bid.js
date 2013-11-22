
function bid(name){
    this.name=name;
    this.biddings=[];
}

bid.create_new_bid=function(activity_name){
    var counter=Number(localStorage.counter||'0')+1
    var bid_content=new bid("竞价"+counter);
    var local_activities=_.map(JSON.parse(localStorage.activities),function(i_activity){
        if(i_activity.name==activity_name){
            i_activity.bids.push(bid_content)
        }
        return  i_activity
    })
    localStorage.activities=JSON.stringify(local_activities);
    localStorage.counter=counter;
}
