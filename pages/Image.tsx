import Link from 'next/link';
import React, { Dispatch, useEffect } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import Loading from '../src/component/Loading';
import * as actions from '../src/store/modules/rootAction';
import { ImageType } from '../src/store/interface/interface';

const ImageContainer = styled.div`
  max-width: 450px;
  margin: 0 auto;
  text-align: center;
`;

const ImageLayOut = styled.div`
  margin-top: 30px;
  img {
    width: 300px;
    height: 300px;
  }
`;

const ComeBackMsg = styled.div`
  padding-top: 70px;
  font-size: 50px;
  font-weight: bold;
`;

interface ImageProps {
  image: ImageType;
  imagesLoad: any;
}

function Image({ image, imagesLoad }: ImageProps) {
  console.log(image);
  useEffect(() => {
    imagesLoad();
  }, []);

  const gallery = image.imageData.image.data;

  return (
    <ImageContainer>
      <Link href="/">
        <ComeBackMsg>COME BACK MAIN </ComeBackMsg>
      </Link>

      {image.isLoading ? (
        <Loading />
      ) : (
        gallery?.map((data: any) => {
          return (
            <Link href="/post/[id]" as={`/post/${data.id}`}>
              <ImageLayOut>
                <img key={data.id} src={data.urls.full} />
              </ImageLayOut>
            </Link>
          );
        })
      )}
    </ImageContainer>
  );
}

const mapStateToProps = ({ image }: ImageProps) => ({
  image
});

const mapDispatchToProps = (dispatch: any) => ({
  imagesLoad: (image: ImageProps) => dispatch(actions.imagesLoad(image))
});

export default connect(mapStateToProps, mapDispatchToProps)(Image);
