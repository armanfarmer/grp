import React from 'react';
import styled from 'styled-components';

// Defining styled-components
const Page = styled.div`
  font-family: Arial, sans-serif;
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
`;

const Title = styled.h1`
  text-align: center;
`;

const SubTitle = styled.h3`
  text-align: center;
`;

const Content = styled.p`
  line-height: 1.5;
  margin: 0 0 20px 0;
`;

const Link = styled.a`
  color: blue;
  text-decoration: none;
`;

const HomePage = () => {
  return (
    <Page>
      <Title>GRP Registry</Title>
      <SubTitle>GPU Registration Protocol v0.1 Alpha Release</SubTitle>
      <Content>
        Announcing the first release of GPU Registration Protocol, a new open source peer-to-peer 
        gpu registry protocol that's completely decentralized, with no central server or trusted parties.
        Users register their own GPUs and credible commit to owning, transfering, and compute on their GPU, with the 
        help of the network to verify authenticity of user's commitment.
      </Content>
      <Content>
        <Link href="https://github.com/armanfarmer/grp">GRP GitHub Repository</Link>
      </Content>
      <Content>
        GPU Registration Protocol is a new design for a fully peer-to-peer electronic cash system. 
        An ethereum implementation is under development for release as an open source project.
      </Content>
      <Content>
        Main properties:
        <ul>
          <li><b>GPU Identity Creation:</b> Each GPU is assigned a unique identifier during the manufacturing process.</li>
          <li><b>Manufacturer and Owner Registration:</b> Manufacturers register their produced GPUs on the decentralized network.</li>
          <li><b>Proof of Existence and Ownership:</b> GPU owners generate a proof to validate the existence and ownership of the registered GPU.</li>
          <li><b>Compliance Enforcement:</b> The protocol incorporates measures to enforce regulatory compliance and responsible resource usage.</li>
          <li><b>Incentives:</b> The protocol introduces incentives via token rewards for active participation in the registration system.</li>
        </ul>
      </Content>
      <Content>
        Paper: <Link href="https://hackmd.io/qRSaJrjlSJCO4pXrzDhyJw">GRP: A Peer-to-Peer Electronic Cash System</Link>
      </Content>
      <Content>
        Abstract. The GPU Registration Protocol (GRP) aims to establish a decentralized and transparent system 
        for registering GPUs using Ethereum. The GRP protocol leverages blockchain technology and cryptographic 
        techniques to ensure credibility, privacy, and accountability throughout the GPU lifecycle. The protocol 
        involves GPU identity creation, manufacturer and owner registration, proof of existence and ownership, 
        and compliance enforcement. Incentives such as token rewards and regulatory compliance benefits encourage 
        participation, while tamper resistance measures protect against unauthorized tampering. By implementing 
        the GRP protocol, the GPU industry can enhance supply chain management, traceability, and responsible 
        resource usage. It is implemented as a protocol, and not a state-mandated or centralized service, to 
        promote a credibly neutral environment, free from any single party's control or manipulation.
      </Content>
    </Page>
  );
}

export default HomePage;
