import { searchFavorite, type } from 'api/etc';
import { favoriting, unfavoriting } from 'api/Major';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router';
import { getStorage, setStorage } from 'utils/loginStorage';
import { getAccessToken } from 'utils/tokenManeger';

import useUserStore from './useUserStore';

const useFavoriteMajor = (setModalIsOpen: React.Dispatch<React.SetStateAction<boolean>>) => {
  const { isLogin } = useUserStore();
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();

  const searchValue = searchParams.get('q') || '';
  const majorType = searchParams.get('majorType') || '전체';
  const option = searchParams.get('option') || 'modifiedDate';

  const [db, setData] = useState<string[]>([]);
  const [favoriteDb, setFavoriteDb] = useState<string[]>([]);
  const [selectedMajor, setSelectedMajor] = useState(majorType);
  const token = getAccessToken();

  // 즐겨찾기 추가/삭제
  const onFavoriteMajor = (e: React.MouseEvent<HTMLImageElement>) => {
    if (!isLogin) {
      alert('로그인 후 이용해주세요');
      navigate('/login');

      return;
    }
    if (!favoriteDb.includes(e.currentTarget.alt)) {
      setFavoriteDb(favoriteDb.concat([e.currentTarget.alt]));
      favoriting(e.currentTarget.alt);
    } else {
      setFavoriteDb(favoriteDb.filter((v) => v !== e.currentTarget.alt));
      unfavoriting(e.currentTarget.alt);
    }
    setSelectedMajor(e.currentTarget.alt);
  };

  // 확인 버튼 클릭 이벤트
  const clickSubmit = () => {
    if (location.pathname === '/search') {
      navigate(`/search?q=${searchValue}&option=${option}&majorType=${selectedMajor}`);
    } else {
      navigate(`/?option=${option}&majorType=${selectedMajor}`);
    }
    setModalIsOpen(false);
  };

  // 전공 선택 변경
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const majorChange = (e: any) => setSelectedMajor(e.target.value);

  // 즐겨찾기 리스트 불러오기
  useEffect(() => {
    const loadList = async () => {
      if (token) {
        const { data } = await searchFavorite(token);
        setFavoriteDb(data as string[]);
      }
    };
    if (isLogin) {
      loadList();
    }
  }, [isLogin, token]);

  // 전공 리스트 불러오기
  useEffect(() => {
    const getList = async () => {
      if (token) {
        const data = await type(token);
        setStorage('majorType', ['전체', data.data]);
        setData(['전체', data.data]);
      }
    };
    const loadList = () => {
      const data = getStorage('majorType');
      if (data) setData(data.split(','));
    };

    if (getStorage('majorType')) {
      loadList();
    } else {
      getList();
    }
  }, [token]);

  return {
    db,
    favoriteDb,
    majorType,
    majorChange,
    onFavoriteMajor,
    clickSubmit,
  };
};

export default useFavoriteMajor;
