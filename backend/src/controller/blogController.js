const fs = require('fs');
const csv = require('csv-parser');
const Blog = require('../model/blog.model');
const { Parser } = require('json2csv');
const path = require('path');

// Import blogs từ CSV
exports.importBlog = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).send('No file uploaded.');
        }

        const filePath = path.join(__dirname, '../../public/uploads', req.file.filename);
        const blogData = [];

        fs.createReadStream(filePath)
            .pipe(csv())
            .on('data', (row) => {
                const blocks = [];

                if (row['content.blocks'] === 'paragraph' && row.block1_text) {
                    blocks.push({
                        type: 'paragraph',
                        data: {
                            text: row.block1_text,
                        },
                    });
                }

                if (row['content.blocks'] === 'header' && row.block2_text) {
                    blocks.push({
                        type: 'header',
                        data: {
                            text: row.block2_text,
                            level: parseInt(row.block2_level, 10) || 2,
                        },
                    });
                }

                blogData.push({
                    title: row.title,
                    description: row.description,
                    coverImg: row.coverImg,
                    author: row.author,
                    rating: row.rating || null,
                    content: {
                        blocks: blocks,
                    },
                    category: row.category || null,
                });
            })
            .on('end', async () => {
                for (const blog of blogData) {
                    const newBlog = new Blog(blog);
                    await newBlog.save();
                }

                res.send('File uploaded and blog imported successfully.');
            })
            .on('error', (error) => {
                console.error('Error reading CSV file:', error);
                res.status(500).send('Error importing blog');
            });

    } catch (error) {
        console.error('Error importing blog:', error);
        res.status(500).send('Error importing blog');
    }
};

// Export blogs thành file CSV
exports.exportBlog = async (req, res) => {
    try {
        const blogs = await Blog.find({});
        res.json(blogs)

        const fields = ['title', 'description', 'coverImg', 'author', 'rating', 'category', 'content.blocks.type', 'content.blocks.data.text'];
        const csvParser = new Parser({ fields });
        const csvData = csvParser.parse(blogs);

        const filePath = path.join(__dirname, '../../public/exports/blogs.csv');
        fs.writeFileSync(filePath, csvData);

        res.download(filePath, 'blogs.csv', (err) => {
            if (err) {
                console.error('Error downloading CSV file:', err);
                res.status(500).send('Errordownload exporting blog');
            }
        });
    } catch (error) {
        console.error('Error exporting blog:', error);
        res.status(500).send('Error exporting blog');
    }
};
