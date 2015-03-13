window.checkMQ = (function() {

  var theFunctions = [], theBreakpoints;

  theBreakpoints = [
    { theName: 'mqCore', theQuery: window.matchMedia('screen and (max-width: 599px)') },
    { theName: 'mq600', theQuery: window.matchMedia('screen and (min-width: 600px) and (max-width: 959px)') },
    { theName: 'mq960', theQuery: window.matchMedia('screen and (min-width: 960px) and (max-width: 1199px)') },
    { theName: 'mq1200', theQuery: window.matchMedia('screen and (min-width: 1200px)') }
  ];

  // Check MQ on document ready
  var whichMQ = function() {

    var theMQ;

    theBreakpoints.forEach(function (eachBreakpoint) {
      if (eachBreakpoint.theQuery.matches) {
        if (theMQ != eachBreakpoint.theName) {
          theMQ = eachBreakpoint.theName;
        }
      }
    });

    loadFunctions(theMQ);

    return theMQ;

  };

  // Event listener for changes in MQ
  var changeMQ = function() {

    theBreakpoints.forEach(function (eachBreakpoint) {
      eachBreakpoint.theQuery.addListener(whichMQ);
    });

  };

  // Load the functions
  var loadFunctions = function(theMQ) {

    theFunctions.forEach(function(eachFunction) {
      eachFunction(theMQ);
    });

  }

  // Add functions to theFunctions array
  var addFunction = function(fn) {

    theFunctions.push(fn);

  }

  // Init
  var init = function() {

    whichMQ();
    changeMQ();
    return this;

  };

  // Provide some public methods for access outside the module
  return {
    init: init,
    whichMQ: whichMQ,
    changeMQ: changeMQ,
    addFunction: addFunction
  };
  
  init();

})();