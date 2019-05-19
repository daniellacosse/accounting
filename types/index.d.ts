/**
 * This is a typescript shim for the Trello api client I use. TODO: improve typechecking here
 */
declare module "trello";

/**
 * @private
 * This shim allows us to use yml in typescript without the complier complaining.
 */
declare module "*.yml" {
  const value: any; // eslint-disable-line @typescript-eslint/no-explicit-any
  export default value;
}

type Domain = "trello" | "file" | "echo";
type Messageable = string | { [label: string]: string };
