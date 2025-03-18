import {
  Navbar as HeroUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
  NavbarMenuItem,
} from "@heroui/navbar";
import { Button } from "@heroui/button";
import { Kbd } from "@heroui/kbd";
import { Link } from "@heroui/link";
import { Input } from "@heroui/input";
import { link as linkStyles } from "@heroui/theme";
import NextLink from "next/link";
import clsx from "clsx";

import { siteConfig } from "@/config/site";
import { ThemeSwitch } from "@/components/theme-switch";
import {
  TwitterIcon,
  GithubIcon,
  DiscordIcon,
  HeartFilledIcon,
  SearchIcon,
  Logo,
} from "@/components/icons";
import { redirect } from "next/navigation";

export const Navbar = () => {
  const searchInput = (
    <Input
      aria-label="Search"
      classNames={{
        inputWrapper: "bg-default-100",
        input: "text-sm",
      }}
      endContent={
        <Kbd className="hidden lg:inline-block" keys={["command"]}>
          K
        </Kbd>
      }
      labelPlacement="outside"
      placeholder="Search..."
      startContent={
        <SearchIcon className="text-base text-default-400 pointer-events-none flex-shrink-0" />
      }
      type="search"
    />
  );

  return (
    <HeroUINavbar maxWidth="xl" position="sticky">
      <NavbarBrand as="li" className="gap-3 max-w-fit">
        <Link className="flex justify-start items-center gap-1" href="/">
          <p className="font-bold text-inherit text-purple-600">
            Project Manager
          </p>
        </Link>
      </NavbarBrand>
      <NavbarContent className="" justify="center">
        {siteConfig.navItems.map((item) => (
          <NavbarItem key={item.href}>
            <Link
              isBlock
              className={clsx(
                linkStyles({ color: "foreground" }),
                "text-large data-[active=true]:text-primary data-[active=true]:font-medium"
              )}
              color="foreground"
              href={item.href}
            >
              {item.label}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>

      <NavbarContent className="hidden sm:flex" justify="center">
        <NavbarItem className="hidden sm:flex gap-2">
          <ThemeSwitch />
            <Button as={Link} className="rounded-sm border-2 border-violet-500 bg-violet-950" href="/auth/login">
              Login
            </Button>


          <Button as={Link} className="rounded-sm border-2 border-purple-500 bg-purple-950" href="/auth/register">
            Register
          </Button>
        </NavbarItem>
      </NavbarContent>
    </HeroUINavbar>
  );
};
