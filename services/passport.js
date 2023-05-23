const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy
const mongoose = require('mongoose')
const keys = require('../config/keys')

const User = mongoose.model('users')

passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    done(null, user)
  })
})

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback',
      proxy: true,
    },
    (accessToken, refreshToken, profile, done) => {
      User.findOne({ googleId: profile.id }).then((existingUser) => {
        if (existingUser) {
          // we already have a record with the given profile ID
          done(null, existingUser)
        } else {
          // we dont have a user record with this ID, make a new record
          new User({ googleId: profile.id }).save().then((user) => {
            done(null, user)
          })
        }
      })
    }
  )
)
// 1.当用户登录成功后，Passport.js会调用serializeUser方法。这个方法接收用户的凭据（如username和password），验证它们，然后返回一个用户对象。这个用户对象包含了一些用户的信息，如ID，username等。

// 2.serializeUser方法的回调函数会被调用，它接收两个参数：用户对象和一个done回调函数。这个回调函数的工作是确定哪些用户数据应被存储在session中。

// 3.通常，我们只需要将用户的ID存储在session中，因为这足够我们在后续的请求中识别用户。所以，我们调用done回调函数，将null作为第一个参数（表示没有错误发生），将用户的ID作为第二个参数。这样，用户的ID就被存储在了session中。

// 4.在后续的请求中，当需要获取用户信息时，Passport.js会使用存储在session中的用户ID，通过deserializeUser方法获取完整的用户对象。
