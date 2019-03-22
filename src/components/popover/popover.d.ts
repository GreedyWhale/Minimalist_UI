interface PositionInfo {
  top: {
    top: number;
    left: number;
  };
  left: {
    top: number;
    left: number;
  };
  right: {
    top: number;
    left: number;
  };
  bottom: {
    top: number;
    left: number;
  };
  [key: string]: any;
}

export { PositionInfo };
