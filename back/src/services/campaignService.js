import { Campaign } from "../db/Campaign";
import { User } from "../db/user";
const path = require("path");

const campaignService = {
  addCampaign: async ({
    userId,
    title,
    content,
    thumbnail,
    recruitmentStartDate,
    recruitmentEndDate,
    campaignStartDate,
    campaignEndDate,
    recruitmentNumber,
    introduce,
  }) => {
    const userById = await User.findByUserId({ userId });
    if (userById.length === 0) {
      throw new Error("존재하지 않는 유저입니다.");
    }
    // thumbnail 없을 때 처리
    let thumbnailUrl = undefined;
    if (thumbnail !== "null") {
      const re = new RegExp(`campaignThumbnail.*`, "g");
      const serverUrl = process.env.SERVER_URL || "localhost";
      const serverPort = process.env.SERVER_PORT || 5000;
      thumbnailUrl = path.join(
        serverUrl + ":" + serverPort,
        "/",
        thumbnail.match(re)[0]
      );
    }

    let status;
    const currentDate = new Date();
    // 현재 시간 >= recruitment_start_date = 모집중
    // 현재 시간 < recruitment_start_date = 모집예정
    // 현재 시간 > recruitment_end_date = 모집마감
    if (
      currentDate >= recruitmentStartDate &&
      currentDate < recruitmentEndDate
    ) {
      status = "모집 중";
    } else if (currentDate < recruitmentStartDate) {
      status = "모집 예정";
    } else if (currentDate >= recruitmentEndDate) {
      status = "모집 마감";
    }

    // content XSS 대응

    await Campaign.create({
      userId,
      title,
      content,
      thumbnail: thumbnailUrl,
      recruitmentStartDate,
      recruitmentEndDate,
      campaignStartDate,
      campaignEndDate,
      recruitmentNumber,
      status,
      introduce,
    });

    return "캠페인 생성 완료";
  },
  getAllCampaigns: async () => {
    const campaigns = await Campaign.findAll();
    const filteredCampaigns = [];
    let status;
    const currentDate = new Date();
    for (let i = 0; i < campaigns.length; i++) {
      // status 설정
      // 현재 시간 >= recruitment_start_date = 모집중
      // 현재 시간 < recruitment_start_date = 모집예정
      // 현재 시간 > recruitment_end_date = 모집마감
      if (
        currentDate >= campaigns[i].recruitment_start_date &&
        currentDate < campaigns[i].recruitment_end_date
      ) {
        status = "모집 중";
      } else if (currentDate < campaigns[i].recruitment_start_date) {
        status = "모집 예정";
      } else if (currentDate >= campaigns[i].recruitment_end_date) {
        status = "모집 마감";
      }
      await Campaign.updateStatus({
        campaignId: campaigns[i].campaign_id,
        status,
      });

      filteredCampaigns.push({
        campaignId: campaigns[i].campaign_id,
        title: campaigns[i].title,
        thumbnail: campaigns[i].thumbnail,
        recruitmentStartDate: campaigns[i].recruitment_start_date,
        recruitmentEndDate: campaigns[i].recruitment_end_date,
        campaignStartDate: campaigns[i].campaign_start_date,
        campaignEndDate: campaigns[i].campaign_end_date,
        recruitmentNumber: campaigns[i].recruitment_number,
        introduce: campaigns[i].introduce,
        status,
        writer: {
          nickname: campaigns[i].nickname,
          imageUrl: campaigns[i].image_url,
        },
      });
    }

    return filteredCampaigns;
  },
  getCampaign: async ({ campaignId }) => {
    const campaign = await Campaign.findByCampaignId({ campaignId });
    if (campaign.length === 0) {
      throw new Error("존재하지 않는 켐페인입니다.");
    }

    let status;
    const currentDate = new Date();
    if (
      currentDate >= campaign[0].recruitment_start_date &&
      currentDate < campaign[0].recruitment_end_date
    ) {
      status = "모집 중";
    } else if (currentDate < campaign[0].recruitment_start_date) {
      status = "모집 예정";
    } else if (currentDate >= campaign[0].recruitment_end_date) {
      status = "모집 마감";
    }
    await Campaign.updateStatus({
      campaignId: campaign[0].campaign_id,
      status,
    });

    const filteredCampaign = {
      campaignId: campaign[0].campaign_id,
      title: campaign[0].title,
      content: campaign[0].content,
      thumbnail: campaign[0].thumbnail,
      recruitmentStartDate: campaign[0].recruitment_start_date,
      recruitmentEndDate: campaign[0].recruitment_end_date,
      campaignStartDate: campaign[0].campaign_start_date,
      campaignEndDate: campaign[0].campaign_end_date,
      recruitmentNumber: campaign[0].recruitment_number,
      introduce: campaign[0].introduce,
      status,
      writer: {
        nickname: campaign[0].nickname,
        imageUrl: campaign[0].image_url,
      },
    };

    return filteredCampaign;
  },
  updateCampaign: async ({
    userId,
    campaignId,
    title,
    content,
    thumbnail,
    recruitmentStartDate,
    recruitmentEndDate,
    campaignStartDate,
    campaignEndDate,
    recruitmentNumber,
    introduce,
  }) => {
    const campaign = await Campaign.findByCampaignId({ campaignId });
    if (campaign.length === 0) {
      throw new Error("존재하지 않는 캠페인입니다.");
    }
    if (userId !== campaign[0].user_id) {
      throw new Error("수정권한이 없는 유저입니다.");
    }

    let thumbnailUrl = undefined;
    if (thumbnail !== "null") {
      const re = new RegExp(`campaignThumbnail.*`, "g");
      const serverUrl = process.env.SERVER_URL || "localhost";
      const serverPort = process.env.SERVER_PORT || 5000;
      thumbnailUrl = path.join(
        serverUrl + ":" + serverPort,
        "/",
        thumbnail.match(re)[0]
      );
    } else {
      thumbnailUrl = campaign[0].thumbnail;
    }

    let status;
    const currentDate = new Date();
    // 현재 시간 >= recruitment_start_date = 모집중
    // 현재 시간 < recruitment_start_date = 모집예정
    // 현재 시간 > recruitment_end_date = 모집마감
    if (
      currentDate >= recruitmentStartDate &&
      currentDate < recruitmentEndDate
    ) {
      status = "모집 중";
    } else if (currentDate < recruitmentStartDate) {
      status = "모집 예정";
    } else if (currentDate >= recruitmentEndDate) {
      status = "모집 마감";
    }

    // XSS 대응

    await Campaign.update({
      campaignId,
      title,
      content,
      thumbnail: thumbnailUrl,
      recruitmentStartDate,
      recruitmentEndDate,
      campaignStartDate,
      campaignEndDate,
      recruitmentNumber,
      introduce,
      status,
    });

    return "업데이트 완료";
  },
  deleteCampaign: async ({ userId, campaignId }) => {
    const campaign = await Campaign.findByCampaignId({ campaignId });
    if (campaign.length === 0) {
      throw new Error("존재하지 않는 캠페인입니다.");
    }
    if (userId !== campaign[0].user_id) {
      throw new Error("삭제권한이 없는 유저입니다.");
    }

    await Campaign.deleteByCampaignId({ campaignId });

    return "삭제 완료";
  },
  addCampaignImages: async ({ image }) => {
    const re = new RegExp(`campaignImages.*`, "g");
    const serverUrl = process.env.SERVER_URL || "localhost";
    const serverPort = process.env.SERVER_PORT || 5000;
    const imageUrl = path.join(
      serverUrl + ":" + serverPort,
      "/",
      image.match(re)[0]
    );

    const createdImage = await Campaign.createImage({ imageUrl });

    return { imageUrl: createdImage };
  },
};

export { campaignService };
