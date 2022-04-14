class CategoryModel{
      constructor(
        categotyName="",
        description="", 
        adminId="", 
        id=null) {
        this.id= id;
        this.categotyName= categotyName;
        this.description= description;
        this.adminId= adminId;
    }
}

exports.CategoryModel= CategoryModel;