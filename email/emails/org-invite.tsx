import { Button, Heading, Section, Text } from "@react-email/components";
import { BrandedEmailTemplate } from "../templates/branded";

interface OrganizationInviteEmailProps {
  inviteeEmail: string;
  inviterName: string;
  organizationName: string;
  inviteUrl: string;
  expiresAt: Date | string | number;
}

export const OrganizationInviteEmail = ({
  inviterName,
  organizationName,
  inviteUrl,
  expiresAt,
}: OrganizationInviteEmailProps) => {
  const previewText = `${inviterName} invited you to join ${organizationName} on Turn Signal`;

  // Convert expiresAt to Date object
  const expiresDate =
    expiresAt instanceof Date ? expiresAt : new Date(expiresAt);

  return (
    <BrandedEmailTemplate previewText={previewText} companyName="Turn Signal">
      <Section className="text-center mb-6">
        <Heading
          className="text-2xl font-bold text-gray-900 mb-4"
          style={{
            textShadow: "2px 2px 0px rgba(0,0,0,0.1)",
            letterSpacing: "0.05em",
          }}
        >
          You've been invited
        </Heading>
        <Text className="text-lg text-gray-700 mb-2">
          {inviterName} has invited you to join {organizationName} on Turn
          Signal.
        </Text>
      </Section>

      <Section className="mb-6">
        <Text className="text-base text-gray-700 mb-4">
          Once you accept this invitation, you'll be able to access{" "}
          {organizationName}'s projects, roadmaps, and GitHub repositories.
          You'll be working alongside {inviterName} and their team.
        </Text>
        <Text className="text-base text-gray-700">
          This invitation will expire on{" "}
          {expiresDate.toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
          .
        </Text>
      </Section>

      <Section className="text-center mb-6">
        <Button
          className="bg-gray-900 text-white px-8 py-4 text-base font-semibold"
          href={inviteUrl}
          style={{
            boxShadow: "4px 4px 0px 0px #1a1a1a",
            border: "2px solid #000000",
            letterSpacing: "0.05em",
            textDecoration: "none",
            display: "inline-block",
          }}
        >
          Accept Invitation
        </Button>
      </Section>

      <Section
        className="p-4 bg-gray-50"
        style={{
          border: "2px solid #000000",
          boxShadow: "3px 3px 0px 0px #1a1a1a",
        }}
      >
        <Text className="text-sm text-gray-700">
          If you have any questions about this invitation, you can contact{" "}
          {inviterName} directly or reach out to our support team.
        </Text>
      </Section>

      <Section className="text-center mt-6">
        <Text className="text-xs text-gray-500">
          If you didn't expect this invitation, you can safely ignore this
          email.
        </Text>
      </Section>
    </BrandedEmailTemplate>
  );
};

// Preview for development
OrganizationInviteEmail.PreviewProps = {
  inviteeEmail: "john.doe@example.com",
  inviterName: "Jane Smith",
  organizationName: "Acme Corp",
  inviteUrl: "https://turn-signal.co/admin/organization?invite=inv_123",
  expiresAt: new Date(Date.now() + 48 * 60 * 60 * 1000), // 48 hours from now
};

export default OrganizationInviteEmail;
