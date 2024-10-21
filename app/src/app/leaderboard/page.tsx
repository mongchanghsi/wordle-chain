"use client";

import Leaderboard from "@/components/Leaderboard";
import styled from "styled-components";

const LeaderboardPageContainer = styled.div`
  width: 100%;
  padding: 0 24px;
  box-sizing: border-box;

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
`;

const LeaderboardPageTitle = styled.h2`
  margin: 0;
  font-weight: 700;
`;

const LeaderboardPage = () => {
  return (
    <LeaderboardPageContainer>
      <LeaderboardPageTitle>Leaderboard</LeaderboardPageTitle>
      <Leaderboard />
    </LeaderboardPageContainer>
  );
};

export default LeaderboardPage;
