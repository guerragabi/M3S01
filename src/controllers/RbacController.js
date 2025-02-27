const { escape } = require("querystring")
const Permission = require("../models/Permission")
const PermissionRole = require("../models/PermissionRole")
const Role = require("../models/Role")
const User = require("../models/User")
const UserRole = require("../models/UserRole")

class RbacController {
    async listPermissions(req, res){
        const data = await Permission.findAll()

        return res.status(200).send(data)
    }

    async listRoles(req, res){
        const data = await Role.findAll()

        return res.status(200).send(data)
    }

    async createOnePermission(req, res){
        try {
            const dados = req.body

            if(!dados.description){
                return res.status(400).send("A descrição é obrigatória.")
            }

            const novo = await Permission.create(dados)

            return res.status(201).send(novo)
        } catch (error) {
            console.log(error.message)
            return res.status(500).send("Algo deu errado!")
        }
    }

    async createOneRole(req, res){
        try {
            const dados = req.body

            if(!dados.description){
                return res.status(400).send("A descrição é obrigatória.")
            }

            const roleExists = await Role.findOne({where: {description: dados.description}})
        
            if(roleExists){
                return res.status(400).send("Já existe uma função com essa descrição.")  
            }
            
            const novo = await Role.create(dados)

            return res.status(201).send(novo)

        } catch (error) {
            console.log(error.message)
            return res.status(500).send("Algo deu errado!")
        }
    }

    async listPermissionsByRole(req, res){
        try {
            const {id} = req.params

            const role = await Role.findOne({
                where: {id: id},
                include: [{model: Permission}]
            })

            if(!role){
                return res.status(404).send("Função não encontrada!")
            }

            return res.status(200).send(role)

        } catch (error) {
            console.log(error.message)
            return res.status(500).send("Algo deu errado!")
        }
    }

    async addPermissionToRole(req, res){
        try {
            const {permissionId, roleId} = req.body

            if(!permissionId || !roleId){
                return res.status(400).send("O id da permissão e do role são obrigatórios!")
            }

            const roleExists = await Role.findByPk(roleId)
            const permissionExists = await Permission.findByPk(permissionId)

            if(!roleExists){
                return res.status(400).send("Role não encontrado!")
            }

            if(!permissionExists){
                return res.status(400).send("Permissão não encontrada!")
            }

            const permissionRoleNovo = await PermissionRole.create({
                permissionId: permissionId,
                roleId: roleId
            })

            return res.status(201).send(permissionRoleNovo)
        } catch (error) {
            console.log(error.message)
            return res.status(500).send("Algo deu errado!")            
        }
    }

    async addRoleToUser(req, res){
        try {
            const { userId, roleId } = req.body

            if(!userId || !roleId){
                return res.status(400).send("O id do usuário e do role são obrigatórios!")
            }

            const userExists = await User.findByPk(userId)
            const roleExists = await Role.findByPk(roleId)
            
            if(!userExists){
                return res.status(400).send("Usuário não encontrado!")
            }

            if(!roleExists){
                return res.status(400).send("Role não encontrado!")
            }

            const userRoleNovo = await UserRole.create({
                userId: userId,
                roleId: roleId
            })

            return res.status(201).send(userRoleNovo)

        } catch (error) {
            console.log(error.message)
            return res.status(500).send("Algo deu errado!")
        }
    }
}

module.exports = new RbacController()
