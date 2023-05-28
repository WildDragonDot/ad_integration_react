import React from 'react';
import { Routes, Route } from "react-router-dom";
import CreateCampain from "./components/createCampain";
import SetAd from './components/setAd';
import AdImage from './components/uploadImages';
import AddCreative from './components/addCreative';
import PublishAd from './components/publishAd';

const App = () => {
  return (
    <>
    <Routes>
        <Route exact path="/" element={<CreateCampain />} />
        <Route  path="SetAd/:creativeId/:adAccountId/:accessTokenId" element={<SetAd />} />
        <Route  path="uploadImages/:setAdId/:adAccountId/:accessTokenId" element={<AdImage />} />
        <Route  path="adCreative/:setAdId/:ImageHash/:adAccountId/:accessTokenId" element={<AddCreative />} />
        <Route  path="publishAd/:setAdId/:creativeId/:adAccountId/:accessTokenId" element={<PublishAd />} />
      </Routes>
    </>
  )
}

export default App;