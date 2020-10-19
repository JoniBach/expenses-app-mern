import React, { useState, createContext } from "react";
export const UploadContext = createContext([[],() => {}]);
export const UploadProvider = (props) => {
  const [uploadData, setUploadData] = useState({
    processedText: "test",
    storeName: "test",
    totalAmount: "test",
    shoppingListHighlight: {},
  });
  console.log("context: ", uploadData);
  return (
    <UploadContext.Provider value={[uploadData, setUploadData]}>
      {props.children}
    </UploadContext.Provider>
  );
};
