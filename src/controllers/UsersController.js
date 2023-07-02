const AppError = require("../utils/AppError");

class UsersController {
    create(request, response) {
        const { cpf, name, email, password, admin } = request.body;

        if(!name){
            throw new AppError("Nome não foi informado, verifique os campos!");
        };

        return response.json({ cpf, name, email, password, admin });
    };
};

module.exports = UsersController;