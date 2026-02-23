const { Post, Profile, Tag, User } = require("../models/index")
const { Helper } = require("../helpers/index")
const { Op } = require("sequelize")
class Controller {

    //halaman login
    static async getLogin(req,res) {
        try {
            
        } catch (error) {
            res.send(error)
        }
    }
    //fungsi login
    static async postLogin(req,res) {
        try {
            
        } catch (error) {
            res.send(error)
        }
    }
    //halaman register
    static async getRegister(req,res) {
        try {
            
        } catch (error) {
            res.send(error)
        }
    }
    //submit register
    static async postRegister(req,res) {
        try {
            
        } catch (error) {
            res.send(error)
        }
    }

    //halaman home (ada form buat status)
    static async getExplore(req,res) {
        try {
            
        } catch (error) {
            res.send(error)
        }
    }

    //Posting status
    static async postExplore(req,res) {
        try {
            
        } catch (error) {
            res.send(error)
        }
    }

    //halaman search
    static async getSearch(req,res) {
        try {
            
        } catch (error) {
            res.send(error)
        }
    }
    //halaman profile
    static async getProfile(req,res) {
        try {
            
        } catch (error) {
            res.send(error)
        }
    }

    //halaman edit profile
    static async getEditProf(req,res) {
        try {
            
        } catch (error) {
            res.send(error)
        }
    }

    //submit edit profile
    static async postEditProf(req,res) {
        try {
            
        } catch (error) {
            res.send(error)
        }
    }

    //tampilan post/status
    static async getPost(req,res) {
        try {
            
        } catch (error) {
            res.send(error)
        }
    }
    //submit post/status yang diedit
    static async postEditPost(req,res) {
        try {
            
        } catch (error) {
            res.send(error)
        }
    }
}

module.exports = Controller