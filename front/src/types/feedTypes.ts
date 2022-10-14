export interface IFeed {
  feedId: number;
  userId: number;
  category: string;
  tags: string;
  imageUrls: IImageUrl[];
  description: string;
}

export interface IImageUrl {
  id: number;
  name: string;
  url: string;
}
