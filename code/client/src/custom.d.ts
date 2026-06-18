declare module "*.png" {
  const value: stringr;
  export = value;
}

declare module "*.jpg" {
  const value: number;
  export = value;
}

declare module "*.webp" {
  const value: number;
  export = value;
}

declare module "*.css" {
  const value: { [className: string]: string };
  export = value;
}
