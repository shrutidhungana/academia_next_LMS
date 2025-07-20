import React from "react";
import { Button } from "@radix-ui/themes";

type Provider = {
  id: string;
  label: string;
  LogoComponent?: React.FC<React.SVGProps<SVGSVGElement>>;
  onClick?: () => void;
};

type ContinueWithButtonsProps = {
  providers: Provider[];
};

const ContinueWithButtons: React.FC<ContinueWithButtonsProps> = ({
  providers,
}) => {
  return (
    <div className="mt-8 flex flex-col gap-6">
      {" "}
      {/* increased margin-top and gap */}
      {providers.map(({ label, LogoComponent: Logo, onClick, id }) => (
        <Button
          key={id}
          onClick={onClick}
          variant="soft"
          className="
            w-full
            flex
            items-center
            justify-center
            gap-3
            bg-white
            text-gray-800
            border-2
            border-gray-400
            rounded-lg
            shadow-md
            transition
            duration-300
            hover:bg-blue-50
            hover:text-blue-700
            focus:outline-none
            focus:ring-4
            focus:ring-blue-400
            focus:ring-offset-2
            active:scale-95
            px-6
            py-4
            "
          aria-label={`Continue with ${label}`}
        >
          {Logo && <Logo className="h-5 w-5" aria-hidden="true" />}
          <span className="text-sm font-semibold">{label}</span>{" "}
          {/* smaller font size */}
        </Button>
      ))}
    </div>
  );
};

export default ContinueWithButtons;
