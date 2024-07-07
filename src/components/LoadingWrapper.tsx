"use client";

import { useEffect, useState } from "react";

import LoadingOverlay from "@/components/LoadingOverlay";

const LoadingWrapper = ({ children }: { children: React.ReactNode }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <LoadingOverlay />;
  }

  return <>{children}</>;
};

export default LoadingWrapper;
