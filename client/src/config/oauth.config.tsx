import { GoogleIcon, FacebookIcon, LinkedInIcon, GitHubIcon, AppleIcon, MicrosoftIcon } from "@/icons";
import { SocialProvider } from "@/types";
export const SOCIAL_PROVIDERS: SocialProvider[] = [
  {
    id: "google",
    label: "Continue with Google",
    LogoComponent: GoogleIcon,
  },
  {
    id: "facebook",
    label: "Continue with Facebook",
    LogoComponent: FacebookIcon,
  },
  {
    id: "github",
    label: "Continue with GitHub",
    LogoComponent: GitHubIcon,
  },
  {
    id: "linkedin",
    label: "Continue with LinkedIn",
    LogoComponent: LinkedInIcon,
  },
  {
    id: "apple",
    label: "Continue with Apple",
    LogoComponent: AppleIcon,
  },
  {
    id: "microsoft",
    label: "Continue with Microsoft",
    LogoComponent: MicrosoftIcon,
  },
];