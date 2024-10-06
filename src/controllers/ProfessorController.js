const Professor = require('../models/Professor')

class ProfessorController {
    async cadastrar(req, res) {
        try {
            const nome = req.body.nome
            const data_nascimento = req.body.data_nascimento
            const telefone = req.body.telefone
            const materia = req.body.materia
        
            if (!nome) {
                return res.status(400).json({ erro: "Informe o nome."})
            }
            if (!data_nascimento) {
                return res.status(400).json({ erro: "Informe a data de nascimento." })
            }
            if (!data_nascimento.match(/\d{4}-\d{2}-\d{2}/gm)) {
                return res.status(400).json({ erro: "A data de nascimento deve estar no formato AAAA-MM-DD." })
            }
            if (!materia) {
                return res.status(400).json({ erro: "Informe a matéria." })
            }

            const professor = await Professor.create({
                nome: nome,
                data_nascimento: data_nascimento,
                telefone: telefone,
                materia: materia
            })

            res.status(201).json(professor)
       
        } catch (error) {
            console.log(error.message)
            res.status(500).json({erro: "Não foi possível cadastrar o professor."})
            
        }
    }

    async listarTodos(req, res) {
        try {
            const professores = await Professor.findAll()
            res.json(professores)

        } catch (error) {
            res.status(500).json({erro: "Não foi possível listar os professores."})
        }
    }

    async listarUm(req, res) {
        try {
            const {id} = req.params
            const professor = await Professor.findByPk(id)

            if(!professor){
                return res.status(404).json({ erro: "Nenhum professor cadastrado com o id informado." })   
            }

            res.json(professor)

        } catch (error) {
            console.log(error.message)
            res.status(500).json({erro: "Não foi possível listar o professor."})
        }
    }

    async atualizar(req, res) {
        try {
            const {id} = req.params
            const professor = await Professor.findByPk(id)

            if (!professor){
                return res.status(400).json({ erro: "Nenhum professor cadastrado com o id informado."  })
            }

            await professor.update(req.body)
            await professor.save()

            res.status(200).json({mensagem: "Cadastro atualizado com sucesso."})
       
        } catch (error) {
            console.log(error)
            return res.status(500).json({erro: "Erro ao atualizar o cadastro."})
        }
    }

    async excluir(req, res) {
        try {
            const {id} = req.params
            const professor = await Professor.findByPk(id)

            if (!professor) {
                return res.status(404).json({ erro: "Nenhum professor cadastrado com o id informado." })
            }

            Professor.destroy({
                where: {
                    id: id
                }
            })

            res.status(204).json({menasgem: "Cadastro excluído com sucesso."})
      
        } catch (error) {
            console.log(error)
            res.status(500).json({erro: "Não foi possível excluir o cadastro."})
        }
    }
}

module.exports = new ProfessorController()
