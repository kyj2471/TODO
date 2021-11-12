import { useRouter } from 'next/router';
import React from 'react';
import styled from 'styled-components';

const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  font-size: 50px;
`;

const Post = () => {
  const router = useRouter();
  const { id } = router.query;
  return (
    <ImageContainer>
      <div>IMAGE ID : {id}</div>
    </ImageContainer>
  );
};

export default Post;
