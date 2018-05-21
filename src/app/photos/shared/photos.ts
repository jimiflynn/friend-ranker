export class Photo {
  id: string | number;
  postedBy: string;
  url: string;
  caption?: string;
}

export interface AlbumConfig {
  limit: number,
  height: number,
  width: number
}
