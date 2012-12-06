# jasmine-server -- I will find the appropriate description later!

[Pivotal Tracker](https://www.pivotaltracker.com/projects/705299)

## Update node to latest

http://nodejs.org/#download

## Install

<pre>
npm install jasmine-server
</pre>

## Usage

<pre>
Environment variables:
> SAUCE_ACCESS_KEY = your SauceLabs key
> SAUCE_USERNAME = your SauceLabs login
</pre>

<pre>
configuration file (js.json):
{
  "name": "MyApplication",
  "url": "http://my.application.com",
	"src_files": [
    "MyApplication/async.min.js",
    "MyApplication/backbone.js.js",
    "MyApplication/application.js",
    "MyApplication/spec/app_spec.js"
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
</pre>