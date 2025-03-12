import { ClientLogout } from "@/components/Actions";
import { title } from "@/components/primitives";

import { Button } from "@heroui/button";

export default function PricingPage() {
  return (
    <div className="">
      <Button onPress={ClientLogout}>Sing out</Button>
    </div>
  );
}
