import styled from 'styled-components';

const LoadingWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;

  .pageNotFound {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 700px;
    height: 300px;
    border: 5px solid black;
    border-radius: 5px;
    font-size: 50px;
  }
`;

export default function Loading() {
  return (
    <LoadingWrapper>
      <div className="pageNotFound">🧤 로 딩 중 🧤</div>
    </LoadingWrapper>
  );
}
