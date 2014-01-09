/* Author: Chris Micek */
var ActivityView  = function (attr){
  var self = this;

  self.name           = attr.name;
  self.id             = attr.id;
  self.timePerformed  = ko.observable(0);

  // Private Functions
  
  self.do = function () {
    console.log(self.name + ' doing');
  }
  self.remove = function(){
    console.log('oi');
  }
}