/* Author: Chris Micek */

var JourneyView  = function() {
  var self = this;
  self.distance           = ko.observable(2000);
  self.days               = ko.observable(0);
  
  self.distanceToTravel   = ko.observable(10); //miles
  self.speedOfTravel      = ko.observable(2);  //mph
  self.rations            = ko.observable('maintain');

  self.hoursTraveling     = ko.observable(6);

  self.sleepTime          = ko.observable(8);

  self.activities         = [];
  $.each(ActivitiesModel, function(){
    self.activities.push(this);
  })

  self.newActivityId      = ko.observable();
  self.newActivityTime    = ko.observable();
  self.newActivityTarget  = ko.observableArray();
  
  self.travelers = ko.observableArray([
      new PersonView({
        name      : "Steve",
        id        : "steve",
        age       : 26,
        weight    : 160,
        height    : 68,
        sex       : 'male',
        gender    : 'male',
        items     : [
          new ItemView(Foods.beef),
          new ItemView(Foods.apple),
          new ItemView(Foods.wildRice),
        ]
      }),
      new PersonView({
        name      : "Bert",
        id        : "bert",
        age       : 30,
        weight    : 200,
        height    : 80,
        sex       : 'male',
        gender    : 'male',
        items     : [],
      }),
      new PersonView({
        name      : "Susan",
        id        : "susan",
        age       : 25,
        weight    : 125,
        height    : 65,
        sex       : 'female',
        gender    : 'female',
        items     : [],
      })
  ]);
  
  
  self.animals = ko.observableArray([
      // new Animal("Horse1", 2, 'oxen'),
      // new Animal("Ox1", 2, 'oxen'),
      // new Animal("Horse2", 3, 'horse')
  ]);




  function getDistanceTraveled(hours, animals){
    var mph = self.speedOfTravel();

    var slowestAnimal;
    var slowestAnimalNum = 0;

    if(animals.length === 0){
      return self.hoursTraveling()*mph;
    }
    
    slowestAnimal = animals[0];      
    for (var i = animals.length - 1; i >= 0; i--) {
      if(animals[i].type.mph < slowestAnimal.type.mph){
        slowestAnimal  = animals[i];
      }
    };
    for (var i = animals.length - 1; i >= 0; i--) {
      if(animals[i].type.name === slowestAnimal.type.name){
        slowestAnimalNum++;
      }
    }

    mph = slowestAnimal.type.mph * slowestAnimalNum;


    return self.hoursTraveling()*mph;
  }
  // Editable data
  
  self.getHoursTraveling = function(){
    return self.distanceToTravel() / self.speedOfTravel()
  }

  self.endDay = function(){
    var currentDist = self.distance();
    self.distance(self.distance() - self.distanceToTravel());
    self.days(self.days() + 1);

    for (var i = self.travelers().length - 1; i >= 0; i--) {        
      self.travelers()[i].dailyChecks(self);      
    };
  }

  self.addActivity = function(){
    var target = [];
    for (var i = self.travelers().length - 1; i >= 0; i--) {        
      if(self.travelers()[i].id === self.newActivityTarget()){
        self.travelers()[i].addActivity(self.newActivityId(), self.newActivityTime())
      }
    };
  }
  
  for (var i = self.travelers().length - 1; i >= 0; i--) {        
    self.travelers()[i].addActivity('travel', self.getHoursTraveling());
    self.travelers()[i].addActivity('sleep', self.sleepTime());
  }


}


ko.applyBindings(new JourneyView());