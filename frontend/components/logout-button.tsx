import { Button } from "@heroui/button";
import { ClientLogout } from "./Actions";

export const LogoutButton = () => {
  return (
    <div className="flex w-full">
      <Button
        className="w-full border-1 border-purple-600 bg-transparent text-lg
      rounded-sm"
        onPress={ClientLogout}
      >
        Logout
      </Button>
    </div>
  );
};
