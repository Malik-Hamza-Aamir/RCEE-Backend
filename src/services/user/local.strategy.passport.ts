import { Strategy as LocalStrategy } from "passport-local";
import passport from "passport";
import { db } from "../../shared/db";

passport.use(
  "local",
  new LocalStrategy({ passReqToCallback: true }, async (req, email, password, done) => {
      const user = await db.user.findUnique({ where: { email } });

      if (!user) {
        return done(null, false, { message: "Incorrect email." });
      }

      const isMatch = await comparePasswords(password, user.password);
      
      if (!isMatch) {
        return done(null, false, { message: "Incorrect password." });
      }

      return done(null, user);
  })
);

const comparePasswords = (password: string, hashedPassword: string) => {
  return true;
};

passport.serializeUser((user: any, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (email: string, done) => {
  try {
    const user = await db.user.findUnique({
      where: {
        email,
      },
    });
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});
