import type { BetterAuthOptions } from "better-auth";
import { organization } from "better-auth/plugins";

export const authConfig: BetterAuthOptions = {
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    },
  },
  plugins: [
    organization({
      allowUserToCreateOrganization: true,
      creatorRole: "owner",
      membershipLimit: 100,
      invitationExpiresIn: 48 * 60 * 60, // 48 hours in seconds
      sendInvitationEmail: async (data) => {
        // TODO: Implement email sending
        console.log("Invitation email should be sent:", data);
      },
      cancelPendingInvitationsOnReInvite: true,
      invitationLimit: 100,
    }),
  ],
};
