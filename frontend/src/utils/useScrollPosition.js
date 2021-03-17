import React, { useState, useEffect } from 'react';

export default function useScrollPosition(el) {
  const element = el || window;
  const [scrollPos, setScrollPos] = useState(element.pageYOffset);

  const onScroll = () => {
    setScrollPos(element.pageYOffset);
  };

  useEffect(() => {
    element.addEventListener('scroll', onScroll);
    return () => {
      element.removeEventListener('scroll', onScroll);
    };
  }, [scrollPos]);

  return scrollPos;
}
