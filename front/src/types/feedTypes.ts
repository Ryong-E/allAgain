export interface FeedType {
  feedId: number;
  userId: number;
  category: string;
  tags: string;
  imageUrls: ImageUrlType[];
  description: string;
}

export interface CreateFeedType {
  category: string;
  tags: string;
  imageUrls: ImageUrlType[];
  description: string;
}

export interface ImageUrlType {
  id: number;
  name: string;
  url: string;
}

export interface ImageType {
  previewURL: string;
  imageFile: File;
}
