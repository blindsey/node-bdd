var zombie = require( 'zombie' ),
    server = require( '../server' );

describe( "Given I am a new user", function() {
  describe( "When I visit the home page", function() {
    var host = "127.0.0.1", port = 8080, browser;

    beforeEach( function() {
      server.listen( port, host, function() {
        zombie.visit( "http://" + host + ":" + port + "/", function( error, _browser, status ) {
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
