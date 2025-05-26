package nguyen.tan.hung.product.repository;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.TypedQuery;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;
import nguyen.tan.hung.config.GlobalConfig;
import nguyen.tan.hung.product.dto.ProductDetailDto;
import nguyen.tan.hung.product.dto.ProductFilterDto;
import nguyen.tan.hung.product.dto.ProductFilterRequest;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;

@Repository
public class ProductRepository {
    @PersistenceContext
    EntityManager entityManager;

    public List<ProductEntity> findAll() {
        TypedQuery<ProductEntity> query = entityManager.createQuery("from ProductEntity ", ProductEntity.class);
        return query.getResultList();
    }

    public List<ProductFilterDto> getListProductFiltered(ProductFilterRequest productFilterRequest) {
//        final String query= """
//                select * from Product where (:categoryId is null or categoryId=:categoryId) and
//                                            (:brandId is null or brandId=:brandId) and
//                                            (:name is null or name=:name) and
//                                            (:rating is null or rating=:rating) and
//                                            (:minPrice is null or price>=:minPrice) and
//                                            (:maxPrice is null or price <=:maxPrice)
//                                            (:sortId is null or )
//                """;

        CriteriaBuilder cb=entityManager.getCriteriaBuilder();
        CriteriaQuery<ProductFilterDto> cq=cb.createQuery(ProductFilterDto.class);
        Root<ProductEntity>root=cq.from(ProductEntity.class);
        cq.select(cb.construct(ProductFilterDto.class,
                root.get("id"),
                root.get("name"),
                root.get("price"),
                root.get("mainImage"),
                root.get("rating")));
        createQueryFilterProduct(cb,cq,root,productFilterRequest);
        Integer sortId=productFilterRequest.getSortId();
        if(sortId!=null){
            String columnName= GlobalConfig.SORT_CONDITIONS.get(sortId)[0];
            String sortType=GlobalConfig.SORT_CONDITIONS.get(sortId)[1];
            if(sortType.equals("asc")){
                cq.orderBy(cb.asc(root.get(columnName)));
            }
            else if(sortType.equals("desc")){
                cq.orderBy(cb.desc(root.get(columnName)));
            }
        }
        TypedQuery<ProductFilterDto>query=entityManager.createQuery(cq);
        query.setFirstResult((productFilterRequest.getPage()-1)*GlobalConfig.limit);
        query.setMaxResults(GlobalConfig.limit);
        return query.getResultList();
    }

    private <T> void createQueryFilterProduct(CriteriaBuilder cb, CriteriaQuery<T> cq, Root<ProductEntity> root, ProductFilterRequest productFilterRequest) {
        List<Predicate>predicates=new ArrayList<>();
        if(productFilterRequest.getCategoryId()!=null){
            predicates.add(cb.equal(root.get("category").get("id"),productFilterRequest.getCategoryId()));
        }
        if(productFilterRequest.getBrandId()!=null){
            predicates.add(cb.equal(root.get("brand").get("id"),productFilterRequest.getBrandId()));
        }
        if(productFilterRequest.getName()!=null){
            predicates.add(cb.like(root.get("name"),"%"+productFilterRequest.getName()+"%"));
        }
        if(productFilterRequest.getMinPrice()!=null){
            predicates.add(cb.greaterThanOrEqualTo(root.get("price"),productFilterRequest.getMinPrice()));
        }
        if(productFilterRequest.getMaxPrice()!=null){
            predicates.add(cb.lessThanOrEqualTo(root.get("price"),productFilterRequest.getMaxPrice()));
        }
        if(productFilterRequest.getRating()!=null){
            predicates.add(cb.equal(root.get("rating"),productFilterRequest.getRating()));
        }
        cq.where(predicates.toArray(new Predicate[0]));
    }

    public Long getNumberProductFiltered(ProductFilterRequest productFilterRequest) {
        CriteriaBuilder cb = entityManager.getCriteriaBuilder();
        CriteriaQuery<Long> cq = cb.createQuery(Long.class);
        Root<ProductEntity> root = cq.from(ProductEntity.class);
        createQueryFilterProduct(cb,cq,root,productFilterRequest);
        cq.select(cb.count(root));
        TypedQuery<Long>query=entityManager.createQuery(cq);
        return query.getSingleResult();
    }

    public ProductDetailDto getProductDetail(Integer id) {
        TypedQuery<ProductEntity> query=entityManager.createQuery("from ProductEntity p left join fetch p.imageList where p.id=:id",ProductEntity.class);
        query.setParameter("id",id);
        ProductEntity entity=query.getSingleResult();
        return new ProductDetailDto(entity);
    }

    public List<ProductFilterDto> getRelatedProduct(Integer id) {
        TypedQuery<ProductEntity>query=entityManager.createQuery(" from ProductEntity p where p.category.id=:id and p.id <>:id",ProductEntity.class);
        query.setMaxResults(4);
        query.setParameter("id",id);
        List<ProductEntity>productEntities=query.getResultList();
        return productEntities.stream().map(ProductFilterDto::new).toList();
    }
}
