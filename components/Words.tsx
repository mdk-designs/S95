import { Fragment } from "react";

/**
 * Splits text into word spans so each word can slide up from a mask.
 * Real spaces are kept between words, so screen readers read it as normal text.
 * `start` offsets the stagger index when several <Words> sit in one heading.
 */
export function Words({ text, start = 0 }: { text: string; start?: number }) {
  const words = text.split(" ");
  return (
    <>
      {words.map((w, i) => (
        <Fragment key={i}>
          <span className="w">
            <span className="w-i" style={{ "--i": start + i } as React.CSSProperties}>
              {w}
            </span>
          </span>
          {i < words.length - 1 ? " " : null}
        </Fragment>
      ))}
    </>
  );
}
