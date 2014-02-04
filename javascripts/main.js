require(['https://rawgithub.com/jeffshaver/brief.js/master/src/brief.min.js'], function(b) {
  var resultBox = b('#resultBox').get(0);
    var listener1 = function(event) {
      event.preventDefault();
      resultBox.innerHTML = 'this event was triggered by clicking an anchor tag, but the listener is actually on the body which is delegating it to the anchor tag.<br>' + resultBox.innerHTML;
    };
    var listener2 = function(event) {
      event.preventDefault();
      resultBox.innerHTML = 'this event was triggered by clicking on the element with the #test id.<br>' + resultBox.innerHTML;
    };
    var listener3 = function(event) {
      event.preventDefault();
      resultBox.innerHTML = 'this event was triggered by clicking on an element with the .test class.<br>' + resultBox.innerHTML;
    };
    var listener4 = function(event) {
      resultBox.innerHTML = event.type + '<br>' + resultBox.innerHTML;
    };
    b('body').on('mouseenter mouseleave', listener1, 'a');
    b('#test').on('click', listener2);
    b('.test').on('click', listener3);
    b('body').on('mouseenter mouseleave', listener4);
    b('body').once('mouseleave', function(event) {
      resultBox.innerHTML = 'oh no! you moved your mouse off the body for the first time!!!<br>' + resultBox.innerHTML;
    });
    b('#removeEventListeners').on('click', function() {
      b('body').off('mouseenter mouseleave', listener1, 'a');
      b('#test').off('click', listener2);
      b('.test').off('click', listener3);
      b('body').off('mouseenter mouseleave', listener4);
    });
});