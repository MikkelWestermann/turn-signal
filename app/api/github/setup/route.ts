import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/db';
import { githubInstallations } from '@/db/schema';
import { Octokit } from '@octokit/rest';
import { createAppAuth } from '@octokit/auth-app';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const installationId = searchParams.get('installation_id');
  const setupAction = searchParams.get('setup_action');
  const state = searchParams.get('state');

  if (!installationId) {
    return NextResponse.json(
      { error: 'Missing installation_id' },
      { status: 400 },
    );
  }

  try {
    // Decode state to get organization info
    let organizationId: string;
    let userId: string;

    if (state) {
      const decoded = JSON.parse(Buffer.from(state, 'base64').toString());
      organizationId = decoded.organizationId;
      userId = decoded.userId;
    } else {
      // Handle case where state is not provided
      return NextResponse.redirect(
        `${process.env.BETTER_AUTH_URL}/organizations?github_setup=error`,
      );
    }

    const octokit = new Octokit({
      authStrategy: createAppAuth,
      auth: {
        appId: process.env.GITHUB_APP_ID,
        clientId: process.env.GITHUB_CLIENT_ID,
        privateKey: process.env.GITHUB_PRIVATE_KEY,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
      },
    });

    // TODO: Better verification of the installation - also verify the user

    if (setupAction === 'install') {
      // Verify installation exists on GitHub (optional validation)

      const installation = await octokit.apps.getInstallation({
        installation_id: Number(installationId),
      });

      if (!installation) {
        throw new Error('Failed to verify installation');
      }

      const db = await getDb();
      await db.insert(githubInstallations).values({
        installationId: installationId,
        organizationId,
      });

      // Redirect to success page
      return NextResponse.redirect(
        `${process.env.BETTER_AUTH_URL}/admin/organization/github?github_setup=success`,
      );
    }

    return NextResponse.redirect(
      `${process.env.BETTER_AUTH_URL}/admin/organization/github?github_setup=complete`,
    );
  } catch (error) {
    console.error('GitHub setup error:', error);
    return NextResponse.redirect(
      `${process.env.BETTER_AUTH_URL}/organizations?github_setup=error`,
    );
  }
}
