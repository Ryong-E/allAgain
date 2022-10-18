import { promisePool } from "..";

const Campaign = {
  create: async ({
    userId,
    title,
    content,
    thumbnail,
    recruitmentStartDate,
    recruitmentEndDate,
    campaignStartDate,
    campaignEndDate,
    recruitmentNumber,
    status,
    introduce,
  }) => {
    try {
      await promisePool.query(
        "INSERT INTO campaigns(user_id, title, content, thumbnail, recruitment_start_date, recruitment_end_date, campaign_start_date, campaign_end_date, recruitment_number, status, introduce) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
        [
          userId,
          title,
          content,
          thumbnail,
          recruitmentStartDate,
          recruitmentEndDate,
          campaignStartDate,
          campaignEndDate,
          recruitmentNumber,
          status,
          introduce,
        ]
      );

      return null;
    } catch (error) {
      throw error;
    }
  },
  findAll: async () => {
    try {
      const campaigns = await promisePool.query(
        "SELECT *, campaigns.id as campaign_id FROM campaigns JOIN users ON campaigns.user_id = users.id JOIN (SELECT campaign_id, COUNT(*) as participants_count FROM campaign_participants GROUP BY campaign_id) cp ON campaigns.id = cp.campaign_id ORDER BY campaigns.id DESC",
        []
      );

      return campaigns[0];
    } catch (error) {
      throw error;
    }
  },
  findByCampaignId: async ({ campaignId }) => {
    try {
      const campaign = await promisePool.query(
        "SELECT *, campaigns.id as campaign_id, users.id as user_id FROM campaigns JOIN users ON campaigns.user_id = users.id JOIN (SELECT campaign_id, COUNT(*) as participants_count FROM campaign_participants GROUP BY campaign_id) cp ON campaigns.id = cp.campaign_id WHERE campaigns.id = ?",
        [campaignId]
      );

      return campaign[0];
    } catch (error) {
      throw error;
    }
  },
  findByUserId: async ({ userId }) => {
    try {
      const campaigns = await promisePool.query(
        "SELECT * FROM campaigns WHERE user_id = ? ORDER BY id DESC",
        [userId]
      );

      return campaigns[0];
    } catch (error) {
      throw error;
    }
  },
  updateStatus: async ({ campaignId, status }) => {
    try {
      await promisePool.query("UPDATE campaigns SET status = ? WHERE id = ?", [
        status,
        campaignId,
      ]);

      return null;
    } catch (error) {
      throw error;
    }
  },
  update: async ({
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
    status,
  }) => {
    try {
      await promisePool.query(
        "UPDATE campaigns SET title = ?, content = ?, thumbnail = ? , recruitment_start_date = ?, recruitment_end_date = ?, campaign_start_date = ?, campaign_end_date = ?, recruitment_number = ?, introduce = ?, status = ? WHERE id = ?",
        [
          title,
          content,
          thumbnail,
          recruitmentStartDate,
          recruitmentEndDate,
          campaignStartDate,
          campaignEndDate,
          recruitmentNumber,
          introduce,
          status,
          campaignId,
        ]
      );

      return null;
    } catch (error) {
      throw error;
    }
  },
  deleteByCampaignId: async ({ campaignId }) => {
    try {
      await promisePool.query("DELETE FROM campaigns WHERE id = ?", [
        campaignId,
      ]);

      return null;
    } catch (error) {
      throw error;
    }
  },
  createImage: async ({ filename }) => {
    try {
      await promisePool.query("INSERT INTO images(url, name) VALUES (?, ?)", [
        filename,
        "campaign",
      ]);

      return null;
    } catch (error) {
      throw error;
    }
  },
  createParticipant: async ({ userId, campaignId }) => {
    try {
      await promisePool.query(
        "INSERT INTO campaign_participants(campaign_id, user_id) VALUES (?, ?)",
        [campaignId, userId]
      );

      return null;
    } catch (error) {
      throw error;
    }
  },
  deleteParticipant: async ({ userId, campaignId }) => {
    try {
      await promisePool.query(
        "DELETE FROM campaign_participants WHERE user_id = ? AND campaign_id = ?",
        [userId, campaignId]
      );

      return null;
    } catch (error) {
      throw error;
    }
  },
  findParticipantByUserId: async ({ userId }) => {
    try {
      const participatedCampaigns = await promisePool.query(
        "SELECT * FROM campaign_participants JOIN campaigns ON campaigns.id = campaign_participants.campaign_id WHERE campaign_participants.user_id = ?",
        [userId]
      );

      return participatedCampaigns[0];
    } catch (error) {
      throw error;
    }
  },
  findExistence: async ({ userId, campaignId }) => {
    try {
      const existence = await promisePool.query(
        "SELECT EXISTS (SELECT * FROM campaign_participants WHERE campaign_id = ? AND user_id = ?) as existence",
        [campaignId, userId]
      );

      return existence[0][0].existence;
    } catch (error) {
      throw error;
    }
  },
};

export { Campaign };
