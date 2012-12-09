# jsHub - [Pivotal Tracker](https://www.pivotaltracker.com/projects/705299)

Supported environments:

  * SauceLabs(https://saucelabs.com/)
    
Probably supported environments (needs to be confirmed):

  * Selenium Grid (http://selenium-grid.seleniumhq.org)
  * Selenium Grid on AWS EC2 (http://selenium-grid.seleniumhq.org/setting_up_selenium_grid_on_ec2.html)

Going to support soon:
  
  * BowserStack(http://www.browserstack.com)
  * Local browsers

## Update node to latest

http://nodejs.org/#download

## Install

    npm install jshub

## Usage

`Environment variables`

    > SAUCE_ACCESS_KEY = your SauceLabs key
    > SAUCE_USERNAME = your SauceLabs login

`configuration file (js.json)`

    {
      "name": "MyApplication",
      "url": "http://my.application.com",
      "serve_files": [
        "MyApplication/async.min.js",
        "MyApplication/backbone.js.js",
        "MyApplication/application.js",
        "MyApplication/spec/**/*.js"
      ],
      "browsers": [
        { "browserName": "internet explorer", "version": "10", "platform": "Windows 2012" },
        { "browserName": "internet explorer", "version": "9", "platform": "Windows 2008" },
        { "browserName": "internet explorer", "version": "8", "platform": "Windows 2003" },
        { "browserName": "firefox", "version": "16", "platform": "Windows 2008" },
        { "browserName": "ipad", "version": "5.1", "platform": "Mac 10.8" },
        { "browserName": "safari", "version": "5", "platform": "Mac 10.6" }
      ]
    }


`jsHub` outputs the results in the [TAP](http://en.wikipedia.org/wiki/Test_Anything_Protocol) format, which looks like

    TAP version 13
    ok 1 jsHub ( internet explorer:8 on Windows 2003 )
    ok 2 jsHub ( internet explorer:9 on Windows 2008 )
    ok 3 jsHub ( internet explorer:10 on Windows 2012 )

    1..3
    # tests 3
    # pass  3

    # ok
    
TAP is a human-readable and language-agnostic test result format. TAP plugins exist for popular CI servers

* [Jenkins TAP plugin](https://wiki.jenkins-ci.org/display/JENKINS/TAP+Plugin)
* [TeamCity TAP plugin](https://github.com/pavelsher/teamcity-tap-parser)