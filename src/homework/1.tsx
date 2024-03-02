import { ReactNode, useEffect, useRef } from "react";

type Props = {
  children: ReactNode;
  onContentEndVisiable: () => void;
};

//Опишіть Props
export function Observer({ children, onContentEndVisiable }: Props) {
  // Вкажіть правильний тип для useRef зверніть увагу, в який DOM елемент ми його передаємо
  const endContactRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Вкажіть правильний тип для options, підказка, клас також можна вказувати як тип
    const options: IntersectionObserverInit = {
      rootMargin: "0px",
      threshold: 1.0,
      root: null,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.intersectionRatio > 0) {
          onContentEndVisiable();
          observer.disconnect();
        }
      });
    }, options);

    if (endContactRef.current) {
      observer.observe(endContactRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [onContentEndVisiable]);

  return (
    <div>
      {children}
      <div ref={endContactRef} />
    </div>
  );
}

export default Observer;
