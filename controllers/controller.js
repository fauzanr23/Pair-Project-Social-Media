const { Post, Profile, Tag, User, PostTag, Like } = require("../models/index")
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
            const { errors } = req.query
            res.render("register", { errors })
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
            if (error.name === "SequelizeValidationError") {
                let errors = error.errors.map((el) => el.message)
                res.redirect(`/start/register?errors=${errors}`)
            } else {
                res.send(error)
            }
        }
    }

    //halaman home (ada form buat status)
    static async getExplore(req, res) {
        try {
            const { errors } = req.query
            const userId = req.session.user.id
            const isAdmin = req.session.user.role === "admin"
            const profile = await Profile.findOne({
                where: {
                    UserId: userId
                }
            })
            let tags = await Tag.findAll()
            let posts = await Post.findAll({
                include: Tag,
                order: [['createdAt', "DESC"]]
            })
            let likeCounts = {}
            for (const el of posts) {
                likeCounts[el.id] = await Post.getLikeCount(el.id)
            }
            let likes = await Like.findAll({
                where: {
                    UserId: userId,
                    isLiked: true
                }
            })
            const likedPostIds = likes.map(el => el.PostId)
            res.render("explore", { tags, profile, posts, isAdmin, likedPostIds, likeCounts, errors })
        } catch (error) {

            res.send(error)
        }
    }

    //Posting status
    static async postExplore(req, res) {
        try {
            const { ProfileId } = req.params

            const { title, content, imageUrl, id } = req.body
            if (!id) {
                res.redirect(`/explore?errors=All fields must be filled (except image)!`)
            } else {
                let post = await Post.create({
                    title,
                    content,
                    imageUrl,
                    ProfileId
                })
                await PostTag.create({
                    PostId: post.id,
                    TagId: id
                })

            }

            res.redirect("/explore")
        } catch (error) {
            if (error.name === "SequelizeValidationError") {
                let errors = error.errors.map((el) => el.message)
                res.redirect(`/explore?errors=${errors}`)
            } else {
                res.send(error)
            }
        }
    }

    //halaman search
    static async getSearch(req, res) {
        try {
            const { search, searchBy } = req.query
            const isAdmin = req.session.user.role === "admin"
            const keyword = search || ""
            let postTags = []
            let profiles = []

            if (searchBy === "profile") {
                profiles = await Profile.findAll({
                    where: {
                        name: {
                            [Op.iLike]: `%${keyword}%`
                        }
                    },
                    include: {
                        model: User,
                        where: {
                            role: {
                                [Op.ne]: "admin"
                            }
                        }
                    }
                })
            } else {
                postTags = await Post.findAll({
                    include: [
                        {
                            model: Tag,
                            where: {
                                name: {
                                    [Op.iLike]: `%${keyword}%`
                                }
                            }
                        },
                        {
                            model: Profile
                        }
                    ]
                })
            }
            let likeCounts = {}
            for (const el of postTags) {
                likeCounts[el.id] = await Post.getLikeCount(el.id)
            }
            let likes = await Like.findAll({
                where: {
                    UserId: req.session.user.id,
                    isLiked: true
                }
            })
            const likedPostIds = likes.map(el => el.PostId)
            res.render("search", { postTags, profiles, searchBy, search: keyword, isAdmin, likedPostIds, likeCounts })
        } catch (error) {
            res.send(error)
        }
    }
    //halaman profile
    static async getProfile(req, res) {
        try {
            const userId = req.session.user.id
            const isAdmin = req.session.user.role === "admin"
            let profile = await Profile.findOne({
                where: {
                    UserId: userId
                },
                include: {
                    model: Post,
                    include: Tag
                },
                order: [[Post, "createdAt", "DESC"]]
            })
            let likeCounts = {}
            for (const el of profile.Posts) {
                likeCounts[el.id] = await Post.getLikeCount(el.id)
            }
            let likes = await Like.findAll({
                where: {
                    UserId: userId,
                    isLiked: true
                }
            })
            const likedPostIds = likes.map(el => el.PostId)
            res.render("profile", { profile, isOwner: true, isAdmin, likedPostIds, likeCounts })
        } catch (error) {
            res.send(error)
        }
    }

    //halaman profile by id
    static async getProfileById(req, res) {
        try {
            const { ProfileId } = req.params
            const isAdmin = req.session.user.role === "admin"
            let profile = await Profile.findByPk(ProfileId, {
                include: {
                    model: Post,
                    include: Tag
                },
                order: [[Post, "createdAt", "DESC"]]
            })
            if (!profile) {
                return res.redirect("/profile")
            }
            const isOwner = req.session.user.id === profile.UserId
            let likeCounts = {}
            for (const el of profile.Posts) {
                likeCounts[el.id] = await Post.getLikeCount(el.id)
            }
            let likes = await Like.findAll({
                where: {
                    UserId: req.session.user.id,
                    isLiked: true
                }
            })
            const likedPostIds = likes.map(el => el.PostId)
            res.render("profile", { profile, isOwner, isAdmin, likedPostIds, likeCounts })
        } catch (error) {
            res.send(error)
        }
    }

    //halaman edit profile
    static async getEditProf(req, res) {
        try {
            const { ProfileId } = req.params
            const userId = req.session.user.id
            let profile = await Profile.findOne({
                where: {
                    id: ProfileId,
                    UserId: userId
                }
            })
            if (!profile) {
                return res.redirect("/profile")
            }
            res.render("editProfile", { profile })
        } catch (error) {
            res.send(error)
        }
    }

    //submit edit profile
    static async postEditProf(req, res) {
        try {
            const { ProfileId } = req.params
            const userId = req.session.user.id
            const { photo, description, name } = req.body
            await Profile.update({
                photo,
                description,
                name
            }, {
                where: {
                    id: ProfileId,
                    UserId: userId
                }
            })
            res.redirect("/profile")
        } catch (error) {
            res.send(error)
        }
    }

    //hapus post
    static async getDelete(req, res) {
        try {
            const { ProfileId, PostId } = req.params
            const userId = req.session.user.id
            const role = req.session.user.role
            let myProfile = await Profile.findOne({
                where: {
                    UserId: userId
                }
            })
            let post = await Post.findByPk(PostId)

            if (!post) {
                return res.redirect("/explore")
            }

            if (Number(post.ProfileId) !== Number(ProfileId)) {
                return res.redirect("/explore")
            }

            const isOwner = myProfile && Number(myProfile.id) === Number(post.ProfileId)
            const isAdminCanDelete = role === "admin" && post.isFlagged === true

            if (!isOwner && !isAdminCanDelete) {
                return res.redirect("/explore")
            }

            await PostTag.destroy({
                where: {
                    PostId
                }
            })

            await Like.destroy({
                where: {
                    PostId
                }
            })

            await Post.destroy({
                where: {
                    id: PostId
                }
            })

            res.redirect("/profile")
        } catch (error) {
            res.send(error)
        }
    }

    //flag post
    static async getFlag(req, res) {
        try {
            const { PostId } = req.params
            const role = req.session.user.role

            if (role !== "admin") {
                return res.redirect("/explore")
            }

            await Post.update({
                isFlagged: true
            }, {
                where: {
                    id: PostId
                }
            })

            res.redirect(req.get("referer") || "/explore")
        } catch (error) {
            res.send(error)
        }
    }

    //unflag post
    static async getUnflag(req, res) {
        try {
            const { PostId } = req.params
            const role = req.session.user.role

            if (role !== "admin") {
                return res.redirect("/explore")
            }

            await Post.update({
                isFlagged: false
            }, {
                where: {
                    id: PostId
                }
            })

            res.redirect(req.get("referer") || "/explore")
        } catch (error) {
            res.send(error)
        }
    }

    //like post
    static async getLike(req, res) {
        try {
            const { PostId } = req.params
            const userId = req.session.user.id

            const [updatedRows] = await Like.update({
                isLiked: true
            }, {
                where: {
                    PostId,
                    UserId: userId
                }
            })

            if (!updatedRows) {
                await Like.create({
                    PostId,
                    UserId: userId,
                    isLiked: true
                })
            }

            res.redirect(req.get("referer") || "/explore")
        } catch (error) {
            res.send(error)
        }
    }

    //unlike post
    static async getUnlike(req, res) {
        try {
            const { PostId } = req.params
            const userId = req.session.user.id
            await Like.update({
                isLiked: false
            }, {
                where: {
                    PostId,
                    UserId: userId
                }
            })

            res.redirect(req.get("referer") || "/explore")
        } catch (error) {
            res.send(error)
        }
    }

}

module.exports = Controller
