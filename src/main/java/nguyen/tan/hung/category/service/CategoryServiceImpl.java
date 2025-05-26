package nguyen.tan.hung.category.service;

import nguyen.tan.hung.category.dto.CategoryDto;

import java.util.List;

import nguyen.tan.hung.category.repo.CategoryEntity;
import nguyen.tan.hung.category.repo.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service("categoryServiceImpl")
public class CategoryServiceImpl implements CategoryService{
    private final CategoryRepository categoryRepository;
    @Autowired
    public CategoryServiceImpl(CategoryRepository categoryRepository){
        this.categoryRepository=categoryRepository;
    }
    @Transactional(readOnly = true)
    @Override
    public List<CategoryDto> findAll() {
        List<CategoryEntity>categoryEntities=categoryRepository.findAll();
        List<CategoryDto>categoryDtos=categoryEntities.stream().map(CategoryDto::new).toList();
        return categoryDtos;
    }

    @Override
    public List<CategoryDto> findAll2() {
        return categoryRepository.findAll2();
    }
}
