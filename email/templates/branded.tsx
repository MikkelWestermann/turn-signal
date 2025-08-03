import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
  Tailwind,
} from "@react-email/components";
import { ReactNode } from "react";

interface BrandedEmailTemplateProps {
  children: ReactNode;
  previewText?: string;
  companyName?: string;
  footerText?: string;
}

export const BrandedEmailTemplate = ({
  children,
  previewText = "You have a new message",
  companyName = "Turn Signal",
  footerText,
}: BrandedEmailTemplateProps) => {
  return (
    <Html>
      <Preview>{previewText}</Preview>
      <Tailwind>
        <Head />
        <Body
          className="mx-auto my-auto bg-gray-50 px-2 font-sans"
          style={{ letterSpacing: "0.05em" }}
        >
          <Container
            className="mx-auto my-[40px] max-w-[600px] bg-white p-0"
            style={{
              boxShadow: "4px 4px 0px 0px #1a1a1a",
              border: "2px solid #000000",
            }}
          >
            <Section
              className="bg-white px-8 py-6 text-center"
              style={{ borderBottom: "2px solid #000000" }}
            >
              <Heading
                className="mx-0 my-0 text-2xl font-semibold text-gray-900"
                style={{
                  textShadow: "2px 2px 0px rgba(0,0,0,0.1)",
                  letterSpacing: "0.05em",
                }}
              >
                {companyName}
              </Heading>
            </Section>

            <Section className="px-8 py-6">{children}</Section>

            {footerText && (
              <Section
                className="bg-gray-50 px-8 py-6 text-center"
                style={{ borderTop: "2px solid #000000" }}
              >
                <Text className="mx-0 my-0 text-sm text-gray-600">
                  {footerText}
                </Text>
              </Section>
            )}
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default BrandedEmailTemplate;
