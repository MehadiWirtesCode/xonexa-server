import pool from "../config/postgreSQL.js";

export const getWishlistItemsController = async (req, res) => {
  try {
    const user_id = Number(req.query.user_id);

    if (!user_id || isNaN(user_id)) {
      return res.status(400).json({ message: "Invalid or missing user ID" });
    }

    const { rows } = await pool.query(
      `SELECT * FROM wishlist WHERE user_id=$1`,
      [user_id]
    );

    if (rows.length === 0)
        return res.status(200).json({
        success:true,
        items:rows
      });

    return res.status(200).json({
      success: true,
      items: rows,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Internal server error when fetching wishlist items",
    });
  }
};
