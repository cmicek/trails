/* Author: Chris Micek */
var ItemView  = function (attr){
  var self = this;

  self.name           = attr.name;
  self.value          = ko.observable(attr.value);
  self.weight         = ko.observable(attr.weight);
  self.durability     = ko.observable(100);
  self.uses           = ko.observable(0);
  
  // Private Functions
  
  self.use = function () {
    self.uses(self.uses() + 1);
  }
}