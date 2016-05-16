# Prototypes with Fire.app

For help with [Fire.app](http://fireapp.kkbox.com/) itself and on how to build Fire.app projects, please see help/fire-app.html.erb.

When opening this project with a local Fire.app instance, the URL will be:
http://127.0.0.1:24681/hidden-index.html

## Ruby developers can use Serve

Ruby developers don't need to install Fire.app at all and can use [Serve](http://get-serve.com/get-started) instead.

After a `bundle install` (or `gem install serve`) you can simply use `serve` in the project folder and the URL will be http://localhost:4000/hidden-index.html (by default).

## Deploy to Heroku

We're hosting these prototypes on http://zopa-prototypes.herokuapp.com/hidden-index. To deploy to that you need to have an account on Heroku.com and the [Heroku Toolbelt](https://toolbelt.heroku.com/) installed.

Before you can deploy, you need to login and add the Heroku remote (you only need to do this once):
```
$ heroku login
$ heroku git:remote -a zopa-prototypes
```

After that you can deploy by simply pushing to Heroku:
```
$ git push heroku master
```

You can open the heroku page by typing this in the console:
```
$ heroku open
```

Or specify a page:
```
$ heroku open hidden-index
```

