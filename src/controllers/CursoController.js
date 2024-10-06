const Curso = require('../models/Curso')

class CursoController {
    async cadastrar(req, res){
        try {
            const nome = req.body.nome
            const duracao_horas = req.body.duracao_horas

            if (!nome) {
                return res.status(400).json({ erro: "Informe o nome do curso." })
            }
            if (!duracao_horas) {
                return res.status(400).json({ erro: "Informe a duração do curso." })
            }

            const curso = await Curso.create({
                nome: nome,
                duracao_horas: duracao_horas
            })

            res.status(201).json(curso)
        } catch (error) {
            console.log(error.message)
            res.status(500).json({erro: "Não foi possível cadastrar o curso."})
        }
    }

    async listarTodos(req, res) {
        try {
            const cursos = await Curso.findAll()
            res.json(cursos)
        } catch (error) {
            res.status(500).json({erro: "Não foi possível listar os cursos."})
        }
    }

    async listarUm (req, res) {
        try {
            const {id} = req.params
            const curso = await Curso.findByPk(id)

            if (!curso){
                return res.status(404).json({ erro: "Nenhum curso cadastrado com o id informado." })
            }

            res.json(curso)
        } catch (error) {
            console.log(error.message)
            res.status(500).json({error: "Não foi possível listar o curso."})
        }
    }

    async atualizar(req, res) {
        const {id} = req.params
        try {
            const curso = await Curso.findByPk(id)
            if(!curso) {
                return res.status(404).json({erro: "Nenhum curso cadastrado com o id informado."})
            }
            await curso.update(req.body)
            await curso.save()
            res.status(200).json({mensagem: "Cadastro atualizado com sucesso."})
        } catch (error) {
            console.log(error)
            return res.status(500).json({erro: "Erro ao atualizar o cadastro."})
        }

    }

    async excluir(req, res) {
        try {
            const {id} = req.params
            const curso = await Curso.findByPk(id)

            if (!curso) {
                return res.status(404).json({ erro: "Nenhum curso cadastrado com o id informado." })
            }

            Aluno.destroy({
                where: {
                    id: id
                }
            })

            res.status(204).json({mensagem: "Cadastro excluído com sucesso."})
        } catch (error) {
            console.log(error.message)
            res.status(500).json({erro: "Não foi possível excluir o cadastro."})
        }
    }
}

module.exports = new CursoController()

