import { ImageResponse } from 'next/og';
import { publicTrpc } from '@/lib/trpc-server';
import { getQueryClient } from '@/components/get-query-client';

export const alt = 'Roadmap';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image({ params }: { params: { slug: string } }) {
  const queryClient = getQueryClient();

  try {
    const roadmap = await queryClient.fetchQuery(
      publicTrpc.roadmap.getRoadmap.queryOptions({ slug: params.slug }),
    );

    const organizationName = roadmap.organization?.name || 'Organization';
    const issueCount = roadmap.issues?.length || 0;

    const topIssues =
      roadmap.issues
        ?.sort((a, b) => (b.voteCount || 0) - (a.voteCount || 0))
        .slice(0, 3) || [];

    return new ImageResponse(
      (
        <div
          style={{
            background: '#fafafa',
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '40px',
            fontFamily: 'system-ui, -apple-system, sans-serif',
          }}
        >
          <div
            style={{
              background: '#ffffff',
              border: '3px solid #000000',
              borderRadius: '12px',
              padding: '40px',
              width: '100%',
              maxWidth: '1000px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              boxShadow: '4px 4px 0px 0px rgba(0, 0, 0, 0.25)',
            }}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                marginBottom: '32px',
              }}
            >
              <div
                style={{
                  fontSize: '42px',
                  fontWeight: 'bold',
                  color: '#000000',
                  textAlign: 'center',
                  marginBottom: '12px',
                  letterSpacing: '-0.02em',
                  display: 'flex',
                }}
              >
                {roadmap.name}
              </div>
              {roadmap.description && (
                <div
                  style={{
                    fontSize: '18px',
                    color: '#666666',
                    textAlign: 'center',
                    maxWidth: '700px',
                    lineHeight: 1.4,
                    display: 'flex',
                  }}
                >
                  {roadmap.description}
                </div>
              )}
            </div>

            {topIssues.length > 0 && (
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  marginBottom: '24px',
                  width: '100%',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px',
                    width: '100%',
                  }}
                >
                  {topIssues.map((issue, index) => (
                    <div
                      key={issue.id}
                      style={{
                        background: '#f8f9fa',
                        border: '2px solid #e9ecef',
                        borderRadius: '8px',
                        padding: '14px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        width: '100%',
                      }}
                    >
                      <div
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          flex: 1,
                        }}
                      >
                        <div
                          style={{
                            fontSize: '14px',
                            fontWeight: '600',
                            color: '#000000',
                            marginBottom: '3px',
                            display: 'flex',
                          }}
                        >
                          #{issue.number} {issue.title}
                        </div>
                        {issue.body && (
                          <div
                            style={{
                              fontSize: '12px',
                              color: '#666666',
                              lineHeight: 1.3,
                              display: 'flex',
                            }}
                          >
                            {issue.body.length > 60
                              ? `${issue.body.substring(0, 60)}...`
                              : issue.body}
                          </div>
                        )}
                      </div>
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px',
                          marginLeft: '12px',
                        }}
                      >
                        <div
                          style={{
                            background: '#000000',
                            color: '#ffffff',
                            padding: '3px 6px',
                            borderRadius: '4px',
                            fontSize: '11px',
                            fontWeight: 'bold',
                            display: 'flex',
                          }}
                        >
                          {issue.voteCount || 0} votes
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '100%',
                marginTop: 'auto',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                }}
              >
                <div
                  style={{
                    background: '#f0f0f0',
                    border: '2px solid #000000',
                    borderRadius: '6px',
                    padding: '6px 10px',
                    fontSize: '12px',
                    fontWeight: '600',
                    color: '#000000',
                    display: 'flex',
                  }}
                >
                  {issueCount} issues
                </div>
                <div
                  style={{
                    background: '#f0f0f0',
                    border: '2px solid #000000',
                    borderRadius: '6px',
                    padding: '6px 10px',
                    fontSize: '12px',
                    fontWeight: '600',
                    color: '#000000',
                    display: 'flex',
                  }}
                >
                  {roadmap.repositories?.length || 0} repos
                </div>
              </div>
              <div
                style={{
                  fontSize: '14px',
                  color: '#666666',
                  fontWeight: '500',
                  display: 'flex',
                }}
              >
                by {organizationName}
              </div>
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      },
    );
  } catch (error) {
    return new ImageResponse(
      (
        <div
          style={{
            background: '#fafafa',
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '40px',
            fontFamily: 'system-ui, -apple-system, sans-serif',
          }}
        >
          <div
            style={{
              background: '#ffffff',
              border: '3px solid #000000',
              borderRadius: '12px',
              padding: '40px',
              width: '100%',
              maxWidth: '1000px',
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              boxShadow: '4px 4px 0px 0px rgba(0, 0, 0, 0.25)',
            }}
          >
            <div
              style={{
                fontSize: '42px',
                fontWeight: 'bold',
                color: '#000000',
                marginBottom: '12px',
                display: 'flex',
              }}
            >
              Roadmap Not Found
            </div>
            <div
              style={{
                fontSize: '18px',
                color: '#666666',
                display: 'flex',
              }}
            >
              The requested roadmap could not be found
            </div>
          </div>

          <div
            style={{
              position: 'absolute',
              bottom: '30px',
              left: '50%',
              transform: 'translateX(-50%)',
              fontSize: '16px',
              color: '#666666',
              fontWeight: '600',
              letterSpacing: '0.05em',
              display: 'flex',
            }}
          >
            Turn Signal
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      },
    );
  }
}
