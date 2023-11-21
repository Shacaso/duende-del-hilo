import { createApp } from "./app.js";
import * as Models from './models/fromJson/index.js'
import { paths } from './dbs/1.allPaths.js'


const models = {
    billModel: new Models.BillModel({ jsonPath: paths.bills }),
    userModel: new Models.UserModel({ jsonPath: paths.users }),
    categoryModel: new Models.CategoryModel({ jsonPath: paths.categories }),
    costumeModel: new Models.CostumeModel({ jsonPath: paths.costumes }),
    departamentModel: new Models.DepartamentModel({ jsonPath: paths.departaments }),
    loginModel: new Models.LoginModel({ jsonPath: paths.login })
}

createApp({ models: models })
