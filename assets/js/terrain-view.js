var TerrainView  = function(attr) {
  var self          = this;
  self.height       = attr.width;
  self.width        = attr.height;
  self.houseOffset  = attr.houseOffset;
  self.$string      = $('<pre></pre>');
  self.grid         = [];

  function addToGrid (y,$el) {
    if(self.grid[y]){
      self.grid[y].push($el);  
    }else{
      self.grid[y] = new Array()
      self.grid[y].push($el); 
    }
  }

  self.updateCellWith = function(coords, thing){
    var x = coords.split(',')[0];
    var y = coords.split(',')[1];
    var cell = self.grid[x][y];
    var current = {};

    if(thing){
      current.html = thing.type.icon;
      current.class = thing.type.class;
      
      cell.html(current.html).data('current', current).addClass(current.class);
    }else{
      cell.html(cell.data('past').html).attr('class', cell.data('past').class)
    }
  }
 
  self.generate = function($target){
    var joinArr = [];
    for (var y = 0; y < self.width; y++) {
      for (var x = 0; x < self.height; x++) {
        var $el      = $('<span></span>');
        var coords   = x+','+y;
        var past = {
          html    : TerrainModel.chars[getRandomInt(0,TerrainModel.chars.length-1)],
          class   : 'terrain--item terrain--item__grass'
        }

        if(past.html === 'Ҭ'){
          past.class  +=  ' terrain--item__tree';
        }
        if(past.html === 'ө'){
          past.class  +=  ' terrain--item__stone';
        }

        $el.data('past', past).data('current', past).attr('class', past.class).html(past.html);

        if(TerrainModel.house[y-self.houseOffset.y]){
          if(TerrainModel.house[y-self.houseOffset.y][x-self.houseOffset.x]){
            
            past.html    =   TerrainModel.house[y-self.houseOffset.y][x-self.houseOffset.x];
            past.class   =  'terrain--item terrain--item__house';

            $el.data('past', past).data('current', past).attr('class', past.class).html(past.html);
            addToGrid(y,$el);
            continue;

          }
        } 

        addToGrid(y,$el);
        
      }
    }
    for (var y = 0; y < self.grid.length; y++) {
      for (var x = 0; x < self.grid[y].length; x++) {
        joinArr.push(self.grid[y][x]);
      }
      joinArr.push('\n');
    };
    $target.append(joinArr);
  };
  
  self.initUIBindings = function($target){
    $target.selectable({
      autoRefresh: false,
      filter: ".terrain--item__grass",
      start: function( event, ui ) {
        var $el = $(event.toElement);
        if($el.hasClass('terrain--item__selected') || $el.hasClass('ui-selected')){
          $target.selectable("option", "deselect", true)
        }else{
          $target.selectable("option", "deselect", false)
        }
      },
      stop: function( event, ui ) {
        if($target.selectable("option", "deselect") === true){
          $('.ui-selected').removeClass('terrain--item__selected ui-selected');
        }else{
          $('.ui-selected').addClass('terrain--item__selected');
        }
      }
    });
  };

  self.init = function($target){
    self.generate($target);
    self.initUIBindings($target);
  };
}