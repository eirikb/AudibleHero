# AudibleHero

Code for the [Chrome extension](http://audiblehero.com).

## How to run locally

You need: 
[Chrome / Chromium](https://www.google.com/chrome) and
[Node.js](https://nodejs.org).

Run like this:

```
git clone https://github.com/eirikb/audiblehero
cd audiblehero
npm i
npm start
```

1. Go to [chrome://extensions](chrome://extensions).
1. Enable _Developer mode_.
1. Click _Load unpacked extension..._
1. Select the _ext_ folder in project.
1. Go to [Audible](http://audible.com/) and click on the extension (icon in top right).

## How to build for production

Run like this:

```
npm run ext
npm run build   
```

And that's it, now the _dist_ folder can be zipped and shipped.  
This works because [ext/app.js](https://github.com/eirikb/AudibleHero/blob/master/ext/app.js) is made for development, 
which will load the app from webpack-dev-server, but when running `npm run build` this file is simply replaced with the
production-ready file.
