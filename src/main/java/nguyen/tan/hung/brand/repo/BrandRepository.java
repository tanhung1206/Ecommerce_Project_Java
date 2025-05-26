package nguyen.tan.hung.brand.repo;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.TypedQuery;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class BrandRepository {
    @PersistenceContext
    private EntityManager entityManager;

    public List<BrandEntity> findAll(){
        TypedQuery<BrandEntity>query=entityManager.createQuery("from BrandEntity ",BrandEntity.class);
        return query.getResultList();
    }
}
