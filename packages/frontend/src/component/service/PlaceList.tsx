import { IPlace } from '@/src/types/api';
import React, { Fragment } from 'react';

interface PlaceListProps {
  places?: IPlace[];
}
export default function PlaceList({ places }: PlaceListProps) {
  if (!places?.length) {
    return <div>데이터 없음</div>;
  }
  return (
    <ul>
      {places.map((place, index) => {
        return (
          <li key={`place_${index}`}>
            <div>{place.title}</div>
          </li>
        );
      })}
    </ul>
  );
}
