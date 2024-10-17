"use client";

import { useEffect } from "react";

const ErrorView = ({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset?: () => void;
}) => {
  useEffect(() => {
    // TODO: Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div>
      <h2>An unhandled error occurred!</h2>
      <blockquote>
        <code>{error.message}</code>
      </blockquote>
      {reset && <button onClick={() => reset()}>Try again</button>}
    </div>
  );
};

export default ErrorView;
