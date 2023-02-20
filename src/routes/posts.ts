import { body } from 'express-validator';
import { app } from '../app';
import { uploadImage } from '../controllers/images/uploadImage';
import { postsController } from '../controllers/posts';
import { upload } from '../middlewares/upload-middleware';

app.get('/api/posts', postsController.getPosts);

app.post(
  '/api/posts',
  body('userId').exists().isNumeric(),
  body('description').exists().isString(),
  postsController.addPost
);

app.get('/api/posts/:id', postsController.getPost);

app.patch(
  '/api/posts/:id',
  body('description').optional().isString(),
  body('likes').optional().isNumeric(),
  body('likedUserIds').optional().isArray(),
  body('commentsIds').optional().isArray(),
  postsController.updatePost
);

app.delete('/api/posts/:id', postsController.removePost);

app.post('/api/posts-img', upload.single('post-img'), uploadImage);
