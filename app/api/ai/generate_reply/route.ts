import { NextResponse } from "next/server";

export function POST() {
  return NextResponse.json(
    { message: "AI reply generation is not implemented in the UI skeleton." },
    { status: 501 }
  );
}
