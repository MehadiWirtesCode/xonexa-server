import pool from "../config/postgreSQL.js";

export const deleteWishlistItemController = async (req, res) => {
  try {
    const { id, user_id } = req.body;
    console.log(id,user_id);
    if (!id || !user_id) {
      return res.status(400).json({ message: "ID or User ID missing" });
    }

    const {rowCount} = await pool.query(`DELETE FROM wishlist WHERE user_id=$1 AND product_id=$2`,[user_id,id])
    if (rowCount === 0) {
    return res.status(404).json({ message: "Wishlist item not found" });
    }

    return res.status(200).json({ message: "Item removed from wishlist" });

} catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Internal server error when removing wishlist item",
    });
  }
};
