import { Campaign } from "../db/model/Campaign";
import { User } from "../db/model/User";
import { checkXSS, makeImageUrl, setStatus } from "../utils/util";

const campaignService = {
  postCampaign: async ({
    currentUserId,
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
    const userById = await User.findByUserId({ userId: currentUserId });
    if (userById.length === 0) {
      throw new Error("존재하지 않는 유저입니다.");
    }

    // content XSS 대응
    const filteredContent = checkXSS(content);

    const status = setStatus(recruitmentStartDate, recruitmentEndDate);
    await Campaign.create({
      userId: currentUserId,
      title,
      content: filteredContent,
      thumbnail,
      recruitmentStartDate,
      recruitmentEndDate,
      campaignStartDate,
      campaignEndDate,
      recruitmentNumber,
      status,
      introduce,
    });

    const campaigns = await Campaign.findByUserId({ userId: currentUserId });
    await Campaign.createParticipant({
      userId: currentUserId,
      campaignId: campaigns[0].id,
    });

    return "캠페인 생성 완료";
  },
  getAllCampaigns: async () => {
    const campaigns = await Campaign.findAll();
    const filteredCampaigns = [];
    let status;

    for (let campaign of campaigns) {
      const {
        campaign_id: campaignId,
        title,
        thumbnail,
        recruitment_start_date: recruitmentStartDate,
        recruitment_end_date: recruitmentEndDate,
        campaign_start_date: campaignStartDate,
        campaign_end_date: campaignEndDate,
        recruitment_number: recruitmentNumber,
        introduce,
        participants_count: participantsCount,
        user_id: userId,
        nickname,
        image,
      } = campaign;

      status = setStatus(recruitmentStartDate, recruitmentEndDate);
      await Campaign.updateStatus({ campaignId, status });

      const thumbnailUrl = makeImageUrl("campaignThumbnail", thumbnail);
      const imageUrl = makeImageUrl("profiles", image);
      filteredCampaigns.push({
        campaignId,
        title,
        introduce,
        thumbnail: thumbnailUrl,
        recruitmentStartDate,
        recruitmentEndDate,
        campaignStartDate,
        campaignEndDate,
        recruitmentNumber,
        participantsCount,
        status,
        writer: {
          userId,
          nickname,
          imageUrl,
        },
      });
    }

    return filteredCampaigns;
  },
  getCampaign: async ({ campaignId, currentUserId }) => {
    const campaign = await Campaign.findByCampaignId({ campaignId });
    if (campaign.length === 0) {
      throw new Error("존재하지 않는 켐페인입니다.");
    }

    const {
      title,
      thumbnail,
      introduce,
      content,
      recruitment_start_date: recruitmentStartDate,
      recruitment_end_date: recruitmentEndDate,
      campaign_start_date: campaignStartDate,
      campaign_end_date: campaignEndDate,
      recruitment_number: recruitmentNumber,
      participants_count: participantsCount,
      user_id: userId,
      nickname,
      image,
    } = campaign[0];

    const status = setStatus(recruitmentStartDate, recruitmentEndDate);
    await Campaign.updateStatus({
      campaignId,
      status,
    });

    const thumbnailUrl = makeImageUrl("campaignThumbnail", thumbnail);
    const imageUrl = makeImageUrl("profiles", image);
    const participated = await Campaign.findExistenceParticipated({
      userId: currentUserId,
      campaignId,
    });
    const liked = await Campaign.findExistenceLiked({
      userId: currentUserId,
      campaignId,
    });

    const comments = await Campaign.findAllCommentsByCampaignId({ campaignId });
    const filteredComments = [];

    for (let comment of comments) {
      const {
        comment_id: commentId,
        user_id: commentUserId,
        content: commentContent,
        root_comment_id: rootCommentId,
        timestamp,
        nickname: commentUserNickname,
        image: commentUserIamge,
      } = comment;

      const commentUserImageUrl = makeImageUrl("profiles", commentUserIamge);
      filteredComments.push({
        commentId,
        content: commentContent,
        rootCommentId,
        timestamp,
        writer: {
          userId: commentUserId,
          nickname: commentUserNickname,
          image: commentUserImageUrl,
        },
      });
    }

    const filteredCampaign = {
      campaignId,
      title,
      introduce,
      content,
      thumbnail: thumbnailUrl,
      recruitmentStartDate,
      recruitmentEndDate,
      campaignStartDate,
      campaignEndDate,
      recruitmentNumber,
      participantsCount,
      status,
      writer: {
        userId,
        nickname,
        imageUrl,
      },
      participated: participated ? true : false,
      liked: liked ? true : false,
      comments: filteredComments,
    };

    return filteredCampaign;
  },
  getCampaignForGuest: async ({ campaignId }) => {
    const campaign = await Campaign.findByCampaignId({ campaignId });
    if (campaign.length === 0) {
      throw new Error("존재하지 않는 켐페인입니다.");
    }

    const {
      title,
      thumbnail,
      introduce,
      content,
      recruitment_start_date: recruitmentStartDate,
      recruitment_end_date: recruitmentEndDate,
      campaign_start_date: campaignStartDate,
      campaign_end_date: campaignEndDate,
      recruitment_number: recruitmentNumber,
      participants_count: participantsCount,
      user_id: userId,
      nickname,
      image,
    } = campaign[0];

    const status = setStatus(recruitmentStartDate, recruitmentEndDate);
    await Campaign.updateStatus({
      campaignId,
      status,
    });

    const thumbnailUrl = makeImageUrl("campaignThumbnail", thumbnail);
    const imageUrl = makeImageUrl("profiles", image);

    const comments = await Campaign.findAllCommentsByCampaignId({ campaignId });
    const filteredComments = [];

    for (let comment of comments) {
      const {
        comment_id: commentId,
        user_id: commentUserId,
        content: commentContent,
        root_comment_id: rootCommentId,
        timestamp,
        nickname: commentUserNickname,
        image: commentUserIamge,
      } = comment;

      const commentUserImageUrl = makeImageUrl("profiles", commentUserIamge);
      filteredComments.push({
        commentId,
        content: commentContent,
        rootCommentId,
        timestamp,
        writer: {
          userId: commentUserId,
          nickname: commentUserNickname,
          image: commentUserImageUrl,
        },
      });
    }

    const filteredCampaign = {
      campaignId,
      title,
      introduce,
      content,
      thumbnail: thumbnailUrl,
      recruitmentStartDate,
      recruitmentEndDate,
      campaignStartDate,
      campaignEndDate,
      recruitmentNumber,
      participantsCount,
      status,
      writer: {
        userId,
        nickname,
        imageUrl,
      },
      participated: false,
      liked: false,
      comments: filteredComments,
    };

    return filteredCampaign;
  },
  updateCampaign: async ({
    currentUserId,
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

    const { user_id: userId, thumbnail: originalThumbnail } = campaign[0];
    if (currentUserId !== userId) {
      throw new Error("수정권한이 없는 유저입니다.");
    }

    const updatedThumbnail = thumbnail || originalThumbnail;
    const status = setStatus(recruitmentStartDate, recruitmentEndDate);
    // XSS 대응
    const filteredContent = checkXSS(content);

    await Campaign.update({
      campaignId,
      title,
      content: filteredContent,
      thumbnail: updatedThumbnail,
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
  deleteCampaign: async ({ currentUserId, campaignId }) => {
    const campaign = await Campaign.findByCampaignId({ campaignId });
    if (campaign.length === 0) {
      throw new Error("존재하지 않는 캠페인입니다.");
    }
    if (currentUserId !== campaign[0].user_id) {
      throw new Error("삭제권한이 없는 유저입니다.");
    }

    await Campaign.deleteByCampaignId({ campaignId });

    return "삭제 완료";
  },
  postCampaignImages: async ({ filename }) => {
    const createdImage = await Campaign.createImage({ filename });
    const imageUrl = makeImageUrl("campaignImages", filename);

    return { imageUrl };
  },
  postParticipant: async ({ currentUserId, campaignId }) => {
    const user = await User.findByUserId({ userId: currentUserId });
    if (user.length === 0) {
      throw new Error("존재하지 않는 유저입니다.");
    }

    const campaign = await Campaign.findByCampaignId({ campaignId });
    if (campaign.length === 0) {
      throw new Error("존재하지 않는 캠페인입니다.");
    }

    const participated = await Campaign.findExistenceParticipated({
      userId: currentUserId,
      campaignId,
    });
    if (participated) {
      throw new Error("이미 참여 신청한 캠페인입니다.");
    }

    await Campaign.createParticipant({ userId: currentUserId, campaignId });

    return "참여신청 완료";
  },
  postLike: async ({ currentUserId, campaignId }) => {
    const user = await User.findByUserId({ userId: currentUserId });
    if (user.length === 0) {
      throw new Error("존재하지 않는 유저입니다.");
    }

    const campaign = await Campaign.findByCampaignId({ campaignId });
    if (campaign.length === 0) {
      throw new Error("존재하지 않는 캠페인입니다.");
    }

    const participated = await Campaign.findExistenceLiked({
      userId: currentUserId,
      campaignId,
    });
    if (participated) {
      throw new Error("이미 참여 신청한 캠페인입니다.");
    }

    await Campaign.createLike({ userId: currentUserId, campaignId });

    return "좋아요 완료";
  },
  deleteParticipant: async ({ currentUserId, campaignId }) => {
    const user = await User.findByUserId({ userId: currentUserId });
    if (user.length === 0) {
      throw new Error("존재하지 않는 유저입니다.");
    }

    const campaign = await Campaign.findByCampaignId({ campaignId });
    if (campaign.length === 0) {
      throw new Error("존재하지 않는 캠페인입니다.");
    }
    if (campaign[0].user_id === currentUserId) {
      throw new Error("캠페인을 생성한 유저는 취소할 수 없습니다.");
    }
    await Campaign.deleteParticipant({ userId: currentUserId, campaignId });

    return "참여신청 취소 완료";
  },
  deleteLike: async ({ currentUserId, campaignId }) => {
    const user = await User.findByUserId({ userId: currentUserId });
    if (user.length === 0) {
      throw new Error("존재하지 않는 유저입니다.");
    }

    const campaign = await Campaign.findByCampaignId({ campaignId });
    if (campaign.length === 0) {
      throw new Error("존재하지 않는 캠페인입니다.");
    }
    await Campaign.deleteLike({ userId: currentUserId, campaignId });

    return "좋아요 취소 완료";
  },
  postComment: async ({
    currentUserId,
    campaignId,
    content,
    rootCommentId,
  }) => {
    const user = await User.findByUserId({ userId: currentUserId });
    if (user.length === 0) {
      throw new Error("존재하지 않는 유저입니다.");
    }

    const campaign = await Campaign.findByCampaignId({ campaignId });
    if (campaign.length === 0) {
      throw new Error("존재하지 않는 캠페인입니다.");
    }

    if (rootCommentId) {
      const comment = await Campaign.findCommentByCommentId({
        commentId: rootCommentId,
      });
      if (comment.length === 0) {
        throw new Error("부모 댓글이 존재하지 않습니다.");
      }
    }

    await Campaign.createComment({
      campaignId,
      userId: currentUserId,
      content,
      rootCommentId: rootCommentId || undefined,
    });

    return "댓글 생성 완료";
  },
  updateComment: async ({ currentUserId, commentId, content }) => {
    const comment = await Campaign.findCommentByCommentId({ commentId });
    if (comment.length === 0) {
      throw new Error("존재하지 않는 댓글입니다.");
    }

    if (comment[0].user_id !== currentUserId) {
      throw new Error("수정권한이 없습니다.");
    }

    await Campaign.updateComment({ commentId, content });

    return "댓글 수정 완료";
  },
  deleteComment: async ({ currentUserId, commentId }) => {
    const comment = await Campaign.findCommentByCommentId({ commentId });
    if (comment.length === 0) {
      throw new Error("존재하지 않는 댓글입니다.");
    }

    if (comment[0].user_id !== currentUserId) {
      throw new Error("삭제권한이 없습니다.");
    }

    await Campaign.deleteComment({ commentId });

    return "댓글 삭제 완료";
  },
};

export { campaignService };
