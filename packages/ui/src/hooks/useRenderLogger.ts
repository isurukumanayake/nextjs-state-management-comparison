import { useEffect, useRef } from "react";

export const useRenderLogger = (
  componentName: string,
  emoji: string = "🔄"
) => {
  const renderCount = useRef(0);

  useEffect(() => {
    renderCount.current += 1;
    console.log(`${emoji} ${componentName} rendered (#${renderCount.current})`);
  });

  return renderCount.current;
};
