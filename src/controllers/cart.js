// import db from "../config/sequelize";
const db = require("../config/sequelize");
const { cart, Material } = require("../models");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

exports.add = async (req, res) => {
  const error = validationResult(req);

  //GRAB USER ID FORM AUTH
  const { user_id } = req.user;

  //DESTRUCTURE THE BODY
  const { product_id, quantity } = req.body;

  if (!error.isEmpty()) {
    return res.send({
      error: error.array(),
    });
  }

  try {
    //CHECK IF THE ITEM HAVE ALREADY BEEN ADDED TO CART

    const cartExist = await cart.findOne({
      where: {
        user_id,
        product_id,
      },
    });

    if (cartExist) {
      return res.status(400).json({
        success: false,
        message: "Item have already been added to cart",
      });
    }

    //PROCEED TO ADDING THE ITEM TO CART

    const addToCart = await cart.create(
      {
        user_id,
        product_id,
        quantity,
      },
      {}
    );

    if (!addToCart) {
      return res.status(400).json({
        success: false,
        message: "Failed to add item to cart",
      });
    }

    return res.status(200).json({
      success: true,
      message: `item have been added to cart`,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: `Adding Failed: ${err.message}`,
    });
  }
};

exports.showAll = async (req, res) => {
  const error = validationResult(req);

  //GRAB USER ID FORM AUTH
  const { user_id } = req.user;

  let transaction = await db.sequelize.transaction();
  let complete = [];

  if (!error.isEmpty()) {
    return res.send({
      error: error.array(),
    });
  }

  try {
    //CHECK IF THE ITEM HAVE ALREADY BEEN ADDED TO CART

    //PROCEED TO ADDING THE ITEM TO CART

    let fetchCart = await cart.findAll({
      where: {
        user_id,
      },
    });

    if (fetchCart.length === 0) {
      transaction.commit();
      return res.status(200).json({
        success: true,
        message: `No item in cart`,
        items: fetchCart,
      });
    }

    //fetch product information from product id

    for (const item of fetchCart) {
      //destructure the items in the cart
      const { product_id, quantity } = item;
      //retrieve information about the product using the product id

      const fetchProduct = await Material.findOne({
        where: {
          item_id: product_id,
        },
      });

      console.log(fetchProduct);

      if (!fetchProduct) {
        return res.status(404).json({
          success: false,
          message: `cannot retrieve the product information`,
        });
      }

      const { item_name, category, availability, amount, image } = fetchProduct;

      //push the content of the fetch product to the result
      const payload = {
        product_id,
        quantity,
        item_name,
        category,
        availability,
        amount,
        image,
      };
      complete.push(payload);
    }

    transaction.commit();

    return res.status(200).json({
      success: true,
      message: `fetched item in cart`,
      // items: fetchCart,
      items: complete,
    });
  } catch (err) {
    transaction.rollback();
    return res.status(500).json({
      success: false,
      message: `Adding Failed: ${err.message}`,
    });
  }
};

exports.removeCart = async (req, res) => {
  const error = validationResult(req);

  //GRAB USER ID FORM AUTH
  const { user_id } = req.user;

  //DESTRUCTURE THE BODY
  const { product_id } = req.body;

  if (!error.isEmpty()) {
    return res.send({
      error: error.array(),
    });
  }

  try {
    //CHECK IF THE PRODUCT ID IS VALID

    const cartExist = await cart.findOne({
      where: {
        user_id,
        product_id,
      },
    });

    //IF CART PRODUCT EXIST, THEN REMOVE IT FROM THE CART

    if (!cartExist) {
      return res.status(400).json({
        success: false,
        message: "Cannot find product ",
      });
    }

    //PROCEED TO ADDING THE ITEM TO CART

    const addToCart = await cart.destroy({
      where: {
        user_id,
        product_id,
      },
    });

    if (!addToCart) {
      return res.status(400).json({
        success: false,
        message: "Failed to remove item from cart. Try again",
      });
    }

    return res.status(200).json({
      success: true,
      message: `item have been deleted successfully`,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: `Removing  Failed: ${err.message}`,
    });
  }
};
