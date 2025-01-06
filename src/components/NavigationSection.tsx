import { navigationMenuItems } from "@/staticData/navigation";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "./ui/navigation-menu";
import Image from "next/image";
import { Link } from "next-view-transitions";

export default function NavigationSection() {
  return (
    <>
      <nav>
        <NavigationMenu className="px-12">
          <NavigationMenuList className="">
            <NavigationMenuItem>
              <Link href="/">
                <Image
                  src="https://i.postimg.cc/0jDHqfz9/Blue-Modern-Global-Network-Company-Logo-5.png"
                  height={400}
                  width={400}
                  alt="Beyond the savanah logo"
                  className="object-cover size-32"
                />
              </Link>
            </NavigationMenuItem>
            {navigationMenuItems.map((menuItem) => (
              <NavigationMenuItem key={menuItem.id}>
                {/* {menuItem.title} */}
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
      </nav>
    </>
  );
}
