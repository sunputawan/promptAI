import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google"

import { connectToDB } from "@/utils/database";
import User from '@/models/user';

// console.log({
//     clientId: process.env.GOOGLE_ID,
//     clientSecret: process.env.GOOGLE_CLIENT_SECRET,
// })

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
    ],

    session: {
        strategy: "jwt", // This ensures sessions are managed using JSON Web Tokens
    },
    jwt: {
        secret: process.env.NEXTAUTH_SECRET, // Used to sign and verify tokens
        maxAge: 7 * 24 * 60 * 60, // Optional: Set the lifespan of tokens (7 days here)
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                // Add user details to the token on sign-in
                const sessionUser = await User.findOne({ email: user.email });
                if (sessionUser) {
                    token.id = sessionUser._id.toString();
                    token.name = sessionUser.username; // Use the database username
                    token.email = sessionUser.email;
                }
            }
            return token; // Return the updated token
        },

        async session({ session, token }) {
            // Populate session.user with token data
            session.user.id = token.id;
            session.user.name = token.name;
            session.user.email = token.email;
        
            return session;
        },
        // async session({ session }) {
        //     const sessionUser = await User.findOne({
        //         email: session.user.email,
        //         username: session.user.name,
        //         picture: session.user.image,
        //     })

        //     if(sessionUser) session.user.id = sessionUser._id.toString();
        //     else console.error("Session not found in database.");
        //     return session;
        // },
        
        async signIn({ profile }) {
            try {
                await connectToDB();
    
                const userExists = await User.findOne({
                    email: profile.email
                });
                
                if(!userExists) {
                    await User.create({
                        email: profile.email,
                        username: profile.name.replace(" ", "").toLowerCase(),
                        image: profile.picture,
                    })
                }
                
                return true;
            } catch(error) {
                console.log(error);
                return false;
            }
        }
    },
})

export { handler as GET, handler as POST}