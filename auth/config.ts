import type { BetterAuthOptions } from 'better-auth';
import { organization } from 'better-auth/plugins';
import { renderEmail, sendEmail } from '@/lib/email';
import { OrganizationInviteEmail } from '@/email/emails/org-invite';

export const authConfig: BetterAuthOptions = {
  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    },
  },
  plugins: [
    organization({
      allowUserToCreateOrganization: true,
      creatorRole: 'owner',
      membershipLimit: 100,
      invitationExpiresIn: 48 * 60 * 60, // 48 hours in seconds
      sendInvitationEmail: async (data) => {
        const { html, text } = await renderEmail(OrganizationInviteEmail, {
          inviterName: data.inviter.user.name || data.inviter.user.email,
          organizationName: data.organization.name,
          inviteUrl: `${process.env.BETTER_AUTH_URL}/organizations?invite=${data.invitation.id}`,
          expiresAt: data.invitation.expiresAt,
        });

        await sendEmail(data.email, "You've been invited", html, text);
      },
      cancelPendingInvitationsOnReInvite: true,
      invitationLimit: 100,
    }),
  ],
};
