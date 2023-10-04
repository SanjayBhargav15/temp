const express = require('express');
const mongoose = require('mongoose');
const Menu = mongoose.model('menu');

const menuList = async (req, res) => {
  try {
    const results = await Menu.find();
    const menus = results.map(result => ({
      _id: result._id,
      name: result.name,
      price: result.price,
      image:result.image,
      rating: result.rating,
      availability: result.availability,
      menuInfomation: result.menuInfomation,
      reviews: result.reviews,
      category: result.category,
    }));
    res.status(200).json(menus);
  } catch (err) {
    res.status(500).json({ error: 'An error occurred while fetching menus.' });
  }
};

const menuCreate = (req, res) => {
  Menu.create({
    name: req.body.name,
    price: req.body.price,
    rating: req.body.rating,
    availability: req.body.availability,
    menuInfomation: req.body.menuInfomation,
    reviews: req.body.reviews,
  },
  (err, menu) => {
    if (err) {
      res.status(400).json(err);
    } else {
      res.status(201).json(menu);
    }
  });
};

const menuReadOne = async (req, res) => {
  try {
    const menu = await Menu.findById(req.params.menuid).exec();
    if (!menu) {
      return res.status(404).json({"message": "menu not found"});
    }
    return res.status(200).json(menu);
  } catch (err) {
    return res.status(404).json(err);
  }
};

const menuUpdateOne = (req, res) => {
  const menuId = req.params.menuid;

  if (!menuId) {
    return res.status(400).json({ "message": "menuid is required" });
  }

  Menu.findByIdAndUpdate(
    menuId,
    {
      $set: {
        name: req.body.name,
        price: req.body.price,
        rating: req.body.rating,
        availability: req.body.availability,
        menuInfomation: req.body.menuInfomation,
        reviews: req.body.reviews,
      },
    },
    { new: true },
    (err, updatedMenu) => {
      if (err) {
        return res.status(500).json(err);
      }
      if (!updatedMenu) {
        return res.status(404).json({ "message": "menuid not found" });
      }

      res.status(200).json(updatedMenu);
    }
  );
};

const menuDeleteOne = (req, res) => {
  const menuId = req.params.menuid;

  if (!menuId) {
    return res.status(400).json({ "message": "menuid is required" });
  }

  Menu.findByIdAndRemove(menuId, (err, deletedMenu) => {
    if (err) {
      return res.status(500).json(err);
    }
    if (!deletedMenu) {
      return res.status(404).json({ "message": "menuid not found" });
    }

    res.status(204).json(null);
  });
};

module.exports = {
  menuList,
  menuCreate,
  menuReadOne,
  menuUpdateOne,
  menuDeleteOne
};
