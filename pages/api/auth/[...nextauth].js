import NextAuth from 'next-auth'
import logger from '../../../lib/logger'

// For more information on each option (and a full list of options) go to
// https://next-auth.js.org/configuration/options
export default NextAuth({
  // https://next-auth.js.org/configuration/providers/oauth
  providers: [
    {
      id: 'ecasProvider',
      name: 'ECAS',
      clientId: process.env.CLIENT_ID,
      type: 'oauth',
      wellKnown: process.env.AUTH_ECAS_WELL_KNOWN,
      authorization: {
        url: process.env.AUTH_ECAS_AUTHORIZATION,
        params: {
          scope: 'openid profile',
        },
      },
      client: {
        token_endpoint_auth_method: 'private_key_jwt',
        introspection_endpoint_auth_method: 'private_key_jwt',
        id_token_encrypted_response_alg: 'RSA-OAEP-256',
        id_token_encrypted_response_enc: 'A256GCM',
        token_endpoint_auth_signing_alg: 'RS256',
        id_token_signed_response_alg: 'RS512',
      },
      token: {
        url: 'https://srv241-s2.lab.hrdc-drhc.gc.ca/ecas-seca/raoidc_ii/v1/token',
        params: {
          scope: 'openid profile',
        },
      },
      jwks: {
        keys: [JSON.parse(process.env.AUTH_PRIVATE)],
      },
      userinfo: process.env.AUTH_ECAS_USERINFO,
      idToken: true,
      checks: ['state', 'nonce'],
      profile(profile, tokens) {
        console.log('-----START PROFILE-------')
        console.log(profile)
        console.log(tokens)
        console.log('-----END PROFILE------')
        return {
          id: profile.sid,
        }
      },
    },
  ],
  theme: {
    colorScheme: 'light',
  },
  session: { jwt: true },
  callbacks: {
    async jwt({ token, user, account }) {
      return token
    },
    async redirect({ url, baseUrl }) {
      // Allows relative callback URLs
      if (url.startsWith('/')) return `${baseUrl}${url}`
      // Allows callback URLs on the same origin
      else if (new URL(url).origin === baseUrl) return url
      //else if (process.env.AUTH_ECAS_GLOBAL_LOGOUT_URL === url) return url
      return baseUrl
    },
    async session({ session, token, user }) {
      return session, token
    },
  },
  logger: {
    error(code, metadata) {
      logger.error(code)
      logger.error(metadata)
    },
    warn(code) {
      logger.warn(code)
    },
    debug(code, metadata) {
      logger.debug(code)
      logger.debug(metadata)
    },
  },
  pages: {
    signIn: '/signedout',
  },
})
