
//
// ==============================================================================================
// Formatters
// ==============================================================================================
//

Number.prototype.round = function(decimals) {
  return Math.round(this * Math.pow(10, decimals)) / Math.pow(10, decimals);
}

String.prototype.truncate = function(length) {
  if (this.length > length)
    return this.substring(0, length) + "...";
  else
    return this;
}

String.prototype.indefiniteArticlerize = function() {
  return ["a", "e", "i", "o", "u"].indexOf(this[0].toLowerCase()) === 0 ? "an " + this : "a " + this;
}

String.prototype.capitalizeFirstLetter = function() {
  return this[0].toUpperCase() + this.slice(1);
}

Number.prototype.asTemperature = function() {
  return this.toFixed() + " &deg;F";
}

Number.prototype.asPercent = function() {
  return this.toFixed() + "%";
}

Number.prototype.asGallons = function() {
  return this.toFixed(2) + " gal";
}



Number.prototype.convert = function(from, to) {
    var val = this;
    if(to === from) {
      return val;
    }
    
    if(from === 'kg' && to === 'g') {
      return (val * 1000).round(2);
    }
    
    if(from === 'g' && to === 'kg') {
      return (val / 1000).round(2);
    }  
    
    if(from === 'lb' && to === 'oz') {
      return (val * 16).round(2);
    }
    
    if(from === 'oz' && to === 'lb') {
      return (val / 16).round(2);
    }  
    
    if(from === 'lb' && to === 'kg') {
      return (val * 0.453592).round(2);
    }
    
    if(from === 'kg' && to === 'lb') {
      return (val * 2.20462).round(2);
    }
    
    if(from === 'oz' && to === 'g') {
      return (val * 28.3495).round(2);
    }

    if(from === 'oz' && to === 'kg') {
      return (val / 35.274).round(2);
    }
    
    if(from === 'g' && to === 'oz') {
      return (val * 0.035274).round(2);
    }

    if(from === 'g' && to === 'lb') {
      return (val / 453.592).round(2);
    }
    
    if(from === 'gal' && to === 'L') {
      return (val * 3.78541).round(2);
    }
    
    if(from === 'L' && to === 'gal') {
      return (val * 0.264172052).round(2);
    }
    
    if(from === 'gal/hr' && to === 'L/hr') {
      return (val * 3.78541178).round(2);
    }
    
    if(from === 'L/hr' && to === 'gal/hr') {
      return (val * 0.264172052).round(2);
    }
    
    if(from === 'degF' && to === 'degC') {
      return ((val - 32) * 5/9).round(1);
    }
    
    if(from === 'degC' && to === 'degF') {
      return ((val * (9/5)) + 32).round(1);
    }     
  }
