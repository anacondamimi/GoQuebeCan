'use client';
import React, { useEffect, useState } from 'react';

import { createPortal } from 'react-dom';

interface DropdownPortalProps {
  children: React.ReactNode;
}

export default function DropdownPortal({ children }: DropdownPortalProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  if (typeof document === 'undefined') return null;
  return createPortal(children, document.body);
}
