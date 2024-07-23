import NextAuth from "next-auth/next";
import GoogleProvider from 'next-auth/providers/google';
import User from '@models/user';
import { connectToDB } from '@utils/database';

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    })
  ],
  callbacks: {
    async session({ session }) {
      try {
        await connectToDB();
        const sessionUser = await User.findOne({ email: session.user.email });
        if (sessionUser) {
          session.user.id = sessionUser._id.toString();
        } else {
          console.log("User not found in session callback");
        }
        return session;
      } catch (error) {
        console.error("Error in session callback:", error);
        throw new Error("Session callback failed");
      }
    },
    async signIn({ profile }) {
      try {
        await connectToDB();
        // Check if a user already exists
        const userExists = await User.findOne({ email: profile.email });

        // If not, create a new document and save user in MongoDB
        if (!userExists) {
          await User.create({
            email: profile.email,
            username: profile.name.replace(" ", "").toLowerCase(),
            image: profile.picture,
          });
        }

        return true;
      } catch (error) {
        console.log("Error checking if user exists: ", error.message);
        return false;
      }
    }
  }
});

export { handler as GET, handler as POST };
