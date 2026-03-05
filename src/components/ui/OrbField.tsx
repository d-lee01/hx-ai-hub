"use client";

export function OrbField() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0" aria-hidden>
      <div
        className="orb w-[600px] h-[600px] -top-[200px] -left-[200px]"
        style={{ background: "radial-gradient(circle, #542E91, transparent)", animationDelay: "0s" }}
      />
      <div
        className="orb w-[500px] h-[500px] top-[40%] -right-[150px]"
        style={{ background: "radial-gradient(circle, #3B82F6, transparent)", animationDelay: "-7s" }}
      />
      <div
        className="orb w-[400px] h-[400px] -bottom-[100px] left-[30%]"
        style={{ background: "radial-gradient(circle, #14B8A6, transparent)", animationDelay: "-13s" }}
      />
    </div>
  );
}
