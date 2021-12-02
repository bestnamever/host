import {PhoneType} from "./phone-type";

export interface PhoneProperties {
  phoneType?: PhoneType;
  aspectRatio: string;
  borderThickness: string;
  borderRadius: string;

  smallNotch: boolean;
  smallNotchRadius?: string;
  smallNotchWidth?: string;
  smallNotchCustomTopMargin?: string;
  smallNotchCustomLeftMargin?: string;
  smallNotchCustomRightMargin?: string;

  largeNotch: boolean;
  largeNotchWidth?: string;
  largeNotchHeight?: string;
  largeNotchRadius?: string;

  marginTop?: string;
  marginBottom?: string;

  customWidth?: string;
  customHeight?: string;
  customPosition?: string;
}
