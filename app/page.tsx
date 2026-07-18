import TreadmillGuide from "./TreadmillGuide";

export const dynamic = "force-static";

export default function Home() {
  return <TreadmillGuide basePath={process.env.NEXT_PUBLIC_BASE_PATH ?? ""} />;
}
