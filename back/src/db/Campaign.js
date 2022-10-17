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
        "SELECT *, campaigns.id as campaign_id FROM campaigns JOIN users ON campaigns.user_id = users.id",
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
        "SELECT *, campaigns.id as campaign_id, users.id as user_id FROM campaigns JOIN users ON campaigns.user_id = users.id WHERE campaigns.id = ?",
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
    await connection
      .promise()
      .query(
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
        ],
        (error) => {
          if (error) throw error;
        }
      );

    return null;
  },
  deleteByCampaignId: async ({ campaignId }) => {
    await connection
      .promise()
      .query("DELETE FROM campaigns WHERE id = ?", [campaignId], (error) => {
        if (error) throw error;
      });

    return null;
  },
  createImage: async ({ imageUrl }) => {
    await connection
      .promise()
      .query(
        "INSERT INTO images(url, name) VALUES (?, ?)",
        [imageUrl, "campaign"],
        (error) => {
          if (error) throw error;
        }
      );

    return imageUrl;
  },
};

export { Campaign };
