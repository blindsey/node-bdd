var zombie = require( 'zombie' );

describe( "Given I am a new user", function() {
  describe( "When I visit the home page", function() {
    var browser;

    beforeEach( function() {
      zombie.visit( "http://localhost:1337/", function( error, _browser, status ) {
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

    describe( "And I click 'submit'", function() {
       beforeEach( function() {
         browser.clickLink( 'sumit', function( error ) {
	   if( error ) throw error;
	   asyncSpecDone();
	 });
	 asyncSpecWait();
       });

       it( "Then the title changes", function() {
         expect( browser.window.document.title ).toBe( "node.js" );
       });
    });
  });
});
