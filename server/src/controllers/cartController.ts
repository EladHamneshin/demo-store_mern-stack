import asyncHandler from "express-async-handler";
import { Request, Response } from "express";
import STATUS_CODES from "../utils/StatusCodes.js";
import RequestError from "../types/errors/RequestError.js";
import cartService from "../services/cartService.js";

// @desc    Get shopping cart
// @route   GET /api/cart
// @access  Private
const getCart = asyncHandler(async (req, res) => {
  const cart = await cartService.getCart(req.userId);

  res.json({
    cartId: cart?.id,
    items: cart?.items.map((item) => 
    item
    ),
  });
});

// @desc    Update shopping cart
// @route   PUT /api/cart
// @access  Private

export default { getCart };
