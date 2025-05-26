package nguyen.tan.hung.category.repo;


import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.TypedQuery;
import nguyen.tan.hung.category.dto.CategoryDto;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class CategoryRepository {
    @PersistenceContext
    private EntityManager entityManager;

    public List<CategoryEntity> findAll(){
        TypedQuery<CategoryEntity> query=entityManager.createQuery("from CategoryEntity ",CategoryEntity.class);
        return query.getResultList();
    }

    public List<CategoryDto>findAll2(){
        TypedQuery<CategoryDto>query=entityManager.createQuery("select new nguyen.tan.hung.category.dto.CategoryDto(c.id,c.name,COUNT(p)) from CategoryEntity c left join c.productList p group by c.id,c.name",CategoryDto.class);
        return query.getResultList();
    }
}
