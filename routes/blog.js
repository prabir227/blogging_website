const {Router} = require('express');
const router = Router();
const Blog = require('../models/blog');
const multer = require('multer');
const path = require('path');
const Comment = require('../models/comment');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.resolve(`./public/uploads/`))
    },
    filename: function (req, file, cb) {
      const fileName = `${Date.now()}-${file.originalname}`;
        cb(null, fileName)
    }
  })
  
const upload = multer({ storage: storage })
router.get('/addBlog', (req, res) => {
    return res.render('addBlog',{
        user: req.user
    });
});

router.post('/comment/:blogId',async (req,res)=>{
    const comment = await Comment.create({
        comment: req.body.comment,
        blogId: req.params.blogId,
        author: req.user._id
    });
    return res.redirect('/blog/'+req.params.blogId);
});
router.get('/:id', async (req, res) => {
    const blog = await Blog.findById(req.params.id).populate('author');
    const comments = await Comment.find({blogId: req.params.id}).populate('author');
    console.log(comments);
    return res.render('blog',{
        blog,
        user: req.user,
        comments,
    });
});

router.post('/', upload.single('coverImage'), async (req, res) => {
    const {title, body} = req.body;
    const blog = await Blog.create({
        title,
        body,
        coverImageURL: `/uploads/${req.file.filename}`,
        author: req.user._id
    });
    return res.redirect('/blog/'+blog._id);
});
module.exports = router;