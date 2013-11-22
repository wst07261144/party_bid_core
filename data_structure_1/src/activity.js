function Activity(activity_name) {

    this.name = activity_name;
    this.sign_ups = [];
    this.bids = []
}

Activity.prototype.create = function () {
    var local_activity_list = JSON.parse(localStorage.activities)
    local_activity_list.push(this)
    localStorage.activities = JSON.stringify(local_activity_list)
}
Activity.prototype.active = function () {
    localStorage.current_activity = this.name
}