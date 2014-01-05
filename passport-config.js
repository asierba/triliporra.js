exports.init = function (passport) {
  // var WEB_URL = 'http://triliporra-js.herokuapp.com';
  var WEB_URL = 'http://localhost:3000',
    GoogleStrategy = require('passport-google').Strategy;

  passport.use(new GoogleStrategy({
    returnURL: WEB_URL + '/user/login-google-return',
    realm: WEB_URL
    },
    function(identifier, profile, done) {
      console.log("displayName: " + profile.displayName);
      console.log("value: " + profile.emails[0].value);
      console.log("id: " + profile.id);
      console.log("identifier: " + identifier);
      done();
      // User.findOrCreate({ openId: identifier }, function(err, user) {
      //   done(err, user);
      // });
    }
  ));
}