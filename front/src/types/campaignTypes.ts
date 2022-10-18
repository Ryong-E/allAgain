export interface FormPropType {
    campaignId: Number;
    title: String;
    content: String;
    thumbnail?: String | null | undefined;
    recruitmentStartDate: Date;
    recruitmentEndDate: Date;
    campaignStartDate: Date;
    campaignEndDate: Date;
    recruitmentNumber: number;
    introduce: String;
    status: String;
    writer: {
      nickname: String;
      imageUrl?: String;
    };
    updateMod: Boolean;
  }

  export interface FormType {
    thumbnail: File[];
    title: string;
    content: string;
    recruitmentStartDate: string;
    recruitmentEndDate: string;
    campaignStartDate: string;
    campaignEndDate: string;
    recruitmentNumber: string;
    introduce: string;
  }

  export type CampaignItemType = {
    campaignId: number;
    title: String;
    content: String;
    thumbnail?: String | null;
    recruitmentStartDate: Date;
    recruitmentEndDate: Date;
    campaignStartDate: Date;
    campaignEndDate: Date;
    recruitmentNumber: number;
    participantsCount: number;
    introduce: String;
    status: String;
    writer: {
      userId: number;
      nickname: String;
      imageUrl?: String;
    };
    participated: Boolean;
  };

  export interface CreateCampaignType{
    formData:FormData,
    campaignId:Number
  }