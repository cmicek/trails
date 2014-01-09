/* Author: Chris Micek */

var PersonView  = function (attr){
  var self = this;
  ko.utils.extend(self, new LivingCreatureView(attr));
  


  function caloriesExpended(time, task){
    // Calories = weight * mph / 1.568 - Walking cal
  }

  // self.addActivity = function(id, time){
  //   var attr = ActivitiesModel[id];
  //   attr.timePerformed = time;
  //   self.activities.push(new ActivityView(attr));
  // }
  // self.removeActivity = function(activity){
  //   self.activities.remove(activity);
  // }
}