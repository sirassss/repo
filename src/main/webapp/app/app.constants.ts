// These constants are injected via webpack DefinePlugin variables.
// You can add more variables in webpack.common.js or in profile specific webpack.<dev|prod>.js files.
// If you change the values in the webpack config files, you need to re run webpack to update the application

declare const __DEBUG_INFO_ENABLED__: boolean;
declare const __TIMESTAMP__: string;
declare const __VERSION__: string;
declare const __SERVER_API_URL__: string;

export const VERSION = __VERSION__;
export const DEBUG_INFO_ENABLED = __DEBUG_INFO_ENABLED__;
export const SERVER_API_URL = __SERVER_API_URL__;
export const TIMESTAMP = __TIMESTAMP__;

export const enum Constant {
  SALES = 'Venta',
  IMAGES = 'Imagenes',
}

export enum TypeGroup {
  BANNER = 20,
  PRODUCT = 10,
}

export const TypeID = {
  PRODUCT_SMART_PHONE: 100,
  PRODUCT_LAPTOP: 101,
  PRODUCT_TAPBLET: 102,
  PRODUCT_SMART_WATCH: 103,
  PRODUCT_ACCESSORY: 104,

  BANNER_LIST_PRO_2: 200,
  BANNER_LIST_PRO: 201,
  BANNER_BANNER_MANUFACTURER: 203,
  BANNER_BANNER: 202,
  BANNER_LIST_BANNER: 204,
  BANNER_DOUBLE_BANNER: 205,
};
