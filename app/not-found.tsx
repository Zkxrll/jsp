import Link from "next/link";
import { SiteFooter } from "@/components/site-footer";
import { ArrowLeftIcon } from "@/components/icons";

export default function NotFound() {
  return (
    <>
      <main className="wrap flex flex-1 flex-col items-center justify-center pb-16 pt-32 text-center">
        <p className="label label-accent">404</p>
        <h1 className="section-title mt-4">Page not found.</h1>
        <p className="lede mt-4 max-w-sm">This page doesn&apos;t exist or has moved.</p>
        <Link href="/" transitionTypes={["nav-back"]} className="btn btn-glass mt-10">
          <ArrowLeftIcon />
          Back to home
        </Link>
      </main>

      <SiteFooter />
    </>
  );
}
