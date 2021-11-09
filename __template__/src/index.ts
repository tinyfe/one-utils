export interface NameInfo {
  name?: string;
}

export default function name(info: NameInfo): string | undefined {
  // TODO
  console.log('name');
  return info.name;
}
