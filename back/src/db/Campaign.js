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
  }) => {
    await connection
      .promise()
      .query(
        "INSERT INTO campaigns(user_id, title, content, thumbnail, recruitment_start_date, recruitment_end_date, campaign_start_date, campaign_end_date, recruitment_number, status) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
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
        ],
        (error) => {
          if (error) throw error;
        }
      );

    return null;
  },
};

export { Campaign };
