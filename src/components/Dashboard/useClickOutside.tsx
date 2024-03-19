import React, { useEffect } from 'react';

const useClickOutside = (
    ref: React.MutableRefObject<any | null>, 
    callback: () => void, 
    ignoreRef: React.MutableRefObject<any | null>
) => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target) && 
          ignoreRef.current && !ignoreRef.current.contains(event.target)) {
        callback();
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [ref, callback, ignoreRef]);
};

export default useClickOutside;