import { connection } from "../app";

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
    await connection
      .promise()
      .query(
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
        ],
        (error) => {
          if (error) throw error;
        }
      );

    return null;
  },
  findAll: async () => {
    const campaigns = await connection
      .promise()
      .query(
        "SELECT *, campaigns.id FROM campaigns JOIN users ON campaigns.user_id = users.id",
        [],
        (error) => {
          if (error) throw error;
        }
      );

    return campaigns[0];
  },
  findByCampaignId: async ({ campaignId }) => {
    const campaign = await connection
      .promise()
      .query(
        "SELECT *, campaigns.id FROM campaigns JOIN users ON campaigns.user_id = users.id WHERE campaigns.id = ?",
        [campaignId],
        (error) => {
          if (error) throw error;
        }
      );

    return campaign[0];
  },
  updateStatus: async ({ campaignId, status }) => {
    await connection
      .promise()
      .query(
        "UPDATE campaigns SET status = ? WHERE id = ?",
        [status, campaignId],
        (error) => {
          if (error) throw error;
        }
      );

    return null;
  },
};

export { Campaign };
