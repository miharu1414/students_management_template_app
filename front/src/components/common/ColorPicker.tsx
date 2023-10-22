import React, { useState, FC } from 'react';
import { Box, Button } from "@chakra-ui/react";
import { SketchPicker } from 'react-color';

type ColorPickerProps = {
  children? : Node;
  color: string;
  onChangeColor: (value:string)=>void,

}

const ColorPicker: FC<ColorPickerProps> = (props) => {
  const {children, ...rest} = props;
  const [displayColorPicker, setDisplayColorPicker] = useState(false);

  // ピッカーを表示するためのハンドラ
  const handleClick = () => {
    setDisplayColorPicker(!displayColorPicker);
  };

  // ピッカーを閉じるためのハンドラ
  const handleClose = () => {
    setDisplayColorPicker(false);
  };



  return (
    <Box>
      <Box bgColor={rest.color} onClick={handleClick}>　　</Box>
      {displayColorPicker && (
        <Box style={{position:'absolute', zIndex:1000}}>
          <Box style={{position:"fixed", top:0, right: 0, bottom: 0, left:0}} onClick={handleClose} />
          <SketchPicker color={rest.color} onChange={(color)=>rest.onChangeColor(color.hex)}/>
        </Box>
      )}
    </Box>
  );
}

export default ColorPicker;
