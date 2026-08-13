import Image from "next/image";
import { LOGO_URL } from "@/lib/site";
import { CursorFollower } from "./CursorFollower";

export function SiteChrome() {
  return (
    <>
      <div className="preloader" id="preloader" aria-hidden="true">
        <div style={{ textAlign: "center" }}>
          <Image className="preloader__logo" src={LOGO_URL} alt="" width={64} height={64} priority />
          <div className="preloader__bar">
            <div className="preloader__fill" />
          </div>
        </div>
      </div>
      <CursorFollower />
      <div className="scroll-progress" aria-hidden="true" />
      <div className="bg-mesh" aria-hidden="true" />
      <div className="bg-orbs" aria-hidden="true">
        <div className="orb orb--1" />
        <div className="orb orb--2" />
        <div className="orb orb--3" />
      </div>
      <div className="grain" aria-hidden="true" />
    </>
  );
}
