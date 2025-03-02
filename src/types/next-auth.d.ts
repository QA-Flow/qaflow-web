import { DefaultSession, DefaultUser } from 'next-auth';
import { DefaultJWT, JWT } from 'next-auth/jwt';

declare module 'next-auth' {
  interface Session extends DefaultSession {
    user: {
      id: string;
      email: string;
      username: string;
    } & DefaultSession['user'];
  }

  interface User extends DefaultUser {
    username: string;
    id: string;
    email: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT extends DefaultJWT {
    id: string;
    email: string;
    username: string;
  }
}