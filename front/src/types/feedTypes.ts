export interface FeedType {
  feedId: number;
  userId: number;
  category: string;
  tags: string;
  imageUrls: ImageUrlType[];
  description: string;
  authorImageUrl?: string;
  nickname?: string;
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
  id?: number;
  name?: string;
  url: string;
  file?: File;
}

export interface FeedFormValues {
  description: string;
  tags: string;
  category: string[];
}
