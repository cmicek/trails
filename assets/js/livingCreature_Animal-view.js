/* Author: Chris Micek */

var AnimalView  = function (name, age, type){
  var self = this;
  ko.utils.extend(self, new LivingCreatureView(name, age));

  self.availableTypes = {
    oxen: {
      name:  'Oxen',
      mph:  2
    },
    cow: {
      name:  'Cow',
      mph:  3
    },
    mule: {
      name:  'Mule',
      mph:  4
    },
    horse : {
      name:  'Horse',
      mph:  5
    }
  }

  self.type = self.availableTypes[type];

}
