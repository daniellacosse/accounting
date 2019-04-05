/**
 * @private
 * This shim allows us to use yml in typescript without the complier complaining.
 */
declare module "*.yml" {
  const value: any;
  export default value;
}
