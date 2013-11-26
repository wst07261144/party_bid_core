function Activity(activity_name){
    this.id=localStorage.activity_id_generator;
    this.name=activity_name;
}

Activity.prototype.create=function(){
    var activities_json=JSON.parse(localStorage.activities)
    activities_json.push(this)
    localStorage.activities=JSON.stringify(activities_json)
    localStorage.current_activity= localStorage.activity_id_generator
    var id=Number(localStorage.activity_id_generator)+1
    localStorage.activity_id_generator=id
}