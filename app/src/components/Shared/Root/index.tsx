"use client";

import { useDidMount } from "@/hooks/common/useDidMount";
import { ErrorBoundary } from "../Error/ErrorBoundary";
import ErrorView from "@/views/ErrorView";
import { PropsWithChildren } from "react";
import RootProviders from "./RootProviders";
import Spinner from "../Loader/Spinner";
import { styled } from "styled-components";

const LoadingPage = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Root = (props: PropsWithChildren) => {
  const didMount = useDidMount();

  return didMount ? (
    <ErrorBoundary fallback={ErrorView}>
      <RootProviders {...props} />
    </ErrorBoundary>
  ) : (
    <LoadingPage>
      <Spinner />
    </LoadingPage>
  );
};

export default Root;
