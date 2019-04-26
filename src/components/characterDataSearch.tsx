import * as React from 'react';
import "../scss/characterData.scss";
import { CharacterData } from '../components/characterData/component';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import GlobalStore from '../store/globalStore';

interface CharacterDataProps {
  name: string,
  region: string,
  isBadge?: boolean,
  isMain?: boolean
}

export const CharacterDataSearch = observer(({ name, region, isBadge, isMain }: CharacterDataProps) => {
  const { searchChar, searchLoading, callApi } = React.useContext(GlobalStore)
  useEffect(()=>{
    callApi(name, region, true);
  },[])
  return (
    <CharacterData char={searchChar} isLoadingData={searchLoading} isMain={isMain} isBadge={isBadge} />
  );
})
