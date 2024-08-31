import { Major } from 'api';
import { searchFavorite, type } from 'api/etc';
import { tokenState } from 'app/recoilStore';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { getStorage, isLoginStorage, setStorage } from 'utils/loginStorage';

const useFavoriteMajor = (setModalIsOpen: React.Dispatch<React.SetStateAction<boolean>>) => {
  const { favoriting, unfavoriting } = Major();
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();

  const searchValue = searchParams.get('q') || '';
  const majorType = searchParams.get('majorType') || '전체';
  const option = searchParams.get('option') || 'modifiedDate';

  const [db, setData] = useState<string[]>([]);
  const [favoriteDb, setFavoriteDb] = useState<string[]>([]);
  const [selectedMajor, setSelectedMajor] = useState(majorType);
  const token = useRecoilValue(tokenState);

  // 즐겨찾기 추가/삭제
  const onFavoriteMajor = (e: any) => {
    if (!isLoginStorage()) {
      alert('로그인 후 이용해주세요');
      navigate('/login');

      return;
    }
    if (!favoriteDb.includes(e.target.alt)) {
      setFavoriteDb(favoriteDb.concat([e.target.alt]));
      favoriting(e.target.alt);
    } else {
      setFavoriteDb(favoriteDb.filter((v) => v !== e.target.alt));
      unfavoriting(e.target.alt);
    }
    setSelectedMajor(e.target.alt);
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
  const majorChange = (e: any) => setSelectedMajor(e.target.value);

  // 즐겨찾기 리스트 불러오기
  useEffect(() => {
    const loadList = async () => {
      if (token) {
        const { data } = await searchFavorite(token);
        setFavoriteDb(data as string[]);
      }
    };
    if (isLoginStorage()) {
      loadList();
    }
  }, [token]);

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
