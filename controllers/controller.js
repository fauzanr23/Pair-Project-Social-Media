const { Post, Profile, Tag, User } = require("../models/index")
const { Helper } = require("../helpers/index")
const { Op } = require("sequelize")
class Controller {

    //halaman login
    static async getLogin(req, res) {
        try {

        } catch (error) {
            res.send(error)
        }
    }
    //fungsi login
    static async postLogin(req, res) {
        try {

        } catch (error) {
            res.send(error)
        }
    }
    //halaman register
    static async getRegister(req, res) {
        try {

        } catch (error) {
            res.send(error)
        }
    }
    //submit register
    static async postRegister(req, res) {
        try {

        } catch (error) {
            res.send(error)
        }
    }

    //halaman home (ada form buat status)
    static async getExplore(req, res) {
        try {
            let posts = await Post.findAll()
            res.render("explore", { posts })
        } catch (error) {
            res.send(error)
        }
    }

    //Posting status
    static async postExplore(req, res) {
        try {
            const { ProfileId } = req.params
            const { title, content, imageUrl } = req.body
            await Post.create({
                title,
                content,
                imageUrl,
                ProfileId
            })
        } catch (error) {
            res.send(error)
        }
    }

    //halaman search
    static async getSearch(req, res) {
        try {
            const { searchTag } = req.query
            let postTags = await Post.findAll({
                include: {
                    model: Tag,
                    where: {
                        name: {
                            [Op.iLike]: `%${searchTag}%`
                        }
                    }
                }
            })
            res.render("search", { postTags })
        } catch (error) {
            res.send(error)
        }
    }
    //halaman profile
    static async getProfile(req, res) {
        try {
            const { id } = req.params
            let profile = await Profile.findByPk(id)
            res.render("profile", { profile })
        } catch (error) {
            res.send(error)
        }
    }

    //halaman edit profile
    static async getEditProf(req, res) {
        try {

        } catch (error) {
            res.send(error)
        }
    }

    //submit edit profile
    static async postEditProf(req, res) {
        try {

        } catch (error) {
            res.send(error)
        }
    }

    //tampilan post/status
    static async getPost(req, res) {
        try {

        } catch (error) {
            res.send(error)
        }
    }
    //submit post/status yang diedit
    static async postEditPost(req, res) {
        try {

        } catch (error) {
            res.send(error)
        }
    }
}

module.exports = Controller