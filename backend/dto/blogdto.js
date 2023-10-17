class BlogDTO {
  constructor(blog) {
    this._id = blog._id;
    this.title = blog.title;
    this.description = blog.description;
    this.photoPath = blog.photoPath;
    this.author = blog.author;
  }
}
module.exports = BlogDTO;