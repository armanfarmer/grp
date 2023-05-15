import React from 'react';
import styled from 'styled-components';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import InteractWithContract from './InteractWithContract';
import Homepage from './Homepage';
import BlogPost from './BlogPost';

// Defining styled-components
const Page = styled.div`
  font-family: Arial, sans-serif;
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
`;

// Other styled-components ...

const App = () => {
  return (
    <Router>
    <Page>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/interact" element={<InteractWithContract />} />
        <Route path="/blogpost" element={<BlogPost />} />
      </Routes>
    </Page>
  </Router>
  );
}

export default App;
