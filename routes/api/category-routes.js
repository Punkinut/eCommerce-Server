const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  try {
    const categories = await Category.findAll({
      include: [{ model: Product }],
    });
    return res.status(200).json(categories)
  } catch (err) {
    return res.status(400).json(err)
  };
});

router.get('/:id', async (req, res) => {
  try {
    const selectedCategory = await Category.findByPk(req.params.id, {
      include: [{ model: Product}],
    });
    return res.status(200).json(selectedCategory)
  } catch (err) {
    return res.status(400).json(err)
  };
});

router.post('/', async (req, res) => {
  try {
    const newCategory = await Category.create(
      {
        category_name: req.body.category_name,
      }
    )
    const updateView = await Category.findAll({
      where: {
        category_name: req.body.category_name
      },
    })
    return res.status(200).json(updateView)
  } catch (err) {
    return res.status(400).json(err)
  }
});

router.put('/:id', async (req, res) => {
  try {
    const updateCategory = await Category.update(
      {
        category_name: req.body.category_name,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    )
    return res.status(200).json(updateCategory)
  } catch (err) {
    return res.status(400).json(err)
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const deleteCategory = await Category.destroy({
      where: {
        id: req.params.id,
      },
    })
    return res.status(200).json(deleteCategory)
  } catch (err) {
    return res.status(400).json(err)
  }
});

module.exports = router;
