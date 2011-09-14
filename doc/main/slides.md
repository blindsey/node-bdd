!SLIDE
# Behavior Driven Development (BDD) with node.js using jasmine and zombie #
Ben Lindsey

!SLIDE bullets
# Carbon Five #

* Agile development consultancy founded in 2000
* 25 engineers split between SF, LA, and TN
* Primarily RoR and iOS with some Java, Python, and node.js
* Follow a modified version of eXtreme Programming
* Co-develop a product in 3-4 months, then transition off

!SLIDE bullets
# Strategy #

* Focused on delivering maximum value to clients very quickly
* Build a Minimum Viable Product (MVP) then continuously improve
* Generate buzz early and start identifying target audience
* Put the product in front of users as soon as possible
* Balance stakeholder vision with real feedback

!SLIDE bullets
# Tactics #

* Test Driven Development (TDD)
* Continuous Deployment
* Pair Programming
* Weekly Iterations (40 hour week)
* Story Map backed by Pivotal Tracker

!SLIDE code
server.js
	@@@ javascript
	var http = require('http');
	http.createServer(function (req, res) {
  	  res.writeHead(200, {'Content-Type': 'text/html'});
  	  res.end('<html><body>Hello World</body></html>');
	}).listen(1337, "127.0.0.1");
	console.log('Server running at http://127.0.0.1:1337/');

!SLIDE code
Test drive it
	@@@ javascript
	var zombie = require( 'zombie' );

	describe( "Given I am a new user", function() {
	  describe( "When I visit the home page", function() {
	    var browser;

	    beforeEach( function() {
	      zombie.visit( "http://localhost:1337/",
	      function( error, _browser, status ) {
	        if( error ) throw error;
	        expect( status ).toBe( 200 );
	        browser = _browser;
	        asyncSpecDone();
	      });
	      asyncSpecWait();
	    });

	    it( "Then I see 'Hello World'", function() {
	      expect( browser.html() ).toMatch( /Hello World/ );
	    });
	  });
	});

!SLIDE commandline
	$ jasmine-node spec/
	Started
	.

	Finished in 0.065 seconds
	2 tests, 2 assertions, 0 failures

!SLIDE code
Click a link
	@@@ javascript
	var zombie = require( 'zombie' );

	describe( "Given I am a new user", function() {
	  describe( "When I visit the home page", function() {
	    var browser;

	    ...snip...

	    describe( "And I click 'submit'", function() {
	       beforeEach( function() {
	         browser.clickLink( 'submit', function( error ) {
	           if( error ) throw error;
	           asyncSpecDone();
	         });
	         asyncSpecWait();
	       });

	       it( "Then the title changes", function() {
	         expect( browser.window.document.title )
	           .toBe( "node.js" );
	       });
	    });
	  });
	});

!SLIDE commandline
RED
	$ jasmine-node spec
	Started
	.F

	Given I am a new user When I visit the home page And I click 'submit'
	  it Then the title changes
	  Error: No link matching 'submit'
	    at Browser.clickLink (/Users/blindsey/Projects/node-tdd/node_modules/zombie/lib/zombie/browser.js:303:25)
	    at [object Object].<anonymous> (/Users/blindsey/Projects//node-tdd/spec/click_spec.js:23:18)
	    at Timer.callback (timers.js:83:39)

	  Error: Expected '' to be 'node.js'.
	    at [object Object].<anonymous> (/Users/blindsey/Projects/node-tdd/spec/click_spec.js:31:50)
	    at Timer.callback (timers.js:83:39)

	Finished in 0.085 seconds
	3 tests, 5 assertions, 2 failures

!SLIDE code
GREEN
	@@@ javascript
	var http = require('http');
	http.createServer(function (req, res) {
  	  res.writeHead(200, {'Content-Type': 'text/html'});
  	  res.end('<html><body>Hello World<br/>' +
	    '<a href="#" onclick="document.title=\'node.js\';">' + 
	    'submit</a></body></html>');
	}).listen(1337, "127.0.0.1");
	console.log('Server running at http://127.0.0.1:1337/');

!SLIDE code
A smarter server.js
	@@@ javascript
	var http = require('http');
	var app = http.createServer(function (req, res) {
	  res.writeHead(200, {'Content-Type': 'text/html'});
	  res.end('<html><body>Hello World</body></html>');
	});

	if(require.main == module) {
	  app.listen(1337, "127.0.0.1");
	  console.log('Server running at http://127.0.0.1:1337/');
	} else {
	  module.exports = app;
	}

!SLIDE code
Full integration test
	@@@javascript
	var zombie = require( 'zombie' ),
	    server = require( '../server' );

	describe( "Given I am a new user", function() {
	  describe( "When I visit the home page", function() {
	    var host = "127.0.0.1", port = 8080, browser;

	    beforeEach( function() {
	      server.listen( port, host, function() {
	        zombie.visit( "http://" + host + ":" + port + "/",
	        function( error, _browser, status ) {
	          if( error ) throw error;
	          expect( status ).toBe( 200 );
	          browser = _browser;
	          asyncSpecDone();
	        });
	      });
	      asyncSpecWait();
	    });

	    it( "Then I see 'Hello World'", function() {
	      expect( browser.html() ).toMatch( /Hello World/ );
	    });
	  });
	});

!SLIDE bullets
# Advanced: view testing #

* mock AJAX calls
* compile your jade templates directly
* jsdom.env( jade.compile() )
* load jquery and other libraries
* var $ = window.$;
* expect( $( 'input[name="name"]' ).val() ).toMatch( /node rawks/ );

!SLIDE bullets
# More information #
* [http://zombie.labnotes.org/](http://zombie.labnotes.org/)
* [https://github.com/mhevery/jasmine-node](https://github.com/mhevery/jasmine-node)
* [https://github.com/blindsey/node-bdd](https://github.com/blindsey/node-bdd)
* [ben@carbonfive.com](mailto:ben@carbonfive.com)
* [@ben1mal](http://www.twitter.com/@ben1mal)
