/* Author: Chris Micek */
var LivingCreatureView  = function (attr){
  var self = this;
  
  self.availablehealthStatus = {
    healthy: {
      name:     'Healthy',
      isAlive:  true
    },
    sick: {
      name:     'Sick',
      isAlive:  true
    },
    dead : {
      name:     'Dead',
      isAlive:  false
    },
    zombie : {
      name:     'Zombie',
      isAlive:  false
    }
  };  

  self.name                = attr.name;
  self.id                  = attr.id;
  self.terrain             = attr.terrain;

  self.type                = attr.type;

  self.age                 = ko.observable(attr.age);
  self.weight              = ko.observable(attr.weight);
  self.originalWeight      = ko.observable(attr.weight);
  self.height              = ko.observable(attr.height);
  self.sex                 = ko.observable(attr.sex);
  self.gender              = ko.observable(attr.gender);
  self.hitpoints           = ko.observable(100);
  self.calDeficit          = ko.observable(0);
  self.calModifier         = (Math.random()*(115-85)+85)/100;
  self.health              = ko.observable(self.availablehealthStatus.healthy);
  self.items               = ko.observableArray(attr.items);
  self.restingHeartRate    = 110; //minute
  self.coords              = ko.observable('2,2');

  self.activities          = ko.observableArray(attr.activities);
  self.errors              = ko.observableArray([]);
  
  // Private Functions
  
  // Publics Functions

  
  self.move = function(coords){
    self.terrain.updateCellWith(self.coords());
    self.terrain.updateCellWith(coords, this);
    self.coords(coords);
  }


  self.action = function (farm) {    
    self.statusCheck();
    for (var i = self.activities().length - 1; i >= 0; i--) {
      ActivitiesModel[self.activities()[i].id].perform(self);
    };
  }

  self.statusCheck = function(){
    if(self.hitpoints() < 0){
      self.health(self.availablehealthStatus.dead)
    }
  }

  self.formatHeight = function(){
    return Math.floor(self.height()/12) + '\' ' + self.height() % 12 + '"'
  }

  self.addActivity = function(id, time){
    var attr = ActivitiesModel[id];
    attr.timePerformed = time;
    self.activities.push(new ActivityView(attr));
  }
  self.removeActivity = function(activity){
    self.activities.remove(activity);
  }


}