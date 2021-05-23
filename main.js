import React, { useEffect } from "react";

import { NavigationContainer } from "@react-navigation/native";
import StackNavigation from "./router";
import { useDispatch } from "react-redux";
import { useAssets } from "expo-asset";
import * as FileSystem from "expo-file-system";

import ChatProtocol from "./protocols/chat";
// import "react-native-wasm";

const Main = () => {
  const dispatch = useDispatch();
  const [assets] = useAssets([require("./wasm/lib.wasm")]);

  useEffect(() => {
    fetchWasm();
  }, []);

  const fetchWasm = async () => {
    console.log(assets[0]);
    FileSystem.readAsStringAsync(assets[0].localUri)
      .then((file) => {
        console.log(file);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <NavigationContainer>
      <StackNavigation />
    </NavigationContainer>
  );
};

export default Main;
