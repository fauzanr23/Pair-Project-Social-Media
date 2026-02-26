const { Post, Profile, Tag, User, PostTag } = require("../models/index")
const { Helper } = require("../helpers/index")
const { Op } = require("sequelize")
const bcrypt = require("bcryptjs")
class Controller {

    //halaman login
    static async getLogin(req, res) {
        try {
            const { error } = req.query
            res.render("login", { error })
        } catch (error) {
            res.send(error)
        }
    }
    //fungsi login
    static async postLogin(req, res) {
        try {
            const { email, password } = req.body
            let user = await User.findOne({
                where: {
                    email: email
                }
            });

            if (user) {
                const isValidPassword = bcrypt.compareSync(password, user.password)

                if (isValidPassword) {
                    req.session.user = {
                        id: user.id,
                        role: user.role,
                        username: user.username
                    }
                    return res.redirect("/explore")
                } else {
                    const error = "Invalid email/password!"
                    return res.redirect(`/start?error=${error}`)
                }
            } else {
                const error = "Invalid email/password!"
                return res.redirect(`/start?error=${error}`)
            }
        } catch (error) {
            res.send(error)
        }
    }
    //logout
    static async getLogout(req, res) {
        try {
            req.session.destroy()
            res.redirect("/start")
        } catch (error) {
            res.send(error)
        }
    }
    //halaman register
    static async getRegister(req, res) {
        try {
            res.render("register")
        } catch (error) {
            res.send(error)
        }
    }
    //submit register
    static async postRegister(req, res) {
        try {
            const { username, email, password, dateOfBirth } = req.body
            let user = await User.create({
                username,
                email,
                password,
                dateOfBirth
            })
            await Profile.create({
                UserId: user.id,
                name: user.username
            })
            res.redirect("/")
        } catch (error) {
            res.send(error)
        }
    }

    //halaman home (ada form buat status)
    static async getExplore(req, res) {
        try {
            const userId = req.session.user.id
            const profile = await Profile.findOne({
                where: {
                    UserId: userId
                }
            })
            let posts = await Post.findAll({
                include: Tag
            })
            res.render("explore", { posts, profile })
        } catch (error) {
            res.send(error)
        }
    }

    //Posting status
    static async postExplore(req, res) {
        try {
            const { ProfileId } = req.params

            const { title, content, imageUrl, name } = req.body
            let post = await Post.create({
                title,
                content,
                imageUrl,
                ProfileId
            })
            let tag;
            if (name) {
                tag = await Tag.create({
                    name
                })
                await PostTag.create({
                    PostId: post.id,
                    TagId: tag.id
                })
            } else {
                await PostTag.create({
                    PostId: post.id,
                })
            }

            await Like.create({
                PostId: post.id,
                UserId: ProfileId
            })

            res.redirect("/explore")
        } catch (error) {
            console.log(error);

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