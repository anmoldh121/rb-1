import React, { useRef } from 'react';
import { Animated, PanResponder } from 'react-native';

const Orbitor = (props) => {
  const pan = useRef(new Animated.ValueXY()).current;

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        console.log("granted")
      },
      onPanResponderMove: (evnt) => {
        console.log(evnt)
      } ,
    })
  ).current;
  
  return (
    <Animated.View
      style={{ width: "100%", height: "100%" }}
      {...panResponder.panHandlers}
    >
      { props.children }
    </Animated.View>
  )
}

export default Orbitor;