import { Button } from "@/components/ui/button";

import { Logo } from "./logo";

export const Footer = () => {
  return (
    <div className="flex items-center w-full p-6 bg-[#5C3B58] z-50 ">
      <Logo />
      <div className="md:ml-auto w-full justify-between md:justify-end flex items-center gap-x-2 text-muted-foreground">
        <Button variant="ghost" className="text-white" size="sm">
          Privacy Policy
        </Button>
        <Button variant="ghost" className="text-white" size="sm">
          Terms & Conditions
        </Button>
      </div>
    </div>
  );
};
