'use client';

import useViewParams from '@/hook/useViewParam';
import MyPlacesContainer from '@/container/MyPlacesContainer';
import PlacesContainer from '@/container/PlacesContainer';

const componentMap: {
  [key: string]: () => React.JSX.Element;
} = {
  my: MyPlacesContainer,
  notFound: PlacesContainer,
};

export default function Page() {
  const { viewType } = useViewParams();

  const Component = componentMap[viewType];

  return <Component />;
}
