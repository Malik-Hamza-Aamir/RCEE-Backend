// import passport from "passport";
// import { Strategy as LocalStrategy } from "passport-local";
// import { db } from "../../shared/db";

// passport.use(
//   new LocalStrategy(
//     { usernameField: "email" },
//     async (email, password, done) => {
//       try {
//         const user = await db.user.findUnique({ where: { email } });
//         if (!user) {
//           return done(null, false, { message: "Incorrect email." });
//         }

//         const isMatch = await comparePasswords(password, user.password);
//         if (!isMatch) {
//           return done(null, false, { message: "Incorrect password." });
//         }

//         return done(null, user);
//       } catch (err) {
//         return done(err);
//       }
//     }
//   )
// );

// passport.serializeUser((user: any, done) => {
//   done(null, user.id);
// });

// passport.deserializeUser(async (id: number, done) => {
//   try {
//     const user = await db.user.findUnique({ where: { id } });
//     done(null, user);
//   } catch (err) {
//     done(err, null);
//   }
// });

// export default passport;
