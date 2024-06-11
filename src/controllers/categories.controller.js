const { categoriesService } = require("../services/categories.service");

class CategoriesController {

  async getAllCategories(req, res) {
    const categories = await categoriesService.getAllCategories();
    return res.json(categories).status(200);
  }

  async getCategoryById(req, res) {
    const category = await categoriesService.getCategoryById(req.params.id);
    return category
      ? res.json(category).status(200)
      : res.status(404).json({ message: "not found" });
  }

  async createNewCategory(req,res){
    // const checkCategValidate = await categoriesService.checkCategories(req.body.name);
    // if (checkCategValidate) return res.status(409).json({message: 'Ya existe la categoría'}); Pendiente por categoría repitente
    
    const category = await categoriesService.createCategory(req.body);
    return res.json(category).status(201);
  }
}

const categoriesController = new CategoriesController();
module.exports = { categoriesController };
