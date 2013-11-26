function Activity(activity_name) {
    this.name = activity_name;
    this.sign_ups = [];
    this.bids = [];
    this.biddings = {};
}

Activity.prototype.create = function () {
    var activities = JSON.parse(localStorage.activities)
    var id = localStorage.activity_id_generator;
    activities[id] = this
    localStorage.current_activity = id
    localStorage.activities = JSON.stringify(activities)
    var ids = JSON.parse(localStorage.activity_ids)
    ids.push(id)
    localStorage.activity_ids = JSON.stringify(ids)
    localStorage.activity_id_generator = JSON.stringify(parseInt(id) + 1)
}

