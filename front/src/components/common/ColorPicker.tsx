import React, { useState } from 'react';
import { Box} from "@chakra-ui/react"
import { SketchPicker } from 'react-color';

function ColorPicker() {
  const [displayColorPicker, setDisplayColorPicker] = useState(false);

  // ピッカーを表示するためのハンドラ
  const handleClick = () => {
    setDisplayColorPicker(!displayColorPicker);
  };

  // ピッカーを閉じるためのハンドラ
  const handleClose = () => {
    setDisplayColorPicker(false);
  };

  // ピッカーをポップアップするためのスタイル
  const popoverStyle = {
    position: 'absolute',
    zIndex: 2,
  };

  // ピッカー以外の領域をクリックした時に閉じるためのカバー
  const coverStyle = {
    position: 'fixed',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  };

  return (
    <Box>
      <button onClick={handleClick}>Pick Color</button>
      {displayColorPicker && (
        <Box >
          <Box onClick={handleClose} />
          <SketchPicker />
        </Box>
      )}
    </Box>
  );
}

export default ColorPicker;
