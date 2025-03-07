import styled from '@emotion/styled';

const MainBanner = () => {
  return (
    <Banner>
      <BannerWrapper>
        <div>
          수위키,
          <br />
          강의평가의 모든 것<BannerSub>강의평가의 모든 것 수위키</BannerSub>
        </div>
        <picture>
          <source srcSet="/images/resize_banner.avif" type="image/avif" />
          <source srcSet="/images/resize_banner.webp" type="image/webp" />
          <source srcSet="/images/banner.webp" type="image/webp" />
          <source srcSet="/images/banner.svg" type="image/png" />
          <BannerImg src="images/banner.svg" alt="banner" width={450} height={450} />
        </picture>
      </BannerWrapper>
    </Banner>
  );
};

export default MainBanner;

const Banner = styled.div`
  width: 100%;
  background-color: #eeeeee;
  cursor: default;
  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const BannerWrapper = styled.div`
  width: 60%;
  margin: 0 auto;
  display: flex;
  align-items: center;
  font-size: 1.2rem;
  justify-content: space-between;
  font-weight: 600;

  @media screen and (max-width: 960px) {
    width: 80%;
  }
`;

const BannerSub = styled.div`
  font-size: 1rem;
  padding-top: 0.4rem;
  font-weight: 300;
`;

const BannerImg = styled.img`
  vertical-align: bottom;
  pointer-events: none;
  @media screen and (max-width: 1300px) {
    width: 450px;
    height: 450px;
    vertical-align: bottom;
    pointer-events: none;
  }

  @media screen and (max-width: 960px) {
    width: 400px;
    height: 400px;
    vertical-align: bottom;
    pointer-events: none;
  }

  @media screen and (max-width: 550px) {
    display: none;
  }
`;
