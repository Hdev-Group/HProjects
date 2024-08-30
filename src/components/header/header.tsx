"use client"

import * as React from "react"
import Link from "next/link"

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "../ui/navigation-menu"

const components: { title: string; href: string; description: string }[] = [
  {
    title: "Pager",
    href: "/docs/oncall",
    description:
      "Set up and manage your on-call schedules and rotations.",
  },
  {
    title: "",
    href: "/docs/primitives/hover-card",
    description:
      "For sighted users to preview content available behind a link.",
  },
  {
    title: "Progress",
    href: "/docs/primitives/progress",
    description:
      "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
  },
  {
    title: "Scroll-area",
    href: "/docs/primitives/scroll-area",
    description: "Visually or semantically separates content.",
  },
  {
    title: "Tabs",
    href: "/docs/primitives/tabs",
    description:
      "A set of layered sections of content—known as tab panels—that are displayed one at a time.",
  },
  {
    title: "Tooltip",
    href: "/docs/primitives/tooltip",
    description:
      "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
  },
]

export default function NavigationMenuMain() {
  return (
    <div className="w-full px-2 md:px-[4.5rem] py-3  flex items-center fixed justify-center z-10 backdrop-blur-lg border-b " id="headermain">
      <div className="max-w-[120rem] w-[100%] flex ">
    <NavigationMenu>
        <div className="flex items-center">
          <img src="/logo.png" alt="logo" className="h-10 w-10" /><p className="text-xl font-bold ml-[-3px] mr-5">Projects</p>
        </div>
      <NavigationMenuList className="md:flex hidden">
        <NavigationMenuItem>
          <NavigationMenuTrigger>Getting started</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <a
                    className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                    href="/"
                  >
                    <img src="/logo.png" alt="logo" className="h-full w-full" />
                    <div className="mb-2 mt-4 text-lg font-medium">
                      HProjects
                    </div>
                    <p className="text-sm leading-tight text-muted-foreground">
                      Get your projects up and running and maintained in no time with HProjects
                    </p>
                  </a>
                </NavigationMenuLink>
              </li>
              <ListItem href="/docs/tasks" className="mb-2" title="Tasks">
                How to create and manage tasks.
              </ListItem>
              <ListItem href="/docs/incidents" className="mb-2" title="Incidents">
                How do I create and manage incidents?
              </ListItem>
              <ListItem href="/docs/settings/add" className="mb-2" title="Role managment">
                How can I add people to my project?
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Features</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
              {components.map((component) => (
                <ListItem
                  key={component.title}
                  title={component.title}
                  href={component.href}
                >
                  {component.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/docs" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Documentation
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
    </div>
    </div>
  )
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"
