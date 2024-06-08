'use client';

import useViewParams from '@/hook/useViewParam';
import MyPlacesContainer from '@/container/MyPlacesContainer';
import PlacesContainer from '@/container/PlacesContainer';
import { Fragment, useEffect, useRef } from 'react';
import Script from 'next/script';

const componentMap: {
  [key: string]: () => React.JSX.Element;
} = {
  my: MyPlacesContainer,
  notFound: PlacesContainer,
};

export default function Page() {
  const { viewType } = useViewParams();

  const Component = componentMap[viewType];
  const mapRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    window.kakao.maps.load(() => {
      const options = {
        center: new window.kakao.maps.LatLng(33.450701, 126.570667), //지도의 중심좌표.
        level: 3,
      };

      const map = new window.kakao.maps.Map(mapRef.current, options); //지도 생성 및 객체 리턴
    });
  }, []);

  return (
    <Fragment>
      <div ref={mapRef} style={{ width: '500px', height: '400px' }}></div>
      <Component />
    </Fragment>
  );
}
