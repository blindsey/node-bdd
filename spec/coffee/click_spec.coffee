zombie = require 'zombie'

describe 'Given I am a new user', ->
  describe 'When I visit the home page', ->
    beforeEach ->
      zombie.visit 'http://localhost:1337', (_, browser, status) =>
        expect(status).toEqual 200
        @browser = browser
        asyncSpecDone()
      asyncSpecWait()

    it 'Then I should see "Hello World"', ->
      expect(@browser.html()).toMatch /hello world/i

    describe 'And I click "submit"', ->
      beforeEach ->
        expect(@browser.window.document.title).not.toEqual 'node.js'

        @browser.clickLink 'submit', ->
          asyncSpecDone()
        asyncSpecWait()

      it 'Then the title should change', ->
        expect(@browser.window.document.title).toEqual 'node.js'
