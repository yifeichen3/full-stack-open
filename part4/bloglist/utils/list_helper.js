const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    let sum = 0
    blogs.forEach(blog => {
        sum += blog.likes
    })
    return sum
}

const favoriteBlog = (blogs) => {
    let finalBlog = null
    let maxLikes = -1
    blogs.forEach(blog => {
        if (maxLikes < blog.likes) {
            maxLikes = blog.likes
            finalBlog = blog
        }
    })
    return finalBlog
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
}