import styled from '@emotion/styled';

const FOOTER_LINKS = [
  {
    label: '이용약관',
    url: 'https://sites.google.com/view/suwiki-policy-terms',
  },
  {
    label: '개인정보처리방침',
    url: 'https://sites.google.com/view/suwiki-policy-privacy',
  },
  {
    label: '문의하기',
    url: 'https://alike-pump-ae3.notion.site/SUWIKI-2cd58468e90b404fbd3e30b8b2c0b699',
  },
];

const Footer = () => {
  return (
    <FootWrapper>
      <Foot>
        {FOOTER_LINKS.map(({ label, url }) => (
          <FooterLink href={url} key={url}>
            {label}
          </FooterLink>
        ))}
      </Foot>
    </FootWrapper>
  );
};

export default Footer;

const FootWrapper = styled.footer`
  padding-top: 100px;
`;

const Foot = styled.div`
  margin: 0 auto;
  background-color: rgb(237, 237, 237);
  display: flex;
  gap: 1.4rem;
  height: 170px;
  justify-content: center;
  align-items: center;
`;

const FooterLink = styled.a`
  color: #222222;
  font-size: 1rem;

  @media screen and (max-width: 550px) {
    font-size: 0.9rem;
  }
`;
