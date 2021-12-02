import {DesignElement} from "./design-element";

export interface DesignPosition {
  id: number;
  positionX: number;
  positionY: number;
  width: number;
  height: number;
  element: DesignElement
}
