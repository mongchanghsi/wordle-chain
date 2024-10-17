"use client";

import { usePathname } from "next/navigation";
import { forwardRef, LegacyRef } from "react";
import {
  BottomNavigationContainer,
  BottomNavigationIcon,
  BottomNavigationItem,
  BottomNavigationItemLabel,
} from "./style";
import NAVIGATION from "@/utils/navigation";
import Image from "next/image";
import { isTrue } from "@/utils/styled-helper";
import Link from "next/link";

const BottomNavigation = forwardRef((_, ref: LegacyRef<HTMLElement>) => {
  const pathname = usePathname();

  return (
    <BottomNavigationContainer ref={ref}>
      {NAVIGATION.map((_navigation) => (
        <Link
          key={_navigation.id}
          style={{ flex: 1 }}
          href={_navigation.href}
          prefetch={false}
        >
          <BottomNavigationItem>
            <BottomNavigationIcon
              selected={isTrue(_navigation.href === pathname)}
            >
              <Image src={_navigation.icon} alt={_navigation.id} fill />
            </BottomNavigationIcon>
            <BottomNavigationItemLabel
              selected={isTrue(_navigation.href === pathname)}
            >
              {_navigation.label}
            </BottomNavigationItemLabel>
          </BottomNavigationItem>
        </Link>
      ))}
    </BottomNavigationContainer>
  );
});

BottomNavigation.displayName = "BottomNavigation";
export default BottomNavigation;
