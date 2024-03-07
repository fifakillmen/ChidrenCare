package com.v1.ChildrenCare.service.serviceImpl;

import com.v1.ChildrenCare.dto.PostDto;
import com.v1.ChildrenCare.dto.mapper.PostListMapper;
import com.v1.ChildrenCare.entity.Blog;
import com.v1.ChildrenCare.entity.Post;
import com.v1.ChildrenCare.enumPack.enumActive;
import com.v1.ChildrenCare.repository.BlogRepository;
import com.v1.ChildrenCare.repository.PostRepository;
import com.v1.ChildrenCare.service.BlogService;
import com.v1.ChildrenCare.service.PostService;
import com.v1.ChildrenCare.service.StorageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class BlogServiceImpl implements BlogService {

   @Autowired
    private BlogRepository blogRepository;

    @Autowired
    private PostRepository postRepository;

    @Autowired
    private StorageService storageService;

    @Autowired
    private PostService postService;

    @Override
    public List<Blog> findAll(int page, int size, Long categoryId, String search) {
        return blogRepository.findAllBlog(PageRequest.of(page, size), search, categoryId).getContent();
    }

    @Override
    public Blog getBlogById(Long blogId) {
        return blogRepository.findById(blogId).orElse(null);
    }

    @Override
    public Blog addBlog(String createByUserId, String title, String briefContent, MultipartFile imageFile, Long postId) {
        Blog blog = new Blog();
        blog.setTitle(title);
        blog.setBriefContent(briefContent);
        blog.setCreatedDate(LocalDate.now());
        blog.setIsActive(enumActive.ACTIVE);
        if(imageFile != null){
            String imageFileName = storageService.uploadFile(imageFile);
            blog.setImageLink(imageFileName);
        }
        // Set post for blog
        Post post = postService.getPostById(postId);
        if (post == null) {
            return null;
        }
        blog.setPost(post);
        return blogRepository.save(blog);
    }

    @Override
    public Blog updateBlog(Long modifiedByUserId, Long blogId, String title, String briefContent, String content, MultipartFile imageFile, Long categoryId) {
        Blog blog = blogRepository.findById(blogId).orElse(null);
        if (blog == null) {
            return null;
        }
        if (imageFile != null) {
            String imageFileName = storageService.uploadFile(imageFile);
            blog.setImageLink(imageFileName);
        }
        blog.setTitle(title);
        blog.setBriefContent(briefContent);
        blog.setUpdatedDate(LocalDate.now());
        return blogRepository.save(blog);
    }

    @Override
    public boolean deleteBlog(Long blogId) {
        Blog blog = blogRepository.findById(blogId).orElse(null);
        if (blog == null) {
            return false;
        }
        blog.setIsActive(enumActive.INACTIVE);
        blogRepository.save(blog);
        return true;
    }
}
