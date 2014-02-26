/* Author: Chris Micek */

var ActivitiesModel = {
  move : {
    name    : 'Move',
    id      : 'move',
    perform : function(){
      console.log(this.name + 'ed');
    }
  },
  travel : {
    name    : 'Travel',
    id      : 'travel',
    perform : function(){
      console.log(this.name + 'ed');
    }
  },
  sleep : {
    name    : 'Sleep',
    id      : 'sleep',
    perform : function(){
      console.log(this.name + 'ed');
    }
  },
  forage : {
    name    : 'Forage',
    id      : 'forage',
    perform : function(){
      console.log(this.name + 'ed');
    }
  },
  hunt : {
    name    : 'Hunt',
    id      : 'hunt',
    perform : function(){
      console.log(this.name + 'ed');
    }
  },
  move : {
    name    : 'Move',
    id      : 'move',
    perform : function(self){

      var coords = self.coords().split(',');
      var x = parseInt(coords[0]);
          x++;
      var y = parseInt(coords[1]);

      self.move(x+','+y);
    }
  }
}