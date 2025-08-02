import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { getDb } from "@/db";
import { githubInstallations } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get("x-hub-signature-256");
  const event = request.headers.get("x-github-event");

  // Verify webhook signature
  if (!verifySignature(body, signature)) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
  }

  const payload = JSON.parse(body);

  try {
    // Only handle installation deletion - everything else is fetched fresh from GitHub
    if (event === "installation" && payload.action === "deleted") {
      const db = await getDb();
      await db
        .delete(githubInstallations)
        .where(
          eq(
            githubInstallations.installationId,
            payload.installation.id.toString()
          )
        );

      console.log(`GitHub installation ${payload.installation.id} removed`);
    } else {
      console.log(
        `GitHub event received: ${event} - ${payload.action || "no action"}`
      );
    }

    return NextResponse.json({ status: "ok" });
  } catch (error) {
    console.error("Webhook processing error:", error);
    return NextResponse.json({ error: "Processing failed" }, { status: 500 });
  }
}

function verifySignature(body: string, signature: string | null): boolean {
  if (!signature) return false;

  const secret = process.env.GITHUB_WEBHOOK_SECRET!;
  const hash = crypto.createHmac("sha256", secret).update(body).digest("hex");
  const expectedSignature = `sha256=${hash}`;

  return crypto.timingSafeEqual(
    Buffer.from(signature),
    Buffer.from(expectedSignature)
  );
}
