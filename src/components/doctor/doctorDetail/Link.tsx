"use client";
import React from "react";
import NextLink from "next/link";

import { useAppDispatch } from "@/store";
import { routerActions } from "@/redux/router/slice";
import { useRouter } from "next/navigation";

type TLink = typeof NextLink;
type TLinkProps = Parameters<TLink>[0] & {
  force?: boolean;
};
//TODO
const Link: React.ForwardRefExoticComponent<TLinkProps> = React.forwardRef(
  ({ children, force = false, ...rest }, ref) => {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const handleOnClick = (
      e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
    ) => {
      if (rest.href === "#") {
        e.preventDefault();
        return;
      }
      if (rest.target === "_blank") return;

      if (force) {
        dispatch(routerActions.setShouldNavigates([]));
        return;
      }
    };

    return (
      <NextLink {...rest} ref={ref} onClick={handleOnClick}>
        {children}
      </NextLink>
    );
  }
);

export default Link;
