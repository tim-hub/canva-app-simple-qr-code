import React, { useEffect } from "react";
import QRCodePage from "./core/QRCodePage";
import { registerUmamiScript } from '@parcellab/react-use-umami'


export const App = () => {
  useEffect(
    ()=>{
      registerUmamiScript('https://stats.techtim42.com/script.js', '54f0ee2c-5bbb-40a9-87dd-4c97b91d5042')
    }, []
  )

  return (
    <QRCodePage />
  )
};

