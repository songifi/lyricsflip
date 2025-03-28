'use client';

import { theme } from '@/styles/theme';
import styled from '@emotion/styled';

const DisclaimersContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
  color: ${theme.colors.text.primary};
  font-family: ${theme.fonts.primary};

  @media (max-width: 768px) {
    padding: 1.5rem;
  }
`;

const Title = styled.h1`
  font-family: ${theme.fonts.p22};
  font-size: 2.5rem;
  color: ${theme.colors.primary.main};
  margin-bottom: 2rem;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const Section = styled.section`
  margin-bottom: 2.5rem;
  background: ${theme.colors.background.paper};
  padding: 2rem;
  border-radius: ${theme.borderRadius.lg};
  box-shadow: ${theme.boxShadow.navbar};

  @media (max-width: 768px) {
    padding: 1.5rem;
  }
`;

const SectionTitle = styled.h2`
  font-family: ${theme.fonts.p22};
  font-size: 1.5rem;
  color: ${theme.colors.primary.main};
  margin-bottom: 1rem;
`;

const Content = styled.div`
  font-size: 1rem;
  line-height: 1.6;
  color: ${theme.colors.text.secondary};

  p {
    margin-bottom: 1rem;
  }

  ul {
    list-style-type: disc;
    margin-left: 1.5rem;
    margin-bottom: 1rem;
  }

  li {
    margin-bottom: 0.5rem;
  }
`;

const Gradient = styled.div`
  background: ${theme.backgroundImage.customGradient};
  height: 4px;
  width: 100px;
  margin: 0 auto 3rem;
  border-radius: ${theme.borderRadius.lg};
`;

export default function Disclaimers() {
  return (
    <DisclaimersContainer>
      <Title>Legal Disclaimers</Title>
      <Gradient />

      <Section>
        <SectionTitle>General Disclaimer</SectionTitle>
        <Content>
          <p>
            LyricsFlip is a music-based gaming platform that uses song lyrics for entertainment purposes.
            All song lyrics and music-related content displayed on this platform are property of their
            respective owners and copyright holders.
          </p>
        </Content>
      </Section>

      <Section>
        <SectionTitle>Copyright Notice</SectionTitle>
        <Content>
          <p>
            The game content, including but not limited to graphics, logos, and user interface elements,
            is protected by copyright and other intellectual property rights owned by LyricsFlip or its
            licensors.
          </p>
          <ul>
            <li>Song lyrics are used under fair use for educational and entertainment purposes</li>
            <li>User-generated content remains the property of respective users</li>
            <li>Sharing features are intended for personal, non-commercial use only</li>
          </ul>
        </Content>
      </Section>

      <Section>
        <SectionTitle>Gameplay & Rewards</SectionTitle>
        <Content>
          <p>
            LyricsFlip operates on the Starknet blockchain network. Please be aware of the following:
          </p>
          <ul>
            <li>NFT rewards and tokens have no guaranteed monetary value</li>
            <li>Game outcomes are determined by player skill and knowledge</li>
            <li>Network fees and transaction times are beyond our control</li>
            <li>Users are responsible for securing their own wallet credentials</li>
          </ul>
        </Content>
      </Section>

      <Section>
        <SectionTitle>User Conduct</SectionTitle>
        <Content>
          <p>
            By using LyricsFlip, you agree to:
          </p>
          <ul>
            <li>Not use automated systems or bots to play the game</li>
            <li>Not exploit bugs or glitches in the system</li>
            <li>Respect other players and maintain appropriate conduct</li>
            <li>Report any suspicious activity to our support team</li>
          </ul>
        </Content>
      </Section>
    </DisclaimersContainer>
  );
}
