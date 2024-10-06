const Aluno = require('../models/Aluno')
const Usuario = require('../models/Usuario')
const {sign} = require('jsonwebtoken')
const { compare } = require("bcrypt")

class LoginController {
    async logar(req, res) {
        try {
            const email = req.body.email
            const password = req.body.password

            if(!email) {
                return res.status(400).json({ erro: "Informe o email."})
            }
            if(!password) {
                return res.status(400).json({ erro: "Informe a senha." })
            }

            const aluno = await Aluno.findOne({
                where: {
                    email: email
                }
            })

            if(!aluno) {
                const usuario = await Usuario.findOne({
                    where: {
                        email: email
                    }
                })
    
                if(!usuario) {
                    return res.status(404).json({erro: "Nenhum usuário cadastrado com o email informado."})
                }
    
                const hashSenha = await compare(password, usuario.password)
    
                if(hashSenha === false) {
                    return res.status(400).json({mensagem: "Conta não encontrada."})
                }
    
                const payload = {
                    sub: usuario.id,
                    email: usuario.email,
                    nome: usuario.nome
                }
    
                const token = sign(payload, process.env.SECRET_JWT)
    
                res.status(200).json({token: token})
            }

            const hashSenha = await compare(password, aluno.password)
    
            if(hashSenha === false) {
                return res.status(400).json({mensagem: "Conta não encontrada."})
            }

            const payload = {
                sub: aluno.id,
                email: aluno.email,
                nome: aluno.nome
            }

            const token = sign(payload, process.env.SECRET_JWT)

            res.status(200).json({token: token})
            

        } catch (error) {
            console.log(error)
            return res.status(500).json({mensagem: "Algo deu errado."})
        }
    }
}

module.exports = new LoginController()
