import prisma from "@/lib/prisma-client"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { NextAuthOptions } from "next-auth"
import NextAuth from "next-auth/next"
import EmailProvider from "next-auth/providers/email"
import GithubProvider from "next-auth/providers/github"
import GoogleProvide from "next-auth/providers/google"
import TwitterProvider from "next-auth/providers/twitter"

const githubId = process.env.GITHUB_ID
const githubSecret = process.env.GITHUB_SECRET
const googleId = process.env.GOOGLE_ID
const googleSecret = process.env.GOOGLE_SECRET
const emailUser = process.env.EMAIL_SERVER_USER
const emailPassword = process.env.EMAIL_SERVER_PASSWORD
const emailHost = process.env.EMAIL_SERVER_HOST
const emailPort = process.env.EMAIL_SERVER_PORT
const emailFrom = process.env.EMAIL_FROM
const twitterId = process.env.TWITTER_CONSUMER_KEY
const twitterSecret = process.env.TWITTER_CONSUMER_SECRET

if (
  !githubId ||
  !githubSecret ||
  !googleId ||
  !googleSecret ||
  !emailUser ||
  !emailHost ||
  !emailPort ||
  !emailFrom ||
  !emailPassword ||
  !twitterId ||
  !twitterSecret
) {
  throw new Error("Missing one or more environment variables")
}

export const authConfig = {
  providers: [
    GithubProvider({
      clientId: githubId,
      clientSecret: githubSecret,
    }),
    GoogleProvide({
      clientId: googleId,
      clientSecret: googleSecret,
    }),
    EmailProvider({
      server: {
        host: emailHost,
        port: emailPort,
        auth: {
          user: emailUser,
          pass: emailPassword,
        },
      },
      from: emailFrom,
    }),
    TwitterProvider({
      clientId: twitterId,
      clientSecret: twitterSecret,
    }),
  ],
  callbacks: {
    session: async ({ session, user }) => {
      if (session.user) {
        session.user.id = user.id
      }
      return Promise.resolve(session)
    },
  },
  adapter: PrismaAdapter(prisma),
} satisfies NextAuthOptions

export default NextAuth(authConfig)
