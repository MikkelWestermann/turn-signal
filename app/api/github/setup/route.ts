import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/db';
import { githubInstallations } from '@/db/schema';
import { auth } from '@/auth';
import { userClient } from '@/lib/github';

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
    const session = await auth.api.getSession(request);

    if (!session?.user) {
      return NextResponse.redirect(
        `${process.env.BETTER_AUTH_URL}/login?redirect=${encodeURIComponent(request.url)}`,
      );
    }

    // Decode state to get organization info
    let organizationId: string;
    let userId: string;

    if (state) {
      const decoded = JSON.parse(Buffer.from(state, 'base64').toString());
      organizationId = decoded.organizationId;
      userId = decoded.userId;
    } else {
      return NextResponse.redirect(
        `${process.env.BETTER_AUTH_URL}/admin/organization/github?github_setup=error`,
      );
    }

    // @ts-ignore - Type is broken: Fix this
    if (organizationId !== session.session.activeOrganizationId) {
      return NextResponse.redirect(
        `${process.env.BETTER_AUTH_URL}/admin/organization/github?github_setup=error&reason=organization_mismatch`,
      );
    }

    if (userId !== session.user.id) {
      return NextResponse.redirect(
        `${process.env.BETTER_AUTH_URL}/admin/organization/github?github_setup=error&reason=user_mismatch`,
      );
    }

    const db = await getDb();
    const { accessToken } = await auth.api.getAccessToken({
      body: {
        providerId: 'github',
        userId: session.user.id,
      },
    });
    if (!accessToken) {
      return NextResponse.redirect(
        `${process.env.BETTER_AUTH_URL}/admin/organization/github?github_setup=error&reason=no_github_token`,
      );
    }

    const userOctokit = userClient(accessToken);

    try {
      const installations =
        await userOctokit.rest.apps.listInstallationsForAuthenticatedUser();

      if (
        !installations.data.installations ||
        installations.data.installations.length === 0 ||
        !installations.data.installations.some(
          (installation: any) => installation.id === Number(installationId),
        )
      ) {
        return NextResponse.redirect(
          `${process.env.BETTER_AUTH_URL}/admin/organization/github?github_setup=error&reason=no_access`,
        );
      }
    } catch (error) {
      console.error('Error verifying installation access:', error);
      return NextResponse.redirect(
        `${process.env.BETTER_AUTH_URL}/admin/organization/github?github_setup=error&reason=verification_failed`,
      );
    }

    if (setupAction === 'install') {
      try {
        await db.insert(githubInstallations).values({
          installationId: installationId,
          organizationId,
        });

        return NextResponse.redirect(
          `${process.env.BETTER_AUTH_URL}/admin/organization/github?github_setup=success`,
        );
      } catch (error) {
        console.error('Installation failed:', error);
        return NextResponse.redirect(
          `${process.env.BETTER_AUTH_URL}/admin/organization/github?github_setup=error&reason=installation_failed`,
        );
      }
    }

    return NextResponse.redirect(
      `${process.env.BETTER_AUTH_URL}/admin/organization/github?github_setup=complete`,
    );
  } catch (error) {
    console.error('GitHub setup error:', error);

    let errorReason = 'unknown';
    if (error instanceof Error) {
      if (error.message.includes('401')) {
        errorReason = 'unauthorized';
      } else if (error.message.includes('404')) {
        errorReason = 'not_found';
      } else if (error.message.includes('403')) {
        errorReason = 'forbidden';
      }
    }

    return NextResponse.redirect(
      `${process.env.BETTER_AUTH_URL}/admin/organization/github?github_setup=error&reason=${errorReason}`,
    );
  }
}
