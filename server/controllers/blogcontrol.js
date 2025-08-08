import Blog from "../models/Blog.js";

const createBlog = async (req, res) => {
  try {
    const { title, content } = req.body;
    const newBlog = new Blog({
      title,
      content,
      author: req.user.id,
    });
    await newBlog.save();
    const populatedBlog = await newBlog.populate("author", "username");
    res.status(201).json(populatedBlog); 
  } catch (err) {
    res.status(400).json({ message: "Failed to create", err: err.message });
  }
};


const deleteBlog = async (req, res) => {
  try {
    const id = req.params.id;
    const blog = await Blog.findById(id);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    const deletebyid = await Blog.findByIdAndDelete(id);
    res.status(200).json({ message: "Blog deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().populate('author', 'username');
    if (!blogs) {
      return res.status(401).json({ message: "blog not found" });
    }
    res.status(200).json(blogs);
  } catch (err) {
    res.status(400).json({ message: "blog not found", err: err.message });
  }
};
const getBlog = async (req, res) => {
 try {
    const blog = await Blog.findById(req.params.id).populate("author", "username");
    if (!blog) return res.status(404).send("Blog not found");
    res.json(blog);
  } catch (err) {
    res.status(500).send("Server error");
  }
};


const getUserBlogs = async (req, res) => {
  try {
    const userId = req.params.id;

    const blogs = await Blog.find({ author: userId }).populate("author", "username");

    if (!blogs) {
      return res.status(404).json({ message: "No blogs found for this user" });
    }

    res.status(200).json(blogs);
  } catch (err) {
    res.status(500).json({ message: "Server error", err: err.message });
  }
};

const updateBlog = async (req,res) =>{
      try{
        const id = req.params.id;
        const blog = await Blog.findById(id);
        if(!blog){
            return res.status(404).json({message:"Blog not found"})
        }
       const updateblog = await Blog.findByIdAndUpdate(id,req.body,{
            new:true
        });
        res.status(201).json({message:"Blog Updated Successfully"});
    }catch(err){
        res.status(500).json({message:err.message});
    }
}

export  {createBlog,deleteBlog,getBlogs,getBlog,getUserBlogs,updateBlog};