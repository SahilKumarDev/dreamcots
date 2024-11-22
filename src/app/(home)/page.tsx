"use client";

import { ThemeToggle } from "@/components/ThemeToggler";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function Home() {
  const router = useRouter();
  
  const useAdmin = () => {
    router.push("/admin");
  };

  return (
    <div className="flex justify-center items-center h-screen gap-4">
      <Button
        variant="outline"
        onClick={() =>
          toast("Event has been created", {
            description: "Sunday, December 03, 2023 at 9:00 AM",
            action: {
              label: "Undo",
              onClick: () => console.log("Undo"),
            },
          })
        }
      >
        Click to check sonner
      </Button>

      <Button onClick={useAdmin}>Admin Page</Button>

      <ThemeToggle />
    </div>
  );
}
