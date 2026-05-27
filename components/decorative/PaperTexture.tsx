export function PaperTexture() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-x-0 top-0 z-0 mx-auto h-svh w-full max-w-[430px] opacity-80 supports-[height:100dvh]:h-dvh"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.72),transparent_26%),linear-gradient(135deg,rgba(126,96,48,0.08)_0_1px,transparent_1px_12px)]" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.44),rgba(240,224,189,0.2))]" />
    </div>
  );
}
