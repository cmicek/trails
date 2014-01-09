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

  self.name             = attr.name;
  self.id               = attr.id;
  self.age              = ko.observable(attr.age);
  self.weight           = ko.observable(attr.weight);
  self.originalWeight   = ko.observable(attr.weight);
  self.height           = ko.observable(attr.height);
  self.sex              = ko.observable(attr.sex);
  self.gender           = ko.observable(attr.gender);
  self.hitpoints        = ko.observable(100);
  self.calDeficit       = ko.observable(0);
  self.calModifier      = (Math.random()*(115-85)+85)/100;
  self.health           = ko.observable(self.availablehealthStatus.healthy);
  self.items            = ko.observableArray(attr.items);
  self.restingHeartRate = 110; //minute

  self.activities          = ko.observableArray(attr.activities);
  self.errors              = ko.observableArray([]);
  
  // Private Functions
  
  function caloriesExpended(journey){  

    // Basal Rate
    var kcal = 10 * self.weight()/2.2 + 6.25 * self.height()/.393 - 5 * self.age();
    
    if(self.sex() === 'male'){
      kcal += 5;
    }else{
      kcal -= 161;
    }
    // Add a little randomness
    kcal = self.calModifier * kcal;

    if(!journey){
      return kcal;
    }
    // Due to Activities

    kilogramweight = 0.4536*self.weight();
    kilometerDist = 1.609344*journey.distanceToTravel();
    maxhrtanaka = 208 - (0.7*self.age());
    votwomax = Math.round(15.3*(maxhrtanaka/self.restingHeartRate));
    
    if (votwomax >= 56) {
      votwomaxfactor = 1;
    }
    else if (votwomax < 56 && votwomax >= 54) {
      votwomaxfactor = 1.01;
    }
    else if (votwomax < 54 && votwomax >= 52) {
      votwomaxfactor = 1.02;
    }
    else if (votwomax < 52 && votwomax >= 50) {
      votwomaxfactor = 1.03;
    }
    else if (votwomax < 50 && votwomax >= 48) {
      votwomaxfactor = 1.04;
    }
    else if (votwomax < 48 && votwomax >= 46) {
      votwomaxfactor = 1.05;
    }
    else if (votwomax < 46 && votwomax >= 44) {
      votwomaxfactor = 1.06;
    }
    else {
      votwomaxfactor = 1.07;
    }
    grade = 0;
    treadmillfactor = 0.84;
    kcalperkgperkm = (0.05*grade) + 0.95;
    travelkcal = Math.round(((kcalperkgperkm*kilogramweight) + treadmillfactor)*kilometerDist*votwomaxfactor);
    
    return kcal + travelkcal;

 
  }

  function weightChange(intake, outtake){
    var delta = intake - outtake;
    var lbChange = delta/3500;
    var currentWeight = self.weight();
    var hpDelta;
    self.calDeficit(self.calDeficit() + delta);
    
    hpDelta = Math.floor(delta/450/self.originalWeight()*100);
    self.hitpoints(self.hitpoints() + hpDelta);
    self.weight(currentWeight + lbChange);

  }

  self.dailyChecks = function (journey) {    
    weightChange(0, caloriesExpended(journey));
    self.statusCheck();
    for (var i = self.activities().length - 1; i >= 0; i--) {
      self.activities()[i].do();
    };
  }

  // self.eat = function(){
  //   var currentHunger = self.hunger();
  //   self.hunger(currentHunger - 14);
  // }

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