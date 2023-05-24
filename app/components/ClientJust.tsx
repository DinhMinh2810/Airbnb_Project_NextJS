"use client";

import { ReactNode, useState, useEffect } from "react";

interface ClientJustProps {
  children: ReactNode;
}

const ClientJust = ({ children }: ClientJustProps) => {
  const [hasMounted, setHasMounted] = useState<boolean>(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  return <>!{hasMounted ? children : null}</>;
};

export default ClientJust;
