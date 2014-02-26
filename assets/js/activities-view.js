/* Author: Chris Micek */
var ActivityView  = function (attr){
  var self = this;

  self.name           = attr.name;
  self.id             = attr.id;
  self.timePerformed  = ko.observable(attr.timePerformed);

  // Private Functions
  
  // self.perform = function (self) {
  //   ActivitiesModel[self.id].perform(self);
  // }
  // self.remove = function(){
  //   console.log('oi');
  // }
}