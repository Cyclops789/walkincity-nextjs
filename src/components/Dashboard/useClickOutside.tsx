import React, { useEffect } from 'react';

interface ICustomNode extends ICommonPropreties {
  offsetParent?: ICommonPropreties,
  parentNode?: ICommonPropreties
}

interface ICommonPropreties {
  classList?: string[];
  className?: string;
  id?: string;
}

const useClickOutside = (
  ref: React.MutableRefObject<any | null>,
  callback: () => void,
  ignoreRef: React.MutableRefObject<any | null>
) => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      console.log(`(ref.current && ignoreRef.current): `, (ref?.current), (ignoreRef?.current));
      console.log(`!(ref.current.contains(event.target): `, !(ref?.current?.contains(event?.target)))
      console.log(`!(ignoreRef.current.contains(event.target))`, !(ignoreRef?.current?.contains(event?.target)));

      if ((ref.current && ignoreRef.current) && (!ref.current.contains(event.target) && !ignoreRef.current.contains(event.target))) {
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

export const useClickOutsideNoIgnore = (
  ref: React.MutableRefObject<any | null>,
  callback: () => void
) => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target)) {
        callback();
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [ref, callback]);
};

/*
export const useClickOutsideMChoices = (
  ref: React.MutableRefObject<any | null>,
  callback: (target: ICustomNode | null) => void,
  iMethod: 'class' | 'id' | 'ref' = 'class',
  iValue: string,
  hookChecker: boolean = false,
  subRefFilter?: React.MutableRefObject<any | null>
) => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as unknown as ICustomNode | null;
      switch(iMethod) {
        case 'class':
          if(target && hookChecker) {
            if(
              !ref.current.contains(event.target) && 
              !(Array.from(target?.className || '')?.includes(iValue)) &&
              !(Array.from(target?.offsetParent?.className || '')?.includes(iValue)) && 
              !(Array.from(target?.parentNode?.className || '')?.includes(iValue))
            ) {
              console.log('#####################################################################');
              console.log(`[${hookChecker}] Clicked outside the target and ignored class`);
              console.log('#####################################################################');
              console.log(`(Array.from(target?.className || '')?.includes(iValue)): ${Array.from(target?.className || '')?.includes(iValue)}`);
              console.log(`(Array.from(target?.offsetParent?.className || '')?.includes(iValue)): ${Array.from(target?.offsetParent?.className || '')?.includes(iValue)}`);
              console.log(`(Array.from(target?.parentNode?.className || '')?.includes(iValue)): ${Array.from(target?.parentNode?.className || '')?.includes(iValue)}`);
              console.log('#####################################################################');
              callback(target);
            }
          }
          break;

        case 'id':
          if(target && hookChecker) {
            if(
              !ref.current.contains(event.target) && 
              ((target?.id || '') != iValue) &&
              ((target?.offsetParent?.id || '') != iValue) && 
              ((target?.parentNode?.id || '') != iValue)
            ) {
              callback(target);
            }
          }
          break;

        case 'ref':
          if (
            (ref.current && subRefFilter?.current) &&
            (!ref.current.contains(event.target) || !subRefFilter.current.contains(event.target))
          ) {
            callback(target);
          }
          break;
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [ref, callback, subRefFilter, iMethod, iValue]);
}*/