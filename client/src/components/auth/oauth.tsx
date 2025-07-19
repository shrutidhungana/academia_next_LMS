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
    <div className="mt-6 flex flex-col gap-3">
      {providers.map(({ label, LogoComponent: Logo, onClick, id }) => (
        <Button
          key={id}
          onClick={onClick}
          variant="soft"
          className="w-full gap-2 bg-white text-black hover:bg-gray-100 border border-gray-300 justify-center"
        >
          {Logo && <Logo className="h-5 w-5" aria-hidden="true" />}
          {label}
        </Button>
      ))}
    </div>
  );
};

export default ContinueWithButtons;
