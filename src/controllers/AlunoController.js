const Aluno = require('../models/Aluno')

class AlunoController {
    async cadastrar(req, res) {
        try {
            const nome = req.body.nome
            const data_nascimento = req.body.data_nascimento
            const telefone = req.body.telefone
            const email = req.body.email
            const password = req.body.password

            if (!nome) {
                return res.status(400).json({ erro: "Informe o nome."})
            }
            if (!data_nascimento) {
                return res.status(400).json({ erro: "Informe a data de nascimento." })
            }
            if (!data_nascimento.match(/\d{4}-\d{2}-\d{2}/gm)) {
                return res.status(400).json({ erro: "A data de nascimento deve estar no formato AAAA-MM-DD." })
            }
            if (!email) {
                return res.status(400).json({ erro: "Informe o email." })
            }
            if (!password) {
                return res.status(400).json({ erro: "Informe a senha." })
            }
           
            const aluno = await Aluno.create({
                nome: nome,
                data_nascimento: data_nascimento,
                telefone: telefone,
                email: email,
                password: password
            })

            res.status(201).json(aluno)

        } catch (error) {
            console.log(error.message)
            res.status(500).json({ erro: "Não foi possível cadastrar o aluno." })
        }
    }

    async listarTodos(req, res) {
        try {
            const alunos = await Aluno.findAll()
            res.json(alunos)

        } catch (error) {
            res.status(500).json({ erro: "Não foi possível listar os alunos." })
        }
    }

    async listarUm(req, res) {
        try {
            const { id } = req.params
            const aluno = await Aluno.findByPk(id)

            if (!aluno) {
                console.log(error.message)
                return res.status(404).json({ erro: "Nenhum aluno cadastrado com o id informado." })
            }

            res.json(aluno)

        } catch (error) {
            console.log(error.message)
            res.status(500).json({erro: "Não foi possível listar o aluno."})
        }
    }

    async atualizar(req, res) {
        try {
            const { id } = req.params
            const aluno = await Aluno.findByPk(id)

            if (!aluno) {
                return res.status(400).json({ erro: "Nenhum aluno cadastrado com o id informado."  })
            }

            await aluno.update(req.body)
            await aluno.save()

            res.status(200).json({ mensagem: "Cadastro atualizado com sucesso." })
       
        } catch (error) {
            console.log(error)
            return res.status(500).json({ erro: "Erro ao atualizar o cadastro." })
        }
    }

    async excluir(req, res) {
        try {
            const { id } = req.params
            const aluno = await Aluno.findByPk(id)

            if (!aluno) {
                return res.status(404).json({ erro: "Nenhum aluno cadastrado com o id informado." })
            }

            Aluno.destroy({
                where: {
                    id: id
                }
            })

            res.status(204).json({ mensagem: "Cadastro excluído com sucesso." })
       
        } catch (error) {
            console.log(error.message)
            res.status(500).json({erro: "Não foi possível excluir o cadastro."})
        }
    }
}

module.exports = new AlunoController()

