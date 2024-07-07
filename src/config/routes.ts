//TODO
import { c } from "@/utils/string";
export interface RouteConfigItem {
  name: string;
  path: string;
  // type?: "authenticated" | "public" | "unauthenticated";
  roles: readonly string[];
  breadcrumb?: string;
  children?: readonly RouteConfigItem[];
}

export type RouteConfig = readonly RouteConfigItem[];
export type NameInto<T extends readonly RouteConfigItem[]> =
  T extends readonly [
    infer X extends RouteConfigItem,
    ...infer Y extends RouteConfigItem[],
  ]
    ?
        | X["name"]
        | NameInto<Y>
        | (X["children"] extends readonly RouteConfigItem[]
            ? NameInto<X["children"]>
            : never)
    : never;

export const routesConfig = [
  {
    path: "/user",
    roles: ["*"],
    name: "user",
    children: [
      {
        path: "/booking",
        roles: ["*"],
        name: "booking",
        children: [
          {
            path: "/{id}",
            breadcrumb: c("Detail"),
            roles: ["*"],
            name: "",
            children: [
              {
                path: "/profile",
                roles: ["*"],
                name: "profile",
              },
            ],
          },
        ],
      },
    ],
  },
] as const satisfies RouteConfig;
