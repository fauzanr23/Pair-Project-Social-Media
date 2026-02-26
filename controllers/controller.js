const { Post, Profile, Tag, User } = require("../models/index")
const { Helper } = require("../helpers/index")
const { Op } = require("sequelize")
class Controller {

    //halaman login
    static async getLogin(req,res) {
        try {
            if (req.session.UserId) {
                return res.redirect("/explore")
            }
            res.render("login")
        } catch (error) {
            res.send(error)
        }
    }
    //fungsi login
    static async postLogin(req,res) {
        try {
            const { email, password } = req.body
            const user = await User.findOne({ where: { email }})

            if (!user) {
                return res.render("login", { error: "Email is not registered" })
            }

            const isMatch = Helper.comparePassword(password, user.password)

            if (!isMatch) {
                return res.render("login", { error: "Invalid password"})
            }

            req.session.UserId = user.id
            res.redirect("/explore")
        } catch (error) {
            res.send(error)
        }
    }
    //halaman register
    static async getRegister(req,res) {
        try {
            if (req.session.userId) {
                return res.redirect("/explore")
            }

            res.render("register")
        } catch (error) {
            res.send(error)
        }
    }
    //submit register
    static async postRegister(req,res) {
        try {
            const { username, email, password } = req.body
            const newUser = await User.create({username, email, password})

            await Profile.create({ UserId: newUser.id })
            res.redirect("/login")
        } catch (error) {
            res.render("register", { error: error.errors?.[0]?.message || error.message })
        }
    }

    //halaman home (ada form buat status)
    static async getExplore(req,res) {
        try {
            const post = await Post.findAll({
                include: [
                    { model: User },
                    { model: Tag },
                ],
                order: [["createdAt", "DESC"]]
            })
            res.render("explore", { posts })
        } catch (error) {
            res.send(error)
        }
    }

    //Posting status
    static async postExplore(req,res) {
        try {
            const { content } = req.body
            const newPost = await Post.create({
                content,
                UserId: req.session.UserId
            })
            
            const hashtags = content.match(/#\w+/g)
            if (hashtags) {
                for (const tag of hashtags) {
                    const [tagInstance] = await Tag.findOrCreate({
                        where: { name: tag }
                    })
                    await newPost.addTag(tagInstance)
                }
            }
            res.redirect("/explore")
        } catch (error) {
            res.send(error)
        }
    }

    //halaman search
    static async getSearch(req,res) {
        try {
            const { q } = req.query
            const posts = await Post.findAll({
                where: {
                    content: {
                        [Op.like]: `%${q}%`
                    }
                },
                include: [{ model: User }]
            })
            res.render("search", { posts, keyword: q })
        } catch (error) {
            res.send(error)
        }
    }
    //halaman profile
    static async getProfile(req,res) {
        try {
            const { id } = req.params
            const user = await User.findByPk(id, {
                include: [
                    { model: Profile },
                    {
                        model: Post,
                        include: [{ model: Tag }]
                    }
                ]
            })

            if (!user) {
                return res.render("404", { message: "User is not found" })
            }

            const isOwner = req.session.UserId == id
            res.render("profile", { user, isOwner })
        } catch (error) {
            res.send(error)
        }
    }

    //halaman edit profile
    static async getEditProf(req,res) {
        try {
            const profile = await Profile.findOne({
                where: { UserId: req.session.userId }
            })
            res.render("editProfile", { profile })
        } catch (error) {
            res.send(error)
        }
    }

    //submit edit profile
    static async postEditProf(req,res) {
        try {
            const { bio, profilePicture } = req.body
            await Profile.update(
                { bio, profilePicture },
                { where: { UserId: req.session.userId }}
            )

            res.redirect(`/profile/${req.session.userId}`)
        } catch (error) {
            res.send(error)
        }
    }

    //tampilan post/status
    static async getPost(req,res) {
        try {
            const { id } = req.params
            const post = await Post.findByPk(id, {
                include: [
                    { model: User },
                    { model: Tag }
                ]
            })

            if (!post) {
                return res.render("404", { message: "Post is not found" })
            }

            const isOwner = req.session.userId == post.UserId
            res.render("post", { post, isOwner })
        } catch (error) {
            res.send(error)
        }
    }
    //submit post/status yang diedit
    static async postEditPost(req,res) {
        try {
            const { id } = req.params
            const { content } = req.body
            const post = await Post.findByPk(id)

            if (post.UserId !== req.session.userId) {
                return res.render("403", { message: "You don't have access!" })
            }

            await Post.update(
                { content },
                { where: { id } }
            )

            await post.setTags([])

            const hashtags = content.match(/#\w+/g)
            if (hashtags) {
                for (const tag of hashtags) {
                    const [tagInstance] = await Tag.findOrCreate({
                        where: { name: tag }
                    })
                    await post.addTag(tagInstance)
                }
            }

            res.redirect(`/post/${id}`)
        } catch (error) {
            res.send(error)
        }
    }
}

module.exports = Controller