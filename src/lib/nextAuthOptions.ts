import { NextAuthOptions } from "next-auth";
import CredentionsProvider from 'next-auth/providers/credentials'

const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentionsProvider({
      name: 'Credentials',
      credentials: {
        username: {
          label: 'Username',
          type: 'text',
          placeholder: 'username'
        },
        password: {
          label: 'Password',
          type: 'password'
        }
      },
      async authorize(credentials /* , req */) {
        // ここでユーザー認証を行う
        const user = { id: '1', name: 'Taro', email: credentials?.username, role: "admin", backendToken: "test" }
        if (user) {
          return user
        } else {
          return null
        }
      }
    })
  ],
  session: {
    strategy: 'jwt',
    maxAge: 60 * 60 * 24, // セッションの有効期限を24hに設定
  },
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.backendToken = user.backendToken;
      }
      return token;
    },
    session({ session, token }) {
      session.user.role = token.role;
      session.user.backendToken = token.backendToken;
      return session;
    },
  },
  // ログインページとかのURLを変えたい場合pagesを設定する
  // pages: {
  //   signIn: '/auth/signin',
  //   signOut: '/auth/signout',
  //   error: '/auth/error', // Error code passed in query string as ?error=
  //   verifyRequest: '/auth/verify-request', // (used for check email message)
  //   newUser: '/auth/new-user'
  // }
}
export default authOptions;