/* Author: Chris Micek */
var FoodView  = function (attr){
  var self = this;
  ko.utils.extend(self, new ItemView(attr));
  
  self.calories       = attr.calories;
  
  // Private Functions
  
  self.eat = function () {
    self  .uses(self.uses() + 1);
  }
}