// import bcrypt from "bcryptjs";
// import NextAuth, { Account, User as AuthUser } from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";
// import GithubProvider from "next-auth/providers/github";
// import user from "../../../../models/user";
// import connect from "../../../../utils/db";




// export const authOptions: any = {

//   providers: [
//     CredentialsProvider({
//       id: "credentials",
//       name: "Credentials",
//       credentials: {
//         email: { label: "Email", type: "text" },
//         password: { label: "Password", type: "password" },
//       },
//       async authorize (credentials: any) {
        
//         await connect();

//         let userData=user
//         try {
//           const user = await userData.findOne({ email: credentials.email });
//           if (user) {
//             const isPasswordCorrect = await bcrypt.compare(
//               credentials.password,
//               user.password
//             );
//             if (isPasswordCorrect) {
//               return user;
//             }
//           }
//         } catch (err: any) {
//           throw new Error(err);
//         }
//       },
//     }),
//     GithubProvider({
//       clientId: process.env.GITHUB_ID ?? "",
//       clientSecret: process.env.GITHUB_SECRET ?? "",
//     }),
//     // ...add more providers here
//   ],
//   callbacks: {
//     async signIn({ user:any, account }: { user: AuthUser; account: Account }) {
//       if (account?.provider == "credentials") {
//         return true;
//       }
//       if (account?.provider == "github") {
//         await connect();
//         try {
//           const existingUser = await user.findOne({ email: user.email });
          
//           if (!existingUser) {
//             const newUser = new user({
//               email: user.email,
//             });

//             await newUser.save();
//             return true;
//           }
//           return true;
//         } catch (err) {
//           console.log("Error saving user", err);
//           return false;
//         }
//       }
//     },
//   },
// };

// export const handler = NextAuth(authOptions);
// export { handler as GET, handler as POST };
// authOptions.ts






import bcrypt from 'bcryptjs';
import NextAuth, { Account, User as AuthUser } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GithubProvider from 'next-auth/providers/github';
import User from '../../../../models/user';
import connect from '../../../../utils/db';
import { NextResponse } from 'next/server';

export const authOptions: any = {
  providers: [
    CredentialsProvider({
      id: 'credentials',
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: {  label: 'Password', type: 'password' },
      },
      async authorize(credentials: any) {
        console.log('Authorization started');
        
        await connect();

        try {
          console.log('Searching for user:', credentials.email);
          
          const existingUser = await User.findOne({ email: credentials.email });
          if (existingUser) {
            console.log('User found:', existingUser.email);
            
            const isPasswordCorrect = await bcrypt.compare(credentials.password, existingUser.password);
            if (isPasswordCorrect) {
              console.log('Password is correct. User authorized.');
              return existingUser;
            } else {
              console.log('Password is incorrect. User not authorized.');
              return null;
            }
          } else {
            console.log('User not found. User not authorized.');
            return null;
          }
        } catch (error: any) {
          console.error('Error during authorization:', error);
          throw new Error('Error during authorization');
        }
      },
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID || '',
      clientSecret: process.env.GITHUB_SECRET || '',
    }),
    // ...add more providers here
  ],
  callbacks: {
    async signIn({ user, account }: { user: AuthUser; account: Account }) {
      console.log('Sign-in callback started');
      
      if (account?.provider === 'credentials') {
        console.log('Sign-in using credentials provider');
        return true;
      }

      if (account?.provider === 'github') {
        console.log('Sign-in using GitHub provider');
        
        await connect();

        try {
          const existingUser = await User.findOne({ email: user.email });
          if (!existingUser) {
            console.log('GitHub user not found. Creating a new user.');
            
            const newUser = new User({
              email: user.email,
            });

            await newUser.save();
            console.log('New user created.');
            
            return true;
          } else {
            console.log('GitHub user found. User already exists.');
            return true;
          }
        } catch (err) {
          console.error('Error during GitHub sign-in callback:', err);
          return false;
        }
      }
    },
  },
};

export const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
