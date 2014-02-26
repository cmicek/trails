/* Author: Chris Micek */

var FarmView  = function() {
  var self = this;
  var $terrain = $('#terrain');

  

  self.dayTimer;
  self.dayStatus          = ko.observable('morning');
  self.interval           = ko.observable(100);
  self.days               = ko.observable(0);
  self.time               = ko.observable(8);
  self.rations            = ko.observable('maintain');
  self.hoursWorking       = ko.observable(6);
  self.sleepTime          = ko.observable(8);

  self.activities         = [];
  
  $.each(ActivitiesModel, function(){
    self.activities.push(this);
  })

  self.newActivityId      = ko.observable();
  self.newActivityTime    = ko.observable();
  self.newActivityTarget  = ko.observableArray();
  

  self.terrain = new TerrainView({
    width       : 100,
    height      : 50,
    houseOffset : {
      x : 10,
      y : 5
    }
  });

  self.travelers = ko.observableArray([
      new PersonView({
        name      : "Steve",
        id        : "steve",
        type      : LivingCreatures['human'],
        age       : 26,
        weight    : 160,
        height    : 68,
        sex       : 'male',
        gender    : 'male',
        tools     : [],
        terrain   : self.terrain,
        items     : [
          new ItemView(Foods.beef),
          new ItemView(Foods.apple),
          new ItemView(Foods.wildRice),
        ]
      })
  ]);

 
  

  self.terrain.init($terrain);
  $.each(self.travelers(), function(){
    this.move(this.coords());
  });
  // Private Function

  // Editable data

  self.getTime = function(){
    var time = self.time(); 
    return time.asTime();
  }

  self.updateTime = function(interval){
    self.time(self.time() + interval);
    if(self.time() === 24){
      self.time(0);
      self.days(self.days() + 1);
    }
  }

  self.sleep = function(){
    self.dayStatus('processing');
    self.dayTimer = setInterval(function(){
      self.updateTime(.25);
      if(self.time() === 8){
        clearInterval(self.dayTimer);
        self.dayStatus('morning');
      }
    }, self.interval())
  }

  self.startDay = function(){
    var timeElapsed = 0;
    // self.days(self.days() + 1);
    self.dayStatus('processing');
    self.dayTimer = setInterval(function(){
      self.updateTime(.25);
      for (var i = self.travelers().length - 1; i >= 0; i--) {        
        self.travelers()[i].action(self);      
      };
      timeElapsed+= .25;
      if(timeElapsed >= self.hoursWorking()){
        clearInterval(self.dayTimer);
        self.dayStatus('evening');
      } 
    }, self.interval())
  }

  self.addActivity = function(){
    var target = [];
    for (var i = self.travelers().length - 1; i >= 0; i--) {        
      if(self.travelers()[i].id === self.newActivityTarget()){
        self.travelers()[i].addActivity(self.newActivityId(), self.newActivityTime())
      }
    };
  }

  self.atCoords = function(coords){
    return '';
  }




  for (var i = 0; i < self.travelers().length; i++) {
    self.travelers()[i].addActivity('move', 3);
  };



}


ko.applyBindings(new FarmView());